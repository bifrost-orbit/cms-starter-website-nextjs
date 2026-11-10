import { NextResponse, type NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('preview')
  if (!token) return NextResponse.next()
  const target = new URL('/api/preview', request.url)
  target.searchParams.set('preview', token)
  target.searchParams.set('path', request.nextUrl.pathname)
  return NextResponse.redirect(target)
}

export const config = {
  matcher: [{ source: '/((?!api/|_next/).*)', has: [{ type: 'query', key: 'preview' }] }],
}
