/** @type {import('next').NextConfig} */
// BACKEND_API_BASE_URL 是服务端私有 env（没有 NEXT_PUBLIC_ 前缀，不会暴露到客户端 bundle）
// - 部署：Vercel Project Settings -> Environment Variables 设置 BACKEND_API_BASE_URL
// - 本地：根目录 .env.local 里设置 BACKEND_API_BASE_URL=http://localhost:8000
//   （或不设置，本地默认值 = Railway）
const API_BASE_URL =
  process.env.BACKEND_API_BASE_URL ||
  'https://smart-commit-helper-backend-production.up.railway.app';

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      // /api/v1/* 在 Vercel / Next 服务端反代到后端，
      // 浏览器始终请求同源（避免 CORS）
      {
        source: '/api/v1/:path*',
        destination: `${API_BASE_URL}/api/v1/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;