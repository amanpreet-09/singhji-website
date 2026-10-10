import fs from 'fs';
import { CONTENT_PATH, ensureStorage } from './storage';

export type SiteContent = {
  business: {
    name: string;
    tagline: string;
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
    mapsUrl: string;
    logo: string;
  };
  home: {
    heroHeadline: string;
    heroSubtext: string;
    heroImage: string;
    highlights: { title: string; text: string }[];
    servicesStrip: string[];
  };
  about: {
    heading: string;
    body: string;
    proprietor: string;
    proprietorTitle: string;
    image: string;
  };
  products: {
    heading: string;
    categories: {
      id: string;
      title: string;
      description: string;
      image: string;
    }[];
  };
  contact: {
    heading: string;
    subtext: string;
  };
};

export function getContent(): SiteContent {
  ensureStorage();
  const raw = fs.readFileSync(CONTENT_PATH, 'utf-8');
  return JSON.parse(raw);
}

export function saveContent(content: SiteContent): void {
  ensureStorage();
  // Write to a temp file then rename, so a crash mid-write can't leave a
  // half-written content.json behind.
  const tmpPath = `${CONTENT_PATH}.tmp`;
  fs.writeFileSync(tmpPath, JSON.stringify(content, null, 2), 'utf-8');
  fs.renameSync(tmpPath, CONTENT_PATH);
}
