/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true
  },
  // seed/ is read with fs at runtime, so make sure Vercel bundles it
  outputFileTracingIncludes: {
    '/**': ['./seed/**/*']
  }
};

module.exports = nextConfig;
