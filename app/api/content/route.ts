import { NextResponse } from 'next/server';
import { getContent } from '@/lib/content';

export async function GET() {
  return NextResponse.json(getContent());
}
