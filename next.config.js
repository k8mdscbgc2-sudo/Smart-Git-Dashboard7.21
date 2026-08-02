/** @type {import('next').NextConfig} */
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  'https://smart-commit-helper-backend-production.up.railway.app';

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      // 反代后端 API，避免浏览器 CORS
      {
        source: '/api/v1/:path*',
        destination: `${API_BASE_URL}/api/v1/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;