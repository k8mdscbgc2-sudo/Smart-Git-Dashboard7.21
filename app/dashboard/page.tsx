"use client";

import { statistics } from "../data/mockData";
import DemoBanner from "@/components/DemoBanner";

export default function DashboardPage() {
  return (
    <div className="p-8">
      <DemoBanner
        title="演示页面（Demo）"
        description="总览卡片使用 mockData.ts 静态数据。团队成员相关真实数据请前往「成员列表」查看。"
      />
      {/* 页面标题 */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">总览 Dashboard</h1>
      </div>

      {/* 4张统计卡片 - 横向并排排列 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* 总提交数 */}
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
          <h3 className="text-sm font-medium text-gray-500 mb-2">总提交数</h3>
          <p className="text-3xl font-bold text-blue-600">{statistics.totalCommits}</p>
          <p className="text-xs text-green-500 mt-2">↑ 比上周增长 {statistics.commitGrowthRate}%</p>
        </div>

        {/* 总 PR 数 */}
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
          <h3 className="text-sm font-medium text-gray-500 mb-2">总 PR 数</h3>
          <p className="text-3xl font-bold text-green-600">{statistics.totalPRs}</p>
          <p className="text-xs text-gray-500 mt-2">已通过: {statistics.approvedPRs} | 待审核: {statistics.pendingPRs}</p>
        </div>

        {/* 平均审核时长 */}
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-yellow-500">
          <h3 className="text-sm font-medium text-gray-500 mb-2">平均审核时长</h3>
          <p className="text-3xl font-bold text-yellow-600">{statistics.avgReviewHours}h</p>
          <p className="text-xs text-gray-500 mt-2">从创建到审核完成</p>
        </div>

        {/* 计划完成率 */}
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-500">
          <h3 className="text-sm font-medium text-gray-500 mb-2">计划完成率</h3>
          <p className="text-3xl font-bold text-purple-600">{statistics.completionRate}%</p>
          <div className="mt-3 w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-purple-500 rounded-full transition-all duration-300"
              style={{ width: `${statistics.completionRate}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}