"use client";

import Link from "next/link";
import { teamMembers } from "../data/mockData";

export default function TeamPage() {
  return (
    <div className="p-8">
      {/* 页面标题 */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">团队成员</h1>
        <p className="text-gray-500 text-sm mt-1">共 {teamMembers.length} 位成员，点击查看详情</p>
      </div>

      {/* 成员卡片网格 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {teamMembers.map((member) => (
          <Link 
            key={member.id} 
            href={`/team/${member.id}`}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer group"
          >
            {/* 头像 */}
            <div className="text-center mb-4">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-4xl font-bold group-hover:scale-105 transition-transform">
                {member.avatar}
              </div>
              <h2 className="text-lg font-bold text-gray-800">{member.name}</h2>
              <p className="text-sm text-gray-500">{member.role}</p>
            </div>

            {/* 简要统计 */}
            <div className="text-center pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500">
                本周提交: <span className="font-bold text-blue-600">
                  {Object.values(member.weeklyCommits).reduce((a, b) => a + b, 0)}
                </span> 次
              </p>
              <p className="text-xs text-blue-500 mt-2 group-hover:underline">点击查看详情 →</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}