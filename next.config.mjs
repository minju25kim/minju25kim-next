/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: [
      "pbs.twimg.com",
    ],
  },
};

export default nextConfig; 