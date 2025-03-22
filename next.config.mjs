/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // During maintenance mode, we only need the home page
  // This prevents Next.js from trying to build other pages
  unstable_excludeFiles: [
    '**/blog/**',
    '**/dev/**',
    '**/terminology/**',
    '**/til/**',
    '**/career/**',
    '**/project/**',
    '**/resume/**'
  ],
  // Redirect all routes to home page during maintenance
  async redirects() {
    return [
      {
        source: '/:path*',
        destination: '/',
        permanent: false,
      },
    ];
  },
};

export default nextConfig; 