function normalizeEnvValue(value) {
  if (!value) {
    return ''
  }

  const trimmed = String(value).trim()

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1).trim()
  }

  return trimmed
}

function decodeBasicAuth(header) {
  if (!header?.startsWith('Basic ')) {
    return null
  }

  const encoded = header.slice('Basic '.length)
  const decoded = Buffer.from(encoded, 'base64').toString('utf8')
  const separatorIndex = decoded.indexOf(':')

  if (separatorIndex === -1) {
    return null
  }

  return {
    username: decoded.slice(0, separatorIndex),
    password: decoded.slice(separatorIndex + 1),
  }
}

export function getAsciiDevPassword(env = process.env) {
  return normalizeEnvValue(env.ASCII_DEV_PASSWORD)
}

export function isAsciiDevAuthRequired(env = process.env) {
  return Boolean(getAsciiDevPassword(env))
}

export function verifyAsciiDevAuth(req, env = process.env) {
  const expectedPassword = getAsciiDevPassword(env)

  if (!expectedPassword) {
    return env.VERCEL_ENV !== 'production' && env.VERCEL_ENV !== 'preview'
  }

  const credentials = decodeBasicAuth(req.headers.authorization)

  if (!credentials) {
    return false
  }

  return credentials.password === expectedPassword
}

export function unauthorizedAsciiDevResponse() {
  return {
    status: 401,
    body: { error: 'Unauthorized' },
    headers: {
      'WWW-Authenticate': 'Basic realm="ASCII Dev", charset="UTF-8"',
    },
  }
}
