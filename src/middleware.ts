import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Allow access to the root path and static files
  if (
    request.nextUrl.pathname === '/' ||
    request.nextUrl.pathname.startsWith('/_next/') ||
    request.nextUrl.pathname.startsWith('/favicon.ico') ||
    request.nextUrl.pathname.startsWith('/logo.svg') ||
    request.nextUrl.pathname.startsWith('/touch-icon-iphone.png') ||
    request.nextUrl.pathname.startsWith('/safari-pinned-tab.svg')
  ) {
    return NextResponse.next();
  }

  // Redirect all other requests to the root path
  return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
  matcher: '/:path*',
}; 