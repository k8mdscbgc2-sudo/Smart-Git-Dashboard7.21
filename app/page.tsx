"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { format } from "date-fns";
import { commits, pullRequests, teamMembers, statistics, commitTypeStats } from "./data/mockData";

// 准备每周提交数据
const weeklyCommitData = teamMembers.map(member => ({
  name: member.name,
  commits: Object.values(member.weeklyCommits).reduce((a, b) => a + b, 0),
}));

// 准备每日提交趋势
const dailyTrend = [
  { name: '周一', commits: 3 + 4 + 5 + 2 },
  { name: '周二', commits: 3 + 5 + 4 + 3 },
  { name: '周三', commits: 4 + 3 + 5 + 2 },
  { name: '周四', commits: 2 + 5 + 3 + 4 },
  { name: '周五', commits: 6 + 2 + 4 + 5 },
  { name: '周六', commits: 1 + 2 + 0 + 1 },
  { name: '周日', commits: 0 + 1 + 0 + 2 },
];

export default function OverviewPage() {
  const currentDate = format(new Date(), "yyyy年MM月dd日 HH:mm:ss");

  return (
    <div className="p-8">
      {/* 页面标题 */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">总览</h1>
        <p className="text-gray-500 text-sm mt-1">最后更新: {currentDate}</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="p-5 bg-white rounded-xl shadow-sm border-l-4 border-blue-500">
          <h3 className="text-sm font-medium text-gray-500">总提交数</h3>
          <p className="text-3xl font-bold text-blue-600 mt-1">{statistics.totalCommits}</p>
          <p className="text-xs text-green-500 mt-1">↑ 比上周增长 {statistics.commitGrowthRate}%</p>
        </div>
        <div className="p-5 bg-white rounded-xl shadow-sm border-l-4 border-green-500">
          <h3 className="text-sm font-medium text-gray-500">总PR数</h3>
          <p className="text-3xl font-bold text-green-600 mt-1">{statistics.totalPRs}</p>
          <p className="text-xs text-gray-500 mt-1">已通过: {statistics.approvedPRs} | 待审核: {statistics.pendingPRs}</p>
        </div>
        <div className="p-5 bg-white rounded-xl shadow-sm border-l-4 border-yellow-500">
          <h3 className="text-sm font-medium text-gray-500">平均审核时长</h3>
          <p className="text-3xl font-bold text-yellow-600 mt-1">{statistics.avgReviewHours}h</p>
          <p className="text-xs text-gray-500 mt-1">从创建到审核完成</p>
        </div>
        <div className="p-5 bg-white rounded-xl shadow-sm border-l-4 border-purple-500">
          <h3 className="text-sm font-medium text-gray-500">任务完成率</h3>
          <p className="text-3xl font-bold text-purple-600 mt-1">{statistics.completionRate}%</p>
          <p className="text-xs text-gray-500 mt-1">本周目标进度</p>
        </div>
      </div>

      {/* 图表区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* 每日提交趋势 */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold mb-4 text-gray-800">每日提交趋势</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="commits" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 团队成员贡献 */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold mb-4 text-gray-800">团队成员贡献</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyCommitData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis dataKey="name" type="category" width={60} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="commits" fill="#22c55e" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 提交类型分布和PR状态 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 提交类型分布 */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold mb-4 text-gray-800">提交类型分布</h2>
          <div className="flex items-center">
            <div className="w-1/2 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: '新功能', value: commitTypeStats.feat },
                      { name: '修复Bug', value: commitTypeStats.bugfix },
                      { name: '文档', value: commitTypeStats.docs },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    <Cell fill="#3b82f6" />
                    <Cell fill="#ef4444" />
                    <Cell fill="#22c55e" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-1/2 space-y-3">
              <div className="flex items-center">
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                <span className="text-gray-700">新功能 (feat)</span>
                <span className="ml-auto font-bold text-blue-600">{commitTypeStats.feat}</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                <span className="text-gray-700">修复Bug (fix)</span>
                <span className="ml-auto font-bold text-red-600">{commitTypeStats.bugfix}</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                <span className="text-gray-700">文档 (docs)</span>
                <span className="ml-auto font-bold text-green-600">{commitTypeStats.docs}</span>
              </div>
            </div>
          </div>
        </div>

        {/* PR状态统计 */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold mb-4 text-gray-800">PR状态统计</h2>
          <div className="flex items-center">
            <div className="w-1/2 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: '待审核', value: statistics.pendingPRs },
                      { name: '已通过', value: statistics.approvedPRs },
                      { name: '需修改', value: statistics.changesPRs },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    <Cell fill="#f59e0b" />
                    <Cell fill="#22c55e" />
                    <Cell fill="#ef4444" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-1/2 space-y-3">
              <div className="flex items-center">
                <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                <span className="text-gray-700">待审核</span>
                <span className="ml-auto font-bold text-yellow-600">{statistics.pendingPRs}</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                <span className="text-gray-700">已通过</span>
                <span className="ml-auto font-bold text-green-600">{statistics.approvedPRs}</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                <span className="text-gray-700">需修改</span>
                <span className="ml-auto font-bold text-red-600">{statistics.changesPRs}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}