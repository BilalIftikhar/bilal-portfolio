/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  images: {
    // AVIF first: the project screenshots are large PNGs and drop ~70% here.
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [420, 640, 828, 1080, 1200, 1920],
    imageSizes: [64, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },

  experimental: {
    // react-icons and framer-motion are barrel packages; without this the
    // whole icon set is pulled into the client bundle.
    optimizePackageImports: ['react-icons', 'react-icons/fi', 'react-icons/si', 'framer-motion'],
  },

  async headers() {
    return [
      {
        source: '/:all*(png|jpg|jpeg|webp|avif|svg|ico|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/resume.pdf',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400' },
        ],
      },
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ];
  },
};

export default nextConfig;
