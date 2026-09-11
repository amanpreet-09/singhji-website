import { NextRequest, NextResponse } from 'next/server';
import { isAuthed } from '@/lib/auth';
import { saveContent, SiteContent } from '@/lib/content';

export async function POST(req: NextRequest) {
  if (!isAuthed()) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
  }

  const body = (await req.json()) as SiteContent;

  // Basic shape check so a malformed request can't corrupt the file
  if (!body.business || !body.home || !body.about || !body.products || !body.contact) {
    return NextResponse.json({ error: 'Invalid content shape' }, { status: 400 });
  }

  saveContent(body);
  return NextResponse.json({ ok: true });
}
