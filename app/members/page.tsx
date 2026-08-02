'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import Link from 'next/link';
import { api, avatarOf, MemberBrief, Role, MemberStatus } from '@/lib/api';
import { useAuth } from '@/components/AuthProvider';

const PAGE_SIZE = 12;

export default function MembersPage() {
  const { auth } = useAuth();
  const [members, setMembers] = useState<MemberBrief[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [roleFilter, setRoleFilter] = useState<'' | Role>('');
  const [statusFilter, setStatusFilter] = useState<'' | MemberStatus>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 新建 / 编辑 / 锁定 模态
  const [showCreate, setShowCreate] = useState(false);
  const [editing, setEditing] = useState<MemberBrief | null>(null);
  const [actioning, setActioning] = useState<MemberBrief | null>(null);

  const fetchList = useCallback(async () => {
    if (!auth) return;
    setLoading(true);
    setError(null);
    try {
      // 后端 search 支持 keyword + role + status
      const useSearch = !!keyword || !!roleFilter || !!statusFilter;
      const res = useSearch
        ? await api.searchMembers(
            { keyword, role: roleFilter || undefined, status: statusFilter || undefined, page, size: PAGE_SIZE },
            auth,
          )
        : await api.listMembers({ page, size: PAGE_SIZE }, auth);
      setMembers(res.items);
      setTotal(res.total);
    } catch (e) {
      setError(e instanceof Error ? e.message : '加载失败');
    } finally {
      setLoading(false);
    }
  }, [auth, keyword, roleFilter, statusFilter, page]);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / PAGE_SIZE)), [total]);

  if (!auth) {
    return <div className="p-8 text-gray-500">未登录</div>;
  }

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">团队成员</h1>
          <p className="text-gray-500 text-sm mt-1">团队 {auth.teamId} · 共 {total} 位成员</p>
        </div>
        {auth.role === 'admin' && (
          <button
            onClick={() => setShowCreate(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg"
          >
            + 新增成员
          </button>
        )}
      </div>

      {/* 筛选栏 */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-wrap gap-3 items-center">
        <input
          type="text"
          placeholder="搜索姓名 / 邮箱"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
            setPage(1);
          }}
          className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm flex-1 min-w-[180px] focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={roleFilter}
          onChange={(e) => {
            setRoleFilter(e.target.value as '' | Role);
            setPage(1);
          }}
          className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
        >
          <option value="">所有角色</option>
          <option value="admin">Admin</option>
          <option value="member">Member</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value as '' | MemberStatus);
            setPage(1);
          }}
          className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
        >
          <option value="">所有状态</option>
          <option value="active">Active</option>
          <option value="locked">Locked</option>
        </select>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-3 py-2 mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center text-gray-400 py-12">加载中…</div>
      ) : members.length === 0 ? (
        <div className="text-center text-gray-400 py-12 bg-white rounded-xl shadow-sm">
          当前团队暂无成员
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 group"
            >
              <Link href={`/members/${member.id}`} className="block">
                <div className="text-center mb-4">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-3xl font-bold group-hover:scale-105 transition-transform">
                    {avatarOf(member.name)}
                  </div>
                  <h2 className="text-lg font-bold text-gray-800">{member.name}</h2>
                  <p className="text-sm text-gray-500 truncate">{member.email}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {member.role} · 加入 {new Date(member.joined_at).toLocaleDateString()}
                  </p>
                </div>
              </Link>
              {auth.role === 'admin' && (
                <div className="flex gap-2 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => setEditing(member)}
                    className="flex-1 text-xs py-1.5 rounded border border-gray-300 hover:bg-gray-50"
                  >
                    编辑
                  </button>
                  <button
                    onClick={() => setActioning(member)}
                    className="flex-1 text-xs py-1.5 rounded border border-gray-300 hover:bg-gray-50"
                  >
                    锁定/解锁
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 分页 */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2 text-sm">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 rounded border border-gray-300 disabled:opacity-40 hover:bg-gray-50"
          >
            上一页
          </button>
          <span className="text-gray-600">
            {page} / {totalPages}
          </span>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 rounded border border-gray-300 disabled:opacity-40 hover:bg-gray-50"
          >
            下一页
          </button>
        </div>
      )}

      {showCreate && auth.role === 'admin' && (
        <MemberFormModal
          onClose={() => setShowCreate(false)}
          onSaved={() => {
            setShowCreate(false);
            fetchList();
          }}
        />
      )}
      {editing && auth.role === 'admin' && (
        <MemberFormModal
          member={editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            fetchList();
          }}
        />
      )}
      {actioning && auth.role === 'admin' && (
        <ActionModal
          member={actioning}
          onClose={() => setActioning(null)}
          onDone={() => {
            setActioning(null);
            fetchList();
          }}
        />
      )}
    </div>
  );
}

function MemberFormModal({
  member,
  onClose,
  onSaved,
}: {
  member?: MemberBrief;
  onClose: () => void;
  onSaved: () => void;
}) {
  const { auth } = useAuth();
  const [name, setName] = useState(member?.name ?? '');
  const [email, setEmail] = useState(member?.email ?? '');
  const [role, setRole] = useState<Role>(member?.role ?? 'member');
  const [department, setDepartment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const isEdit = !!member;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) return;
    setSubmitting(true);
    setErr(null);
    try {
      if (isEdit && member) {
        await api.updateMember(
          member.id,
          { name, email, role, department: department || null },
          auth,
        );
      } else {
        await api.createMember(
          { name, email, role, department: department || null },
          auth,
        );
      }
      onSaved();
    } catch (e) {
      setErr(e instanceof Error ? e.message : '保存失败');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal onClose={onClose} title={isEdit ? '编辑成员' : '新增成员'}>
      <form onSubmit={handleSubmit} className="space-y-3">
        <Field label="姓名" required>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input"
          />
        </Field>
        <Field label="邮箱" required>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input"
          />
        </Field>
        <Field label="角色">
          <select value={role} onChange={(e) => setRole(e.target.value as Role)} className="input">
            <option value="member">member</option>
            <option value="admin">admin</option>
          </select>
        </Field>
        <Field label="部门（可选）">
          <input
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="input"
          />
        </Field>
        {err && <p className="text-red-600 text-sm">{err}</p>}
        <div className="flex gap-2 pt-2">
          <button type="button" onClick={onClose} className="btn-secondary flex-1">
            取消
          </button>
          <button type="submit" disabled={submitting} className="btn-primary flex-1">
            {submitting ? '保存中…' : '保存'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

function ActionModal({
  member,
  onClose,
  onDone,
}: {
  member: MemberBrief;
  onClose: () => void;
  onDone: () => void;
}) {
  const { auth } = useAuth();
  const [reason, setReason] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  // 简要：先查详情获知 status，再决定执行 lock/unlock
  const [status, setStatus] = useState<MemberStatus | null>(null);
  useEffect(() => {
    if (!auth) return;
    api
      .getMember(member.id, auth)
      .then((d) => setStatus(d.status))
      .catch(() => setStatus(null));
  }, [auth, member.id]);

  const handle = async () => {
    if (!auth) return;
    setSubmitting(true);
    setErr(null);
    try {
      const next: 'lock' | 'unlock' = status === 'locked' ? 'unlock' : 'lock';
      await api.executeAction(member.id, { action: next, reason: reason || null }, auth);
      onDone();
    } catch (e) {
      setErr(e instanceof Error ? e.message : '操作失败');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal onClose={onClose} title={`锁定/解锁 ${member.name}`}>
      <p className="text-sm text-gray-600 mb-3">
        当前状态：<span className="font-mono">{status ?? '查询中…'}</span>
      </p>
      <Field label="原因（可选）">
        <input value={reason} onChange={(e) => setReason(e.target.value)} className="input" />
      </Field>
      {err && <p className="text-red-600 text-sm mt-2">{err}</p>}
      <div className="flex gap-2 pt-4">
        <button onClick={onClose} className="btn-secondary flex-1">
          取消
        </button>
        <button
          onClick={handle}
          disabled={submitting || !status}
          className="btn-primary flex-1"
        >
          {submitting ? '执行中…' : status === 'locked' ? '解锁' : '锁定'}
        </button>
      </div>
    </Modal>
  );
}

function Modal({
  children,
  onClose,
  title,
}: {
  children: React.ReactNode;
  onClose: () => void;
  title: string;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Field({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </span>
      {children}
    </label>
  );
}