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

  if (!fs.existsSync(CONTENT_PATH)) {
    fs.copyFileSync(path.join(SEED_DIR, 'content.json'), CONTENT_PATH);
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
