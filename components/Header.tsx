import Link from 'next/link';
import Image from 'next/image';
import { SiteContent } from '@/lib/content';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' }
];

export default function Header({
  business
}: {
  business: SiteContent['business'];
}) {
  return (
    <header className="border-b border-hairline bg-cream/90 backdrop-blur sticky top-0 z-40">
      <div className="section flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="relative block h-10 w-10 shrink-0">
            <Image
              src={business.logo}
              alt={`${business.name} logo`}
              fill
              sizes="40px"
              className="object-contain"
            />
          </span>
          <span className="font-serif text-lg leading-tight text-ink">
            {business.name}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-ink/80 hover:text-maroon transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          href={`https://wa.me/${business.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary text-xs md:text-sm"
        >
          WhatsApp Us
        </a>
      </div>

      <nav className="md:hidden flex items-center justify-center gap-6 border-t border-hairline py-2">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-xs text-ink/70 hover:text-maroon transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
