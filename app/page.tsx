import Image from 'next/image';
import Link from 'next/link';
import { getContent } from '@/lib/content';
import CategoryCard from '@/components/CategoryCard';

export default function HomePage() {
  const content = getContent();
  const { home, business, products } = content;

  return (
    <>
      {/* Hero */}
      <section className="section grid gap-12 py-16 md:grid-cols-2 md:items-center md:py-24">
        <div>
          <p className="label-eyebrow">{business.tagline}</p>
          <h1 className="mt-4 text-4xl leading-tight text-ink md:text-5xl">
            {home.heroHeadline}
          </h1>
          <p className="mt-6 max-w-md text-stone">{home.heroSubtext}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`https://wa.me/${business.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Enquire on WhatsApp
            </a>
            <Link href="/products" className="btn-outline">
              View Products
            </Link>
          </div>
        </div>

        <div className="relative aspect-[4/5] w-full border border-hairline">
          <Image
            src={home.heroImage}
            alt="Singhji Enterprises apparel"
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* Highlights */}
      <section className="border-y border-hairline bg-paper">
        <div className="section grid divide-y divide-hairline py-2 md:grid-cols-3 md:divide-x md:divide-y-0">
          {home.highlights.map((item) => (
            <div key={item.title} className="py-8 md:px-8">
              <h3 className="font-serif text-lg text-ink">{item.title}</h3>
              <p className="mt-2 text-sm text-stone">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Product range preview */}
      <section className="section py-16 md:py-24">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-3xl text-ink">{products.heading}</h2>
          <Link
            href="/products"
            className="text-sm text-maroon hover:text-maroon-dark whitespace-nowrap"
          >
            View all
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {products.categories.slice(0, 6).map((cat) => (
            <CategoryCard
              key={cat.id}
              title={cat.title}
              description={cat.description}
              image={cat.image}
            />
          ))}
        </div>
      </section>

      {/* Services strip */}
      <section className="bg-ink text-cream">
        <div className="section py-10">
          <div className="flex flex-wrap gap-x-10 gap-y-3">
            {home.servicesStrip.map((service) => (
              <span key={service} className="text-sm text-cream/80">
                {service}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
