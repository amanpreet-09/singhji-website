import Image from 'next/image';
import type { Metadata } from 'next';
import { getContent } from '@/lib/content';

export const metadata: Metadata = {
  title: 'About | Singhji Enterprises'
};

export default function AboutPage() {
  const content = getContent();
  const { about } = content;

  return (
    <section className="section py-16 md:py-24">
      <div className="grid gap-12 md:grid-cols-2 md:items-start">
        <div>
          <p className="label-eyebrow">Since day one</p>
          <h1 className="mt-3 text-4xl text-ink">{about.heading}</h1>
          <div className="mt-6 space-y-4 text-stone whitespace-pre-line">
            {about.body}
          </div>

          <div className="mt-10 border-t border-hairline pt-6">
            <p className="font-serif text-lg text-ink">{about.proprietor}</p>
            <p className="text-sm text-stone">{about.proprietorTitle}</p>
          </div>
        </div>

        <div className="relative aspect-[4/5] w-full border border-hairline">
          <Image
            src={about.image}
            alt="Singhji Enterprises"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
