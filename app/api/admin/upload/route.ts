import { NextRequest, NextResponse } from 'next/server';
import { isAuthed } from '@/lib/auth';
import { saveUpload } from '@/lib/storage';

const EXTENSIONS: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/svg+xml': 'svg'
};
// Vercel rejects request bodies over 4.5MB
const MAX_SIZE = 4 * 1024 * 1024; // 4MB

export async function POST(req: NextRequest) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get('file') as File | null;

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  const ext = EXTENSIONS[file.type];
  if (!ext) {
    return NextResponse.json(
      { error: 'Only JPG, PNG, WEBP or SVG images are allowed' },
      { status: 400 }
    );
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: 'File must be under 4MB' }, { status: 400 });
  }

  const safeName = `${Date.now()}-${Math.round(Math.random() * 1e6)}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const url = await saveUpload(safeName, buffer, file.type);

  return NextResponse.json({ url });
}
