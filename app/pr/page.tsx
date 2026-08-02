"use client";

import { pullRequests } from "../data/mockData";
import DemoBanner from "@/components/DemoBanner";

export default function PRPage() {
  // 按状态筛选 PR
  const pendingPRs = pullRequests.filter(pr => pr.status === 'pending');
  const approvedPRs = pullRequests.filter(pr => pr.status === 'approved');
  const changesPRs = pullRequests.filter(pr => pr.status === 'changes');

  return (
    <div className="p-8">
      <DemoBanner
        title="演示页面（Demo）"
        description="PR 看板使用 mockData.ts 静态数据，待后端补齐 PR 相关接口后将自动接入真实数据。"
      />
      {/* 页面标题 */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">PR 看板</h1>
        <p className="text-gray-500 text-sm mt-1">共 {pullRequests.length} 个合并请求</p>
      </div>

      {/* 三列看板布局 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 第一列：待审核 */}
        <div className="bg-yellow-50 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-800 flex items-center gap-2">
              <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
              待审核
            </h2>
            <span className="bg-yellow-200 text-yellow-700 px-2 py-1 rounded-full text-xs font-bold">
              {pendingPRs.length}
            </span>
          </div>
          <div className="space-y-3">
            {pendingPRs.map((pr) => (
              <div key={pr.id} className="bg-white rounded-lg p-4 shadow-sm border border-yellow-200">
                <h3 className="font-medium text-gray-800 mb-2">{pr.title}</h3>
                <p className="text-sm text-gray-500">👤 {pr.author}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 第二列：已通过 */}
        <div className="bg-green-50 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-800 flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              已通过
            </h2>
            <span className="bg-green-200 text-green-700 px-2 py-1 rounded-full text-xs font-bold">
              {approvedPRs.length}
            </span>
          </div>
          <div className="space-y-3">
            {approvedPRs.map((pr) => (
              <div key={pr.id} className="bg-white rounded-lg p-4 shadow-sm border border-green-200">
                <h3 className="font-medium text-gray-800 mb-2">{pr.title}</h3>
                <p className="text-sm text-gray-500">👤 {pr.author}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 第三列：需修改 */}
        <div className="bg-red-50 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-800 flex items-center gap-2">
              <span className="w-3 h-3 bg-red-500 rounded-full"></span>
              需修改
            </h2>
            <span className="bg-red-200 text-red-700 px-2 py-1 rounded-full text-xs font-bold">
              {changesPRs.length}
            </span>
          </div>
          <div className="space-y-3">
            {changesPRs.map((pr) => (
              <div key={pr.id} className="bg-white rounded-lg p-4 shadow-sm border border-red-200">
                <h3 className="font-medium text-gray-800 mb-2">{pr.title}</h3>
                <p className="text-sm text-gray-500">👤 {pr.author}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}