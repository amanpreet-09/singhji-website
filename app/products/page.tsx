import { getContent } from '@/lib/content';
import CategoryCard from '@/components/CategoryCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products | Singhji Enterprises'
};

export default function ProductsPage() {
  const content = getContent();
  const { products, business } = content;

  return (
    <section className="section py-16 md:py-24">
      <p className="label-eyebrow">What we manufacture</p>
      <h1 className="mt-3 text-4xl text-ink">{products.heading}</h1>
      <p className="mt-4 max-w-xl text-stone">
        Every category below is available for custom sizing, fabric choice
        and logo branding. Message us on WhatsApp with your requirement and
        quantity for a quote.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {products.categories.map((cat) => (
          <CategoryCard
            key={cat.id}
            title={cat.title}
            description={cat.description}
            image={cat.image}
          />
        ))}
      </div>

      <div className="mt-16 border border-hairline bg-paper p-8 text-center">
        <h2 className="text-2xl text-ink">Don&apos;t see what you need?</h2>
        <p className="mt-2 text-stone">
          We take on custom institutional and bulk orders outside this list too.
        </p>
        <a
          href={`https://wa.me/${business.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mt-6"
        >
          Ask on WhatsApp
        </a>
      </div>
    </section>
  );
}
