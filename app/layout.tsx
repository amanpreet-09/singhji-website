import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloatButton from '@/components/WhatsAppFloatButton';
import { getContent } from '@/lib/content';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['opsz']
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Singhji Enterprises | Wholesale & Custom Apparel',
  description:
    'Manufacturer and supplier of school uniforms, sportswear, corporate wear and custom apparel. Based in Mangaluru, Karnataka. Bulk and institutional orders welcome.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const content = getContent();

  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="font-sans flex min-h-screen flex-col">
        <Header business={content.business} />
        <main className="flex-1">{children}</main>
        <Footer business={content.business} />
        <WhatsAppFloatButton whatsapp={content.business.whatsapp} />
      </body>
    </html>
  );
}
