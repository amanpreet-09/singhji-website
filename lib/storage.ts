import fs from 'fs';
import path from 'path';

// Everything the admin panel can change (site text + uploaded photos) lives in
// STORAGE_DIR, which should be a persistent volume in production. The repo's
// seed/ folder holds the starting content and placeholder photos; they are
// copied into STORAGE_DIR the first time the app runs against an empty volume.
// On Railway the attached volume's path is picked up automatically.
export const STORAGE_DIR =
  process.env.RAILWAY_VOLUME_MOUNT_PATH ||
  process.env.STORAGE_DIR ||
  path.join(process.cwd(), 'storage');
export const UPLOAD_DIR = STORAGE_DIR;
export const CONTENT_PATH = path.join(STORAGE_DIR, 'content.json');

const SEED_DIR = path.join(process.cwd(), 'seed');

let seeded = false;

export function ensureStorage(): void {
  if (seeded) return;

  fs.mkdirSync(STORAGE_DIR, { recursive: true });

  const seedContentPath = path.join(SEED_DIR, 'content.json');
  if (!fs.existsSync(CONTENT_PATH)) {
    fs.copyFileSync(seedContentPath, CONTENT_PATH);
  } else {
    upgradePlaceholders(seedContentPath);
  }

  // Only fills in missing files, so uploads already on the volume are kept.
  const seedUploads = path.join(SEED_DIR, 'uploads');
  if (fs.existsSync(seedUploads)) {
    for (const name of fs.readdirSync(seedUploads)) {
      const target = path.join(UPLOAD_DIR, name);
      if (!fs.existsSync(target)) {
        fs.copyFileSync(path.join(seedUploads, name), target);
      }
    }
  }

  seeded = true;
}

const isPlaceholder = (url: unknown) =>
  typeof url === 'string' && url.endsWith('-placeholder.svg');

// When seed/ ships a real image for a spot that still shows a placeholder on
// the live site, swap it in. Anything the admin has uploaded is left alone.
function upgradePlaceholders(seedContentPath: string): void {
  const seed = JSON.parse(fs.readFileSync(seedContentPath, 'utf-8'));
  const live = JSON.parse(fs.readFileSync(CONTENT_PATH, 'utf-8'));
  let changed = false;

  const upgrade = (liveObj: any, seedObj: any, key: string) => {
    if (!liveObj || !seedObj) return;
    if (isPlaceholder(liveObj[key]) && seedObj[key] && !isPlaceholder(seedObj[key])) {
      liveObj[key] = seedObj[key];
      changed = true;
    }
  };

  upgrade(live.business, seed.business, 'logo');
  upgrade(live.home, seed.home, 'heroImage');
  upgrade(live.about, seed.about, 'image');
  for (const category of live.products?.categories ?? []) {
    const seedCategory = seed.products?.categories?.find((c: any) => c.id === category.id);
    upgrade(category, seedCategory, 'image');
  }

  if (changed) {
    const tmpPath = `${CONTENT_PATH}.tmp`;
    fs.writeFileSync(tmpPath, JSON.stringify(live, null, 2), 'utf-8');
    fs.renameSync(tmpPath, CONTENT_PATH);
  }
}
