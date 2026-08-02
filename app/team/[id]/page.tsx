'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { api, avatarOf, MemberDetail } from '@/lib/api';
import { useAuth } from '@/components/AuthProvider';

export default function TeamMemberDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const { auth } = useAuth();
  const router = useRouter();
  const [member, setMember] = useState<MemberDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!auth || !id) return;
    setLoading(true);
    setError(null);
    api
      .getMember(id, auth)
      .then(setMember)
      .catch((e) => {
        if (e && typeof e === 'object' && 'status' in e && (e as { status: number }).status === 404) {
          router.replace('/team');
        } else {
          setError(e instanceof Error ? e.message : '加载失败');
        }
      })
      .finally(() => setLoading(false));
  }, [auth, id, router]);

  if (loading) return <div className="p-8 text-gray-500">加载中…</div>;
  if (error)
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-3 py-2">{error}</div>
      </div>
    );
  if (!member) return null;

  return (
    <div className="p-8">
      <div className="mb-8">
        <Link href="/team" className="text-blue-600 hover:underline text-sm mb-4 inline-block">
          ← 返回团队列表
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">成员详情</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
        <div className="flex items-center gap-8">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-5xl font-bold">
            {avatarOf(member.name)}
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-800">{member.name}</h2>
            <p className="text-lg text-gray-500 mt-1">{member.email}</p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <span className="px-2 py-1 rounded bg-blue-50 text-blue-700 font-mono">{member.role}</span>
              <span
                className={`px-2 py-1 rounded font-mono ${
                  member.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                }`}
              >
                {member.status}
              </span>
              {member.department && (
                <span className="px-2 py-1 rounded bg-slate-100 text-slate-700">{member.department}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-8">
        <h3 className="text-xl font-bold text-gray-800 mb-6">元数据</h3>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-gray-500">ID</dt>
            <dd className="font-mono text-gray-800">{member.id}</dd>
          </div>
          <div>
            <dt className="text-gray-500">加入时间</dt>
            <dd className="text-gray-800">{new Date(member.joined_at).toLocaleString()}</dd>
          </div>
          <div>
            <dt className="text-gray-500">所属团队</dt>
            <dd className="text-gray-800">#{member.team_id}</dd>
          </div>
          <div>
            <dt className="text-gray-500">邮箱</dt>
            <dd className="text-gray-800">{member.email}</dd>
          </div>
        </dl>
        <p className="mt-6 text-xs text-gray-400">
          备注：后端当前未提供 /members/{'{id}'}/commits 接口，热力图模块待后端补齐后接入。
        </p>
      </div>
    </div>
  );
}