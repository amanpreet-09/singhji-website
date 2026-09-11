import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'singhji_admin_session';

// Note: full cryptographic verification happens server-side in lib/auth.ts
// on every API route. This middleware just does a fast "is there a cookie
// at all" redirect so logged-out visitors never see the dashboard shell.
export function middleware(req: NextRequest) {
  const cookie = req.cookies.get(COOKIE_NAME);

  if (!cookie) {
    const loginUrl = new URL('/admin', req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/dashboard/:path*']
};
