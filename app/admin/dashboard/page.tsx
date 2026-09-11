'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SiteContent } from '@/lib/content';
import ImageUploader from '@/components/admin/ImageUploader';

type SaveState = 'idle' | 'saving' | 'saved' | 'error';

export default function DashboardPage() {
  const router = useRouter();
  const [content, setContent] = useState<SiteContent | null>(null);
  const [saveState, setSaveState] = useState<SaveState>('idle');

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then(setContent);
  }, []);

  async function handleSave() {
    if (!content) return;
    setSaveState('saving');

    const res = await fetch('/api/admin/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(content)
    });

    setSaveState(res.ok ? 'saved' : 'error');
    setTimeout(() => setSaveState('idle'), 2500);
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin');
    router.refresh();
  }

  if (!content) {
    return (
      <section className="section py-16">
        <p className="text-stone">Loading…</p>
      </section>
    );
  }

  return (
    <section className="section py-12 md:py-16">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-hairline pb-6">
        <div>
          <h1 className="font-serif text-3xl text-ink">Site content</h1>
          <p className="mt-1 text-sm text-stone">
            Edit text and photos below, then save. Changes go live immediately.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {saveState === 'saved' && (
            <span className="text-sm text-maroon">Saved.</span>
          )}
          {saveState === 'error' && (
            <span className="text-sm text-maroon">Save failed. Try again.</span>
          )}
          <button
            onClick={handleSave}
            disabled={saveState === 'saving'}
            className="btn-primary"
          >
            {saveState === 'saving' ? 'Saving…' : 'Save changes'}
          </button>
          <button onClick={handleLogout} className="btn-outline">
            Log out
          </button>
        </div>
      </div>

      {/* Business info */}
      <div className="mt-10 border border-hairline bg-paper p-6">
        <h2 className="font-serif text-xl text-ink">Business details</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <Field
            label="Business name"
            value={content.business.name}
            onChange={(v) =>
              setContent({ ...content, business: { ...content.business, name: v } })
            }
          />
          <Field
            label="Tagline"
            value={content.business.tagline}
            onChange={(v) =>
              setContent({ ...content, business: { ...content.business, tagline: v } })
            }
          />
          <Field
            label="Phone number"
            value={content.business.phone}
            onChange={(v) =>
              setContent({ ...content, business: { ...content.business, phone: v } })
            }
          />
          <Field
            label="WhatsApp number (with country code, no +, e.g. 919845082913)"
            value={content.business.whatsapp}
            onChange={(v) =>
              setContent({ ...content, business: { ...content.business, whatsapp: v } })
            }
          />
          <Field
            label="Email"
            value={content.business.email}
            onChange={(v) =>
              setContent({ ...content, business: { ...content.business, email: v } })
            }
          />
          <Field
            label="Address"
            value={content.business.address}
            onChange={(v) =>
              setContent({ ...content, business: { ...content.business, address: v } })
            }
          />
        </div>
        <div className="mt-5">
          <ImageUploader
            label="Logo"
            value={content.business.logo}
            onChange={(url) =>
              setContent({ ...content, business: { ...content.business, logo: url } })
            }
          />
        </div>
      </div>

      {/* Home page */}
      <div className="mt-8 border border-hairline bg-paper p-6">
        <h2 className="font-serif text-xl text-ink">Home page</h2>
        <div className="mt-5 space-y-5">
          <Field
            label="Hero headline"
            value={content.home.heroHeadline}
            onChange={(v) =>
              setContent({ ...content, home: { ...content.home, heroHeadline: v } })
            }
          />
          <TextArea
            label="Hero subtext"
            value={content.home.heroSubtext}
            onChange={(v) =>
              setContent({ ...content, home: { ...content.home, heroSubtext: v } })
            }
          />
          <ImageUploader
            label="Hero photo"
            value={content.home.heroImage}
            onChange={(url) =>
              setContent({ ...content, home: { ...content.home, heroImage: url } })
            }
          />
        </div>

        <h3 className="mt-8 font-serif text-lg text-ink">Highlights</h3>
        <div className="mt-3 grid gap-4 md:grid-cols-3">
          {content.home.highlights.map((h, i) => (
            <div key={i} className="border border-hairline p-4 space-y-3">
              <Field
                label="Title"
                value={h.title}
                onChange={(v) => {
                  const highlights = [...content.home.highlights];
                  highlights[i] = { ...highlights[i], title: v };
                  setContent({ ...content, home: { ...content.home, highlights } });
                }}
              />
              <Field
                label="Text"
                value={h.text}
                onChange={(v) => {
                  const highlights = [...content.home.highlights];
                  highlights[i] = { ...highlights[i], text: v };
                  setContent({ ...content, home: { ...content.home, highlights } });
                }}
              />
            </div>
          ))}
        </div>

        <h3 className="mt-8 font-serif text-lg text-ink">Services strip</h3>
        <p className="text-xs text-stone mt-1">One service per line.</p>
        <textarea
          className="mt-2 w-full border border-hairline bg-cream px-4 py-2 text-ink"
          rows={6}
          value={content.home.servicesStrip.join('\n')}
          onChange={(e) =>
            setContent({
              ...content,
              home: { ...content.home, servicesStrip: e.target.value.split('\n') }
            })
          }
        />
      </div>

      {/* About page */}
      <div className="mt-8 border border-hairline bg-paper p-6">
        <h2 className="font-serif text-xl text-ink">About page</h2>
        <div className="mt-5 space-y-5">
          <Field
            label="Heading"
            value={content.about.heading}
            onChange={(v) =>
              setContent({ ...content, about: { ...content.about, heading: v } })
            }
          />
          <TextArea
            label="Body text"
            value={content.about.body}
            rows={6}
            onChange={(v) =>
              setContent({ ...content, about: { ...content.about, body: v } })
            }
          />
          <div className="grid gap-5 md:grid-cols-2">
            <Field
              label="Proprietor name"
              value={content.about.proprietor}
              onChange={(v) =>
                setContent({ ...content, about: { ...content.about, proprietor: v } })
              }
            />
            <Field
              label="Proprietor title"
              value={content.about.proprietorTitle}
              onChange={(v) =>
                setContent({
                  ...content,
                  about: { ...content.about, proprietorTitle: v }
                })
              }
            />
          </div>
          <ImageUploader
            label="About photo"
            value={content.about.image}
            onChange={(url) =>
              setContent({ ...content, about: { ...content.about, image: url } })
            }
          />
        </div>
      </div>

      {/* Products */}
      <div className="mt-8 border border-hairline bg-paper p-6">
        <h2 className="font-serif text-xl text-ink">Products page</h2>
        <div className="mt-5">
          <Field
            label="Page heading"
            value={content.products.heading}
            onChange={(v) =>
              setContent({ ...content, products: { ...content.products, heading: v } })
            }
          />
        </div>

        <h3 className="mt-8 font-serif text-lg text-ink">Categories</h3>
        <div className="mt-3 grid gap-5 md:grid-cols-2">
          {content.products.categories.map((cat, i) => (
            <div key={cat.id} className="border border-hairline p-4 space-y-3">
              <Field
                label="Title"
                value={cat.title}
                onChange={(v) => {
                  const categories = [...content.products.categories];
                  categories[i] = { ...categories[i], title: v };
                  setContent({ ...content, products: { ...content.products, categories } });
                }}
              />
              <Field
                label="Description"
                value={cat.description}
                onChange={(v) => {
                  const categories = [...content.products.categories];
                  categories[i] = { ...categories[i], description: v };
                  setContent({ ...content, products: { ...content.products, categories } });
                }}
              />
              <ImageUploader
                label="Photo"
                value={cat.image}
                onChange={(url) => {
                  const categories = [...content.products.categories];
                  categories[i] = { ...categories[i], image: url };
                  setContent({ ...content, products: { ...content.products, categories } });
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Contact page */}
      <div className="mt-8 border border-hairline bg-paper p-6">
        <h2 className="font-serif text-xl text-ink">Contact page</h2>
        <div className="mt-5 space-y-5">
          <Field
            label="Heading"
            value={content.contact.heading}
            onChange={(v) =>
              setContent({ ...content, contact: { ...content.contact, heading: v } })
            }
          />
          <TextArea
            label="Subtext"
            value={content.contact.subtext}
            onChange={(v) =>
              setContent({ ...content, contact: { ...content.contact, subtext: v } })
            }
          />
        </div>
      </div>

      <div className="mt-10 flex justify-end">
        <button
          onClick={handleSave}
          disabled={saveState === 'saving'}
          className="btn-primary"
        >
          {saveState === 'saving' ? 'Saving…' : 'Save changes'}
        </button>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm text-stone">{label}</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full border border-hairline bg-cream px-4 py-2 text-ink"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  rows = 4
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="text-sm text-stone">{label}</span>
      <textarea
        value={value}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full border border-hairline bg-cream px-4 py-2 text-ink"
      />
    </label>
  );
}
