import Link from 'next/link';
import { SiteContent } from '@/lib/content';

export default function Footer({
  business
}: {
  business: SiteContent['business'];
}) {
  return (
    <footer className="border-t border-hairline bg-ink text-cream/90 mt-24">
      <div className="section grid gap-10 py-12 md:grid-cols-3">
        <div>
          <p className="font-serif text-lg text-cream">{business.name}</p>
          <p className="mt-1 text-sm text-cream/60">{business.tagline}</p>
        </div>

        <div className="text-sm text-cream/70 space-y-1">
          <p>{business.address}</p>
          <p>
            <a href={`tel:+91${business.phone}`} className="hover:text-cream">
              {business.phone}
            </a>
          </p>
          <p>
            <a href={`mailto:${business.email}`} className="hover:text-cream">
              {business.email}
            </a>
          </p>
        </div>

        <div className="flex flex-col gap-2 text-sm md:items-end">
          <Link href="/products" className="text-cream/70 hover:text-cream">
            Products
          </Link>
          <Link href="/contact" className="text-cream/70 hover:text-cream">
            Contact
          </Link>
          <a
            href={`https://wa.me/${business.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cream/70 hover:text-cream"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>

      <div className="border-t border-cream/10 py-4">
        <p className="section text-xs text-cream/40">
          © {new Date().getFullYear()} {business.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
