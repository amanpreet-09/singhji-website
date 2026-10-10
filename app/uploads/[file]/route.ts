import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { ensureStorage, UPLOAD_DIR } from '@/lib/storage';

// Uploaded photos are served from the storage volume at request time, so a
// new upload is visible immediately without a rebuild or restart.
const CONTENT_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml'
};

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ file: string }> }
) {
  const { file } = await params;
  const name = path.basename(file);
  const contentType = CONTENT_TYPES[path.extname(name).toLowerCase()];

  if (name !== file || !contentType) {
    return new NextResponse('Not found', { status: 404 });
  }

  ensureStorage();
  const filePath = path.join(UPLOAD_DIR, name);

  if (!fs.existsSync(filePath)) {
    return new NextResponse('Not found', { status: 404 });
  }

  return new NextResponse(fs.readFileSync(filePath), {
    headers: {
      'Content-Type': contentType,
      // Upload names are unique, so a file at a given URL never changes.
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; sandbox"
    }
  });
}
