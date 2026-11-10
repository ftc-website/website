/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: the site builds to /out and can be served by Vercel or any
  // plain web host (e.g. Hostinger) without a Node server.
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};
export default nextConfig;
