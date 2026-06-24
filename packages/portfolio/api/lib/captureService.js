import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import ffmpeg from 'fluent-ffmpeg'
import ffmpegStatic from 'ffmpeg-static'
import { PuppeteerScreenRecorder } from 'puppeteer-screen-recorder'
import { v4 as uuidv4 } from 'uuid'

const TEMP_DIR = path.join(os.tmpdir(), 'folioscroll')
const RECORDING_FPS = 30

const LOCAL_CHROME_PATHS = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium-browser',
]

const QUALITY_PRESETS = {
  low: { height: 720, crf: 35, preset: 'fast' },
  medium: { height: 1080, crf: 28, preset: 'medium' },
  high: { height: 1440, crf: 18, preset: 'slow' },
}

if (ffmpegStatic) {
  ffmpeg.setFfmpegPath(ffmpegStatic)
}

async function resolveLocalExecutablePath() {
  if (process.env.PUPPETEER_EXECUTABLE_PATH) {
    return process.env.PUPPETEER_EXECUTABLE_PATH
  }

  const puppeteer = await import('puppeteer')
  const bundledPath = puppeteer.default.executablePath()

  if (bundledPath) {
    try {
      await fs.access(bundledPath)
      return bundledPath
    } catch {
      // Fall through to system Chrome paths.
    }
  }

  for (const chromePath of LOCAL_CHROME_PATHS) {
    try {
      await fs.access(chromePath)
      return chromePath
    } catch {
      // Try the next known install location.
    }
  }

  return bundledPath
}

async function launchBrowser() {
  const args = ['--no-sandbox', '--disable-setuid-sandbox']

  if (process.env.VERCEL) {
    const chromium = await import('@sparticuz/chromium')
    const puppeteer = await import('puppeteer-core')

    return puppeteer.default.launch({
      args: [...chromium.default.args, ...args],
      defaultViewport: null,
      executablePath: await chromium.default.executablePath(),
      headless: chromium.default.headless,
    })
  }

  const puppeteer = await import('puppeteer-core')
  const executablePath = await resolveLocalExecutablePath()

  return puppeteer.default.launch({
    headless: true,
    args,
    executablePath,
  })
}

function parseCaptureBody(body) {
  if (!body || typeof body !== 'object') {
    return { error: 'Request body must be JSON' }
  }

  const {
    url,
    viewportWidth = 1440,
    viewportHeight = 900,
    scrollSpeed = 3,
    holdDuration = 2000,
    waitForLoad = true,
    loadDelay = 1500,
    quality = 'high',
  } = body

  if (!url || typeof url !== 'string') {
    return { error: 'URL is required' }
  }

  let parsedUrl

  try {
    parsedUrl = new URL(url)

    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return { error: 'URL must use http or https' }
    }
  } catch {
    return { error: 'Invalid URL' }
  }

  const width = Number(viewportWidth)
  const height = Number(viewportHeight)
  const speed = Number(scrollSpeed)
  const hold = Number(holdDuration)
  const delay = Number(loadDelay)

  if (!Number.isFinite(width) || width < 320 || width > 3840) {
    return { error: 'Viewport width must be between 320 and 3840' }
  }

  if (!Number.isFinite(height) || height < 240 || height > 2160) {
    return { error: 'Viewport height must be between 240 and 2160' }
  }

  if (!Number.isFinite(speed) || speed < 1 || speed > 10) {
    return { error: 'Scroll speed must be between 1 and 10' }
  }

  if (!Number.isFinite(hold) || hold < 0 || hold > 30000) {
    return { error: 'Hold at top must be between 0 and 30000 ms' }
  }

  if (!Number.isFinite(delay) || delay < 0 || delay > 30000) {
    return { error: 'Load delay must be between 0 and 30000 ms' }
  }

  if (!QUALITY_PRESETS[quality]) {
    return { error: 'Quality must be low, medium, or high' }
  }

  return {
    params: {
      url: parsedUrl.href,
      viewportWidth: width,
      viewportHeight: height,
      scrollSpeed: speed,
      holdDuration: hold,
      waitForLoad: Boolean(waitForLoad),
      loadDelay: delay,
      quality,
    },
  }
}

function buildFilename(url) {
  const hostname = new URL(url).hostname
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '')

  return `folioscroll-${hostname}-${date}.mp4`
}

function encodeVideo(inputPath, outputPath, quality) {
  const preset = QUALITY_PRESETS[quality]

  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .videoFilters(`scale=-1:${preset.height}`)
      .outputOptions([
        '-c:v libx264',
        `-crf ${preset.crf}`,
        `-preset ${preset.preset}`,
        `-r ${RECORDING_FPS}`,
        '-vsync cfr',
        '-movflags +faststart',
      ])
      .on('end', () => resolve())
      .on('error', (err) => reject(err))
      .save(outputPath)
  })
}

async function smoothScroll(page, scrollSpeed) {
  const frameMs = 1000 / RECORDING_FPS

  while (true) {
    const { scrollY, maxScroll } = await page.evaluate(() => {
      const scrollHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
      )

      return {
        scrollY: window.scrollY,
        maxScroll: Math.max(0, scrollHeight - window.innerHeight),
      }
    })

    if (scrollY >= maxScroll - 1) {
      break
    }

    await page.evaluate((speed) => {
      window.scrollBy(0, speed)
    }, scrollSpeed)

    await new Promise((resolve) => setTimeout(resolve, frameMs))
  }
}

async function cleanupFiles(paths) {
  await Promise.all(paths.map((filePath) => fs.unlink(filePath).catch(() => {})))
}

export async function runCapture(body) {
  const parsed = parseCaptureBody(body)

  if (parsed.error) {
    return { status: 400, error: parsed.error }
  }

  const {
    url,
    viewportWidth,
    viewportHeight,
    scrollSpeed,
    holdDuration,
    waitForLoad,
    loadDelay,
    quality,
  } = parsed.params

  await fs.mkdir(TEMP_DIR, { recursive: true })

  const id = uuidv4()
  const rawPath = path.join(TEMP_DIR, `${id}-raw.mp4`)
  const outputPath = path.join(TEMP_DIR, `${id}-out.mp4`)
  const filename = buildFilename(url)
  const tempFiles = [rawPath, outputPath]

  let browser

  try {
    browser = await launchBrowser()
    const page = await browser.newPage()

    await page.setViewport({ width: viewportWidth, height: viewportHeight })

    try {
      await page.goto(url, {
        waitUntil: waitForLoad ? 'networkidle2' : 'domcontentloaded',
        timeout: 60000,
      })
    } catch (err) {
      return { status: 400, error: `Could not load URL: ${err.message}` }
    }

    if (waitForLoad) {
      await new Promise((resolve) => setTimeout(resolve, loadDelay))
    }

    const recorder = new PuppeteerScreenRecorder(page, {
      followNewTab: false,
      fps: RECORDING_FPS,
      ffmpegPath: ffmpegStatic,
    })

    await recorder.start(rawPath)

    if (holdDuration > 0) {
      await new Promise((resolve) => setTimeout(resolve, holdDuration))
    }

    await smoothScroll(page, scrollSpeed)
    await recorder.stop()

    await encodeVideo(rawPath, outputPath, quality)

    const buffer = await fs.readFile(outputPath)

    return { status: 200, buffer, filename }
  } catch (err) {
    return { status: 500, error: err.message || 'Capture failed' }
  } finally {
    await browser?.close().catch(() => {})
    await cleanupFiles(tempFiles)
  }
}

export async function handleCaptureRequest(req) {
  if (req.method !== 'POST') {
    return {
      status: 405,
      body: { error: 'Method not allowed' },
      allow: 'POST',
    }
  }

  const result = await runCapture(req.body)

  if (result.error) {
    return { status: result.status, body: { error: result.error } }
  }

  return {
    status: 200,
    binary: result.buffer,
    contentType: 'video/mp4',
    filename: result.filename,
  }
}
