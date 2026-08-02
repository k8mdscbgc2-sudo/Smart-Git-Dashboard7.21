"use client";

import { notFound } from "next/navigation";
import { teamMembers } from "../../data/mockData";

const DAY_KEYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const DAY_LABELS = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

// 根据提交数量返回颜色深浅 (0提交: 浅灰, 越多越深)
const getHeatColor = (count: number, maxCount: number) => {
  if (count === 0) return '#e5e7eb'; // 浅灰色
  if (maxCount === 0) return '#e5e7eb';
  
  const intensity = count / maxCount;
  if (intensity <= 0.25) return '#93c5fd'; // 最浅蓝
  if (intensity <= 0.5) return '#60a5fa'; // 浅蓝
  if (intensity <= 0.75) return '#3b82f6'; // 中蓝
  return '#1d4ed8'; // 深蓝
};

export default function TeamMemberDetailPage({ params }: { params: { id: string } }) {
  const member = teamMembers.find(m => String(m.id) === params.id);
  
  if (!member) {
    notFound();
  }

  const totalCommits = Object.values(member.weeklyCommits).reduce((a, b) => a + b, 0);
  const maxCommits = Math.max(...Object.values(member.weeklyCommits));

  return (
    <div className="p-8">
      {/* 返回链接和页面标题 */}
      <div className="mb-8">
        <a href="/team" className="text-blue-600 hover:underline text-sm mb-4 inline-block">
          ← 返回团队列表
        </a>
        <h1 className="text-2xl font-bold text-gray-800">成员详情</h1>
      </div>

      {/* 基本信息卡片 */}
      <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
        <div className="flex items-center gap-8">
          {/* 大头像 */}
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-6xl font-bold">
            {member.avatar}
          </div>
          
          {/* 信息 */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800">{member.name}</h2>
            <p className="text-lg text-gray-500 mt-1">{member.role}</p>
            <div className="mt-4 flex gap-6">
              <div>
                <p className="text-sm text-gray-500">本周提交总数</p>
                <p className="text-2xl font-bold text-blue-600">{totalCommits} 次</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">最高单日提交</p>
                <p className="text-2xl font-bold text-green-600">{maxCommits} 次</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 7天热力图 */}
      <div className="bg-white rounded-xl shadow-sm p-8">
        <h3 className="text-xl font-bold text-gray-800 mb-6">7天提交热力图</h3>
        
        {/* 热力图方块 */}
        <div className="flex items-center gap-3 mb-6">
          {DAY_KEYS.map((dayKey, index) => {
            const commitCount = Number(member.weeklyCommits[dayKey as keyof typeof member.weeklyCommits]) || 0;
            const bgColor = getHeatColor(commitCount, maxCommits);
            
            return (
              <div key={dayKey} className="flex flex-col items-center gap-2">
                {/* 热力方块 */}
                <div
                  className="w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold text-lg cursor-pointer hover:scale-110 transition-transform shadow-sm"
                  style={{ backgroundColor: bgColor }}
                  title={`${DAY_LABELS[index]}: ${commitCount} 次提交`}
                >
                  {commitCount}
                </div>
                {/* 星期标签 */}
                <span className="text-sm text-gray-600">{DAY_LABELS[index]}</span>
              </div>
            );
          })}
        </div>

        {/* 颜色图例 */}
        <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
          <span className="text-sm text-gray-500">颜色图例:</span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">0 次</span>
            <div className="w-6 h-6 rounded" style={{ backgroundColor: '#e5e7eb' }}></div>
            <div className="w-6 h-6 rounded" style={{ backgroundColor: '#93c5fd' }}></div>
            <div className="w-6 h-6 rounded" style={{ backgroundColor: '#60a5fa' }}></div>
            <div className="w-6 h-6 rounded" style={{ backgroundColor: '#3b82f6' }}></div>
            <div className="w-6 h-6 rounded" style={{ backgroundColor: '#1d4ed8' }}></div>
            <span className="text-xs text-gray-500">更多</span>
          </div>
        </div>

        {/* 每日详细数据 */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <h4 className="font-semibold text-gray-700 mb-4">每日提交详情</h4>
          <div className="grid grid-cols-7 gap-4">
            {DAY_KEYS.map((dayKey, index) => {
              const commitCount = Number(member.weeklyCommits[dayKey as keyof typeof member.weeklyCommits]) || 0;
              return (
                <div key={dayKey} className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">{DAY_LABELS[index]}</p>
                  <p className="text-xl font-bold text-blue-600 mt-1">{commitCount}</p>
                  <p className="text-xs text-gray-400">次提交</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}