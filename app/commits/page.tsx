"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { format } from "date-fns";
import { commits } from "../data/mockData";
import DemoBanner from "@/components/DemoBanner";

const COMMIT_TYPE_LABELS = {
  feat: '新功能',
  bugfix: '修复Bug',
  docs: '文档',
  chore: '配置',
};

const COMMIT_TYPE_COLORS = {
  feat: '#3b82f6',
  bugfix: '#ef4444',
  docs: '#22c55e',
  chore: '#8b5cf6',
};

export default function CommitsPage() {
  // 统计各类型提交数量
  const typeCounts = commits.reduce((acc, commit) => {
    const type = commit.type as keyof typeof acc;
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // 准备饼图数据（包含百分比）
  const pieData = Object.entries(typeCounts).map(([type, count]) => ({
    name: COMMIT_TYPE_LABELS[type as keyof typeof COMMIT_TYPE_LABELS] || type,
    value: count,
    percentage: ((count / commits.length) * 100).toFixed(1),
    color: COMMIT_TYPE_COLORS[type as keyof typeof COMMIT_TYPE_COLORS] || '#6b7280',
  }));

  return (
    <div className="p-8">
      <DemoBanner
        title="演示页面（Demo）"
        description="提交记录 / 饼图使用 mockData.ts 静态数据，待后端补齐 commits 相关接口后将自动接入真实数据。"
      />
      {/* 页面标题 */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">提交记录</h1>
        <p className="text-gray-500 text-sm mt-1">共 {commits.length} 条提交</p>
      </div>

      {/* 环形饼图 - 统计提交类型 */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-lg font-bold mb-6 text-gray-800">提交类型分布</h2>
        <div className="flex items-center justify-center">
          <div className="w-80 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, value }) => {
                    const percentage = ((value / commits.length) * 100).toFixed(1);
                    return `${name} ${percentage}%`;
                  }}
                  labelLine={{ stroke: '#9ca3af', strokeWidth: 1 }}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [`${value} 条`, name]}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value) => <span className="text-gray-700">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 提交记录表格 */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-4 px-6 font-semibold text-gray-600">哈希</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-600">描述</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-600">作者</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-600">日期</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-600">类型</th>
            </tr>
          </thead>
          <tbody>
            {commits.map((commit) => (
              <tr key={commit.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6 font-mono text-blue-600">{commit.hash}</td>
                <td className="py-4 px-6 text-gray-800 font-medium">{commit.message}</td>
                <td className="py-4 px-6 text-gray-600">{commit.author}</td>
                <td className="py-4 px-6 text-gray-500">{format(new Date(commit.date), 'yyyy-MM-dd HH:mm')}</td>
                <td className="py-4 px-6">
                  <span 
                    className="px-3 py-1 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: COMMIT_TYPE_COLORS[commit.type as keyof typeof COMMIT_TYPE_COLORS] || '#6b7280' }}
                  >
                    {COMMIT_TYPE_LABELS[commit.type as keyof typeof COMMIT_TYPE_LABELS] || commit.type}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}