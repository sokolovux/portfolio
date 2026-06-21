export const config = {
  matcher: ['/ascii-dev', '/ascii-dev/:path*'],
}

function decodeBasicAuth(header) {
  if (!header?.startsWith('Basic ')) {
    return null
  }

  const encoded = header.slice('Basic '.length)
  const decoded = atob(encoded)
  const separatorIndex = decoded.indexOf(':')

  if (separatorIndex === -1) {
    return null
  }

  return decoded.slice(separatorIndex + 1)
}

export default function middleware(request) {
  const expectedPassword = process.env.ASCII_DEV_PASSWORD?.trim()

  if (!expectedPassword) {
    return
  }

  const password = decodeBasicAuth(request.headers.get('authorization'))

  if (password === expectedPassword) {
    return
  }

  return new Response('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="ASCII Dev", charset="UTF-8"',
    },
  })
}
