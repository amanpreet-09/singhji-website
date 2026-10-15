import fs from 'fs';
import path from 'path';
import { get, put } from '@vercel/blob';

// Everything the admin panel can change (site text + uploaded photos) is kept
// in one of two places:
// - Vercel Blob, when a store is connected to the Vercel project (Vercel's
//   disk is read-only, so files written there would be lost). Vercel sets
//   BLOB_STORE_ID (OIDC auth) or BLOB_READ_WRITE_TOKEN (older stores).
// - STORAGE_DIR on disk otherwise (local dev, Docker with a volume).
// The repo's seed/ folder holds the starting content and placeholder photos,
// used until the admin saves something.
const USE_BLOB = !!(process.env.BLOB_STORE_ID || process.env.BLOB_READ_WRITE_TOKEN);

export const STORAGE_DIR =
  process.env.RAILWAY_VOLUME_MOUNT_PATH ||
  process.env.STORAGE_DIR ||
  path.join(process.cwd(), 'storage');
const CONTENT_PATH = path.join(STORAGE_DIR, 'content.json');
const CONTENT_BLOB = 'content.json';

const SEED_DIR = path.join(process.cwd(), 'seed');
const SEED_UPLOADS = path.join(SEED_DIR, 'uploads');

function readSeedContent(): any {
  return JSON.parse(fs.readFileSync(path.join(SEED_DIR, 'content.json'), 'utf-8'));
}

export async function readContentJson(): Promise<any> {
  let saved: any = null;

  if (USE_BLOB) {
    // useCache: false reads straight from storage, so a save shows up on the
    // very next page load instead of waiting for the CDN cache to expire.
    const result = await get(CONTENT_BLOB, { access: 'public', useCache: false });
    if (result) saved = JSON.parse(await new Response(result.stream).text());
  } else if (fs.existsSync(CONTENT_PATH)) {
    saved = JSON.parse(fs.readFileSync(CONTENT_PATH, 'utf-8'));
  }

  const seed = readSeedContent();
  return saved ? upgradePlaceholders(saved, seed) : seed;
}

export async function writeContentJson(content: unknown): Promise<void> {
  const json = JSON.stringify(content, null, 2);

  if (USE_BLOB) {
    await put(CONTENT_BLOB, json, {
      access: 'public',
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: 'application/json',
      cacheControlMaxAge: 60
    });
    return;
  }

  fs.mkdirSync(STORAGE_DIR, { recursive: true });
  // Write to a temp file then rename, so a crash mid-write can't leave a
  // half-written content.json behind.
  const tmpPath = `${CONTENT_PATH}.tmp`;
  fs.writeFileSync(tmpPath, json, 'utf-8');
  fs.renameSync(tmpPath, CONTENT_PATH);
}

// Saves an uploaded photo and returns the URL to store in content.json.
export async function saveUpload(
  name: string,
  data: Buffer,
  contentType: string
): Promise<string> {
  if (USE_BLOB) {
    const blob = await put(`uploads/${name}`, data, {
      access: 'public',
      addRandomSuffix: false,
      contentType
    });
    return blob.url;
  }

  fs.mkdirSync(STORAGE_DIR, { recursive: true });
  fs.writeFileSync(path.join(STORAGE_DIR, name), data);
  return `/uploads/${name}`;
}

// Finds a photo served at /uploads/<name>: an upload on disk, or one of the
// photos bundled in seed/uploads.
export function readLocalUpload(name: string): Buffer | null {
  for (const dir of [STORAGE_DIR, SEED_UPLOADS]) {
    const filePath = path.join(dir, name);
    if (fs.existsSync(filePath)) return fs.readFileSync(filePath);
  }
  return null;
}

const isPlaceholder = (url: unknown) =>
  typeof url === 'string' && url.endsWith('-placeholder.svg');

// When seed/ ships a real image for a spot that still shows a placeholder in
// the saved content, use it. Anything the admin has uploaded is left alone.
function upgradePlaceholders(saved: any, seed: any): any {
  const upgrade = (savedObj: any, seedObj: any, key: string) => {
    if (!savedObj || !seedObj) return;
    if (isPlaceholder(savedObj[key]) && seedObj[key] && !isPlaceholder(seedObj[key])) {
      savedObj[key] = seedObj[key];
    }
  };

  upgrade(saved.business, seed.business, 'logo');
  upgrade(saved.home, seed.home, 'heroImage');
  upgrade(saved.about, seed.about, 'image');
  for (const category of saved.products?.categories ?? []) {
    const seedCategory = seed.products?.categories?.find((c: any) => c.id === category.id);
    upgrade(category, seedCategory, 'image');
  }

  return saved;
}
