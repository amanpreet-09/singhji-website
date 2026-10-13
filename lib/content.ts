import { readContentJson, writeContentJson } from './storage';

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

export async function getContent(): Promise<SiteContent> {
  return readContentJson();
}

export async function saveContent(content: SiteContent): Promise<void> {
  await writeContentJson(content);
}
