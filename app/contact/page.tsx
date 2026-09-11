import type { Metadata } from 'next';
import { getContent } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Contact | Singhji Enterprises'
};

export default function ContactPage() {
  const content = getContent();
  const { contact, business } = content;

  return (
    <section className="section py-16 md:py-24">
      <p className="label-eyebrow">We&apos;re here to help</p>
      <h1 className="mt-3 text-4xl text-ink">{contact.heading}</h1>
      <p className="mt-4 max-w-xl text-stone">{contact.subtext}</p>

      <div className="mt-12 grid gap-10 md:grid-cols-2">
        <div className="border border-hairline bg-paper p-8">
          <h2 className="font-serif text-xl text-ink">{business.name}</h2>

          <p className="mt-4 text-stone italic">{business.address}</p>

          <div className="mt-6 space-y-2 text-sm">
            <p>
              <span className="text-stone">Phone: </span>
              <a href={`tel:+91${business.phone}`} className="text-maroon hover:text-maroon-dark">
                {business.phone}
              </a>
            </p>
            <p>
              <span className="text-stone">WhatsApp: </span>
              <a
                href={`https://wa.me/${business.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-maroon hover:text-maroon-dark"
              >
                {business.phone}
              </a>
            </p>
            <p>
              <span className="text-stone">Email: </span>
              <a href={`mailto:${business.email}`} className="text-maroon hover:text-maroon-dark">
                {business.email}
              </a>
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`tel:+91${business.phone}`} className="btn-outline">
              Call Now
            </a>
            <a
              href={`https://wa.me/${business.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              WhatsApp
            </a>
            <a href={`mailto:${business.email}`} className="btn-outline">
              Email Us
            </a>
          </div>
        </div>

        <div className="border border-hairline overflow-hidden min-h-[320px]">
          <iframe
            title="Singhji Enterprises location"
            className="h-full w-full min-h-[320px]"
            loading="lazy"
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              business.address
            )}&output=embed`}
          />
        </div>
      </div>
    </section>
  );
}
