'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api, avatarOf, MemberBrief } from '@/lib/api';
import { useAuth } from '@/components/AuthProvider';

export default function TeamPage() {
  const { auth } = useAuth();
  const [members, setMembers] = useState<MemberBrief[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!auth) return;
    setLoading(true);
    setError(null);
    api
      .listMembers({}, auth)
      .then((r) => setMembers(r.items))
      .catch((e) => setError(e instanceof Error ? e.message : '加载失败'))
      .finally(() => setLoading(false));
  }, [auth]);

  if (!auth) return <div className="p-8 text-gray-500">未登录</div>;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">团队</h1>
        <p className="text-gray-500 text-sm mt-1">
          Team #{auth.teamId} · 共 {members.length} 位成员，点击查看详情
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-3 py-2 mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-gray-400 py-12 text-center">加载中…</div>
      ) : members.length === 0 ? (
        <div className="text-center text-gray-400 py-12 bg-white rounded-xl shadow-sm">
          当前团队暂无成员
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((member) => (
            <Link
              key={member.id}
              href={`/team/${member.id}`}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer group"
            >
              <div className="text-center mb-4">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-3xl font-bold group-hover:scale-105 transition-transform">
                  {avatarOf(member.name)}
                </div>
                <h2 className="text-lg font-bold text-gray-800">{member.name}</h2>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
              <div className="text-center pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-400">
                  加入 {new Date(member.joined_at).toLocaleDateString()}
                </p>
                <p className="text-xs text-blue-500 mt-2 group-hover:underline">点击查看详情 →</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}