import fs from 'fs';
import path from 'path';

const CONTENT_PATH = path.join(process.cwd(), 'data', 'content.json');

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
  const raw = fs.readFileSync(CONTENT_PATH, 'utf-8');
  return JSON.parse(raw);
}

export function saveContent(content: SiteContent): void {
  fs.writeFileSync(CONTENT_PATH, JSON.stringify(content, null, 2), 'utf-8');
}
