import { cookies } from 'next/headers';
import crypto from 'crypto';

const COOKIE_NAME = 'singhji_admin_session';

function getSecret(): string {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) {
    throw new Error('ADMIN_PASSWORD is not set in your .env.local file');
  }
  return secret;
}

function expectedToken(): string {
  // Derive a stable token from the admin password so we never store the
  // plain password in a cookie.
  return crypto.createHash('sha256').update(getSecret()).digest('hex');
}

export function checkPassword(input: string): boolean {
  const secret = getSecret();
  // Constant-time-ish comparison
  return (
    input.length === secret.length &&
    crypto.timingSafeEqual(Buffer.from(input), Buffer.from(secret))
  );
}

export function sessionCookieValue(): string {
  return expectedToken();
}

export async function isAuthed(): Promise<boolean> {
  const store = await Promise.resolve(cookies());
  const cookie = store.get(COOKIE_NAME);
  if (!cookie) return false;
  return cookie.value === expectedToken();
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;
