import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Allow access to static files and root path
  if (
    request.nextUrl.pathname === '/' ||
    request.nextUrl.pathname.startsWith('/_next/') ||
    request.nextUrl.pathname.startsWith('/static/') ||
    request.nextUrl.pathname.match(/\.(ico|png|svg|jpg|jpeg|gif)$/)
  ) {
    return NextResponse.next();
  }

  // Redirect all other requests to the root path
  return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
  matcher: '/:path*',
}; 