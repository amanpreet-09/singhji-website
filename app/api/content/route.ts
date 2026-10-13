import { NextResponse } from 'next/server';
import { getContent } from '@/lib/content';

// Always read the latest saved content, never a copy cached at build time.
export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(await getContent());
}
