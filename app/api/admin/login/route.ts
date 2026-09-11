import { NextRequest, NextResponse } from 'next/server';
import { checkPassword, sessionCookieValue, ADMIN_COOKIE_NAME } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  if (typeof password !== 'string' || !checkPassword(password)) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE_NAME, sessionCookieValue(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7 // 7 days
  });

  return res;
}
