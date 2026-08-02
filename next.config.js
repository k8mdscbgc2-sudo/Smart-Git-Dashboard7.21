/** @type {import('next').NextConfig} */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!API_BASE_URL) {
  // 本地不强制要求（开发用），部署时务必在 Vercel 设置
  console.warn('[next.config] NEXT_PUBLIC_API_BASE_URL is not set; /api/v1/* rewrite disabled');
}

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    if (!API_BASE_URL) {
      // 没有后端地址时不挂载 rewrite，浏览器请求将直连（见 lib/api.ts）
      return [];
    }
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