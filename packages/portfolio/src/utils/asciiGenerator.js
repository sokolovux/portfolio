function mirrorCoords(x, y, frameWidth, frameHeight, mirrorAxis) {
  let mirrorX = x
  let mirrorY = y

  if (mirrorAxis === 'x' && x > frameWidth / 2) {
    mirrorX = frameWidth - x
  }

  if (mirrorAxis === 'y' && y > frameHeight / 2) {
    mirrorY = frameHeight - y
  }

  return { mirrorX, mirrorY }
}

function computePatternValue(pattern, mirrorX, mirrorY, params) {
  const {
    frameWidth,
    frameHeight,
    xConstant,
    yConstant,
    frameMultiplier,
    time,
    globalVal,
  } = params

  switch (pattern) {
    case 'spirals':
      return Math.sin(mirrorX * xConstant + time * frameMultiplier)
        + Math.cos(mirrorY * yConstant + time * frameMultiplier)
    case 'wavefronts':
      return Math.sin(mirrorX * xConstant + mirrorY * yConstant + time * frameMultiplier)
    case 'circular':
      return Math.sin(
        (mirrorX - frameWidth / 2) * (mirrorX - frameWidth / 2) * xConstant
          + (mirrorY - frameHeight / 2) * (mirrorY - frameHeight / 2) * yConstant
          + time * frameMultiplier,
      )
    case 'expanding':
      return Math.sin(
        Math.sqrt(
          (mirrorX - frameWidth / 2) * (mirrorX - frameWidth / 2)
            + (mirrorY - frameHeight / 2) * (mirrorY - frameHeight / 2),
        ) * frameMultiplier + time * frameMultiplier,
      )
    case 'swirling':
      return Math.sin(mirrorX * xConstant + time) + Math.cos(mirrorY * yConstant + time)
    case 'grid':
      return Math.sin(mirrorX * xConstant + mirrorY + time * frameMultiplier)
    case 'cross':
      return Math.sin((mirrorX - frameWidth / 2) * (mirrorX - frameWidth / 2) * xConstant + time * frameMultiplier)
        + Math.cos((mirrorY - frameHeight / 2) * (mirrorY - frameHeight / 2) * yConstant + time * frameMultiplier)
    case 'rise':
      return Math.sin(mirrorX * xConstant + mirrorY + time)
        + Math.cos(mirrorY * yConstant + mirrorX + time)
    case 'rippling':
      return Math.sin(mirrorX * xConstant + Math.sin(mirrorY + time) + time)
    case 'pulsating':
      return Math.sin((mirrorX * xConstant + mirrorY * yConstant) * frameMultiplier + time)
    case 'spiralWave':
      return Math.sin(mirrorX * xConstant + time)
        + Math.cos(Math.sqrt(mirrorY * mirrorY + mirrorX * mirrorX) + time)
    case 'twirling':
      return Math.sin(
        (mirrorX - frameWidth / 2) * xConstant
          + Math.cos((mirrorY - frameHeight / 2) * yConstant + time),
      )
    case 'diagonalWaves':
      return Math.sin(mirrorX * xConstant + mirrorY * yConstant + time)
    case 'bounceDiagonals':
      return Math.sin((mirrorX * xConstant + mirrorY * yConstant) * Math.sin(time) + time)
    case 'radialRays':
      return Math.sin(mirrorX * xConstant + mirrorY * yConstant) * Math.cos(time)
    case 'burst':
      return Math.sin(
        (mirrorX - frameWidth / 2) * (mirrorX - frameWidth / 2)
          + (mirrorY - frameHeight / 2) * (mirrorY - frameHeight / 2)
          + time,
      ) * (yConstant / xConstant)
    case 'squareWave':
      return Math.sin(mirrorX * xConstant) * Math.cos(mirrorY * yConstant + time)
    case 'mosaic':
      return Math.sin(mirrorX * xConstant + time) * Math.sin(mirrorY * yConstant + time)
    case 'helix':
      return Math.sin(mirrorX * xConstant + mirrorY * yConstant + time)
        * Math.cos(mirrorY * yConstant + time * 2)
    case 'parabolic':
      return Math.sin(mirrorX * mirrorX * xConstant + time)
    case 'verticalWave':
      return Math.sin(mirrorY * yConstant + time)
    case 'horizontalWave':
      return Math.sin(mirrorX * xConstant + time)
    case 'concentricCircles':
      return Math.sin(
        Math.sqrt(
          (mirrorX - frameWidth / 2) * (mirrorX - frameWidth / 2)
            + (mirrorY - frameHeight / 2) * (mirrorY - frameHeight / 2),
        ) + time,
      )
    case 'randomBurst':
      return Math.sin(
        (mirrorX - frameWidth / 2) * (mirrorX - frameWidth / 2)
          + (mirrorY - frameHeight / 2) * (mirrorY - frameHeight / 2)
          + time,
      ) * Math.random()
    case 'centerSpiral': {
      const dx = mirrorX - frameWidth / 2
      const dy = mirrorY - frameHeight / 2
      const theta = Math.atan2(dy, dx) + xConstant
      const curvature = Math.sin(theta * yConstant)
      const wave = globalVal * Math.sin(mirrorX * xConstant + time)
      const density = Math.sin(theta * frameMultiplier)
      const localSpeed = Math.sin(mirrorX * xConstant + mirrorY * yConstant)
      const r = (theta + (time + localSpeed) * frameMultiplier + curvature + wave) * (1 + density)

      return Math.sin(r)
    }
    case 'raySpiral': {
      const ex = mirrorX - frameWidth / 2
      const ey = mirrorY - frameHeight / 2
      const theta = Math.atan2(ey, ex) + xConstant
      const curvature = Math.sin(theta * yConstant)
      const r = theta + time * frameMultiplier + curvature

      return Math.sin(r)
    }
    default:
      return 0
  }
}

function buildCharsetColorMap(charset) {
  const map = {}

  for (let i = 0; i < charset.length; i += 1) {
    map[charset[i]] = i % 5
  }

  return map
}

function charForValue(value, charset) {
  const index = Math.floor((value + 2) / 4 * charset.length)
  return charset[index] || charset.charAt(charset.length - 1)
}

function applyChaos(char, index, charset, chaos) {
  if (Math.random() >= chaos) {
    return char
  }

  const direction = Math.random() < 0.5 ? -1 : 1
  const newIndex = index + direction

  return charset[newIndex]
    || (direction === -1 ? charset[0] : charset.charAt(charset.length - 1))
}

export function renderAsciiFrame(config, time) {
  const {
    charset,
    frameWidth,
    frameHeight,
    xConstant,
    yConstant,
    frameMultiplier,
    pattern,
    chaos,
    mirrorAxis,
    globalVal,
  } = config

  const params = {
    frameWidth,
    frameHeight,
    xConstant,
    yConstant,
    frameMultiplier,
    time,
    globalVal,
  }

  const charsetColorMap = buildCharsetColorMap(charset)
  const rows = []

  for (let y = 0; y < frameHeight; y += 1) {
    const row = []

    for (let x = 0; x < frameWidth; x += 1) {
      const { mirrorX, mirrorY } = mirrorCoords(x, y, frameWidth, frameHeight, mirrorAxis)
      const value = computePatternValue(pattern, mirrorX, mirrorY, params)
      const index = Math.floor((value + 2) / 4 * charset.length)
      let char = charForValue(value, charset)
      char = applyChaos(char, index, charset, chaos)
      row.push({
        char,
        colorIndex: charsetColorMap[char] ?? 0,
      })
    }

    rows.push(row)
  }

  return rows
}

export function nextAsciiTime(time, frameMultiplier) {
  return time + frameMultiplier
}
