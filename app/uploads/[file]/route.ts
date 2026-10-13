import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { readLocalUpload } from '@/lib/storage';

// Serves photos uploaded to disk (local/Docker) and the bundled seed photos.
// On Vercel, new uploads live in Vercel Blob and are linked to directly.
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

  const data = readLocalUpload(name);
  if (!data) {
    return new NextResponse('Not found', { status: 404 });
  }

  return new NextResponse(new Uint8Array(data), {
    headers: {
      'Content-Type': contentType,
      // Upload names are unique, so a file at a given URL never changes.
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; sandbox"
    }
  });
}
