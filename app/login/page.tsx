'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { api, API_BASE_URL, Role } from '@/lib/api';

export default function LoginPage() {
  const router = useRouter();
  const { setAuth, auth, ready } = useAuth();
  const [teamId, setTeamId] = useState('1');
  const [role, setRole] = useState<Role>('admin');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [backendOk, setBackendOk] = useState<boolean | null>(null);

  useEffect(() => {
    api
      .health()
      .then((r) => setBackendOk(r.status === 'ok'))
      .catch(() => setBackendOk(false));
  }, []);

  useEffect(() => {
    if (ready && auth) {
      router.replace('/');
    }
  }, [ready, auth, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const tid = Number(teamId);
    if (!Number.isInteger(tid) || tid <= 0) {
      setError('Team ID 必须是正整数');
      return;
    }
    setSubmitting(true);
    try {
      // 先用填写的凭据试调一次，确保后端接受
      await api.listMembers({ page: 1, size: 1 }, { teamId: tid, role });
      setAuth({ teamId: tid, role });
      router.replace('/');
    } catch (err) {
      const msg = err instanceof Error ? err.message : '登录失败';
      setError(`后端拒绝了凭据：${msg}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">📈</div>
          <h1 className="text-2xl font-bold text-gray-800">智能 Git 看板</h1>
          <p className="text-sm text-gray-500 mt-1">Smart Git Dashboard · 登录</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Team ID</label>
            <input
              type="number"
              min={1}
              value={teamId}
              onChange={(e) => setTeamId(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="例如：1"
              required
            />
            <p className="text-xs text-gray-400 mt-1">对应请求头 X-Team-Id</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">角色</label>
            <div className="grid grid-cols-2 gap-2">
              {(['admin', 'member'] as Role[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`px-3 py-2 rounded-lg border text-sm font-medium transition ${
                    role === r
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                  }`}
                >
                  {r === 'admin' ? 'Admin（可写）' : 'Member（只读）'}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-1">对应请求头 X-Role</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg transition"
          >
            {submitting ? '验证中…' : '登录'}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-100 text-xs text-gray-400 space-y-1">
          <p>API: <code className="text-gray-600">{API_BASE_URL}</code></p>
          <p>
            后端健康：
            {backendOk === null && <span className="text-gray-400">检测中…</span>}
            {backendOk === true && <span className="text-green-600">✓ 可达</span>}
            {backendOk === false && <span className="text-red-600">✗ 不可达</span>}
          </p>
        </div>
      </div>
    </div>
  );
}