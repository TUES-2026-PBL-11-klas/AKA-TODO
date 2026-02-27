import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_PATHS = ['/login', '/register'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (PUBLIC_PATHS.includes(pathname)) return NextResponse.next();

  // Token lives in localStorage (client-only), so we gate via a cookie set on login.
  // The client sets this cookie; middleware just checks for its presence.
  const token = request.cookies.get('has_session')?.value;
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|.*\\..*).*)'],
};
