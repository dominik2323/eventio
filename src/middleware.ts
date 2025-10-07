import { getSession } from '@/lib/session'
import { NextRequest, NextResponse } from 'next/server'
import { match } from 'path-to-regexp'

// protected paths are accesible only after login
// authentication paths are inaccessible after login
const paths = {
  protected: ['/dashboard'],
  authentication: ['/login'],
}

export async function middleware(request: NextRequest) {
  const session = await getSession()

  if (getMiddlewareMatch(request, paths.protected)) {
    if (!session.refreshToken) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  if (getMiddlewareMatch(request, paths.authentication)) {
    if (session.refreshToken) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/login/:path*'],
}

function getMiddlewareMatch(request: NextRequest, patterns: string[]) {
  const matchers = patterns.map((str) => match(str))
  return matchers.find((fn) => fn(request.nextUrl.pathname))?.(
    request.nextUrl.pathname
  )
}
