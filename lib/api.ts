// Smart Commit Helper Backend API 客户端
// 文档：https://smart-commit-helper-backend-production.up.railway.app/docs
// 所有非 /health 接口需要 X-Team-Id + X-Role header

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  'https://smart-commit-helper-backend-production.up.railway.app';

// ============== 类型（从 OpenAPI 推导） ==============

export type Role = 'admin' | 'member';
export type MemberStatus = 'active' | 'locked';
export type MemberAction = 'lock' | 'unlock';
export type SortField = 'name' | 'joined_at' | 'role';
export type SortOrder = 'asc' | 'desc';

export interface MemberBrief {
  id: number;
  name: string;
  email: string;
  role: Role;
  joined_at: string; // ISO datetime
}

export interface MemberDetail extends MemberBrief {
  department: string | null;
  status: MemberStatus;
  team_id: number;
}

export interface PaginatedMembers {
  total: number;
  page: number;
  size: number;
  items: MemberBrief[];
}

export interface MemberCreate {
  name: string;
  email: string;
  role?: Role;
  department?: string | null;
}

export interface MemberUpdate {
  name?: string;
  email?: string;
  role?: Role;
  department?: string | null;
}

export interface MemberReplace {
  name: string;
  email: string;
  role: Role;
  department?: string | null;
}

export interface MemberActionRequest {
  action: MemberAction;
  reason?: string | null;
}

export interface MessageResponse {
  success: boolean;
  message: string;
}

export interface MemberCreatedResponse {
  id: number;
  message: string;
}

export interface SearchParams {
  keyword?: string;
  role?: Role;
  status?: MemberStatus;
  sort_by?: SortField;
  order?: SortOrder;
  page?: number;
  size?: number;
}

export interface ListParams {
  page?: number;
  size?: number;
}

// ============== Auth Context ==============

export interface AuthContext {
  teamId: number;
  role: Role;
}

const AUTH_KEY = 'sgd.auth';

export function loadAuth(): AuthContext | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AuthContext;
    if (typeof parsed.teamId === 'number' && (parsed.role === 'admin' || parsed.role === 'member')) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

export function saveAuth(ctx: AuthContext) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(AUTH_KEY, JSON.stringify(ctx));
}

export function clearAuth() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(AUTH_KEY);
}

// ============== Fetch 封装 ==============

export class ApiError extends Error {
  status: number;
  body: unknown;
  constructor(status: number, message: string, body: unknown) {
    super(message);
    this.status = status;
    this.body = body;
  }
}

interface FetchOptions {
  auth?: AuthContext | null;
  signal?: AbortSignal;
}

async function request<T>(
  method: string,
  path: string,
  body: unknown | undefined,
  opts: FetchOptions = {},
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (opts.auth) {
    headers['X-Team-Id'] = String(opts.auth.teamId);
    headers['X-Role'] = opts.auth.role;
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    cache: 'no-store',
    signal: opts.signal,
  });

  const text = await res.text();
  let parsed: unknown = text;
  try {
    parsed = text ? JSON.parse(text) : null;
  } catch {
    /* keep as text */
  }

  if (!res.ok) {
    const msg =
      (parsed && typeof parsed === 'object' && 'detail' in (parsed as Record<string, unknown>))
        ? JSON.stringify((parsed as { detail: unknown }).detail)
        : `HTTP ${res.status}`;
    throw new ApiError(res.status, msg, parsed);
  }

  return parsed as T;
}

// ============== 业务 API ==============

export const api = {
  health: () => request<{ status: string; trace_id: string }>('GET', '/api/v1/health', undefined, {}),

  listMembers: (params: ListParams = {}, auth: AuthContext) =>
    request<PaginatedMembers>('GET', '/api/v1/members', undefined, {
      auth,
    }).then((res) => {
      // 后端当前不支持 query（OpenAPI 显示 query 但列表接口未读 page/size），返回全量；这里用 size/page 仅做前端截断
      const all = res.items;
      const page = params.page ?? 1;
      const size = params.size ?? (all.length || 20);
      const start = (page - 1) * size;
      return { ...res, items: all.slice(start, start + size) };
    }),

  searchMembers: (params: SearchParams, auth: AuthContext) => {
    const q = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') q.set(k, String(v));
    });
    const qs = q.toString();
    return request<PaginatedMembers>('GET', `/api/v1/members/search${qs ? '?' + qs : ''}`, undefined, { auth });
  },

  getMember: (id: number | string, auth: AuthContext) =>
    request<MemberDetail>('GET', `/api/v1/members/${id}`, undefined, { auth }),

  createMember: (data: MemberCreate, auth: AuthContext) =>
    request<MemberCreatedResponse>('POST', '/api/v1/members', data, { auth }),

  updateMember: (id: number | string, data: MemberUpdate, auth: AuthContext) =>
    request<MessageResponse>('PATCH', `/api/v1/members/${id}`, data, { auth }),

  replaceMember: (id: number | string, data: MemberReplace, auth: AuthContext) =>
    request<MessageResponse>('PUT', `/api/v1/members/${id}`, data, { auth }),

  deleteMember: (id: number | string, auth: AuthContext) =>
    request<MessageResponse>('DELETE', `/api/v1/members/${id}`, undefined, { auth }),

  executeAction: (id: number | string, data: MemberActionRequest, auth: AuthContext) =>
    request<MessageResponse>('POST', `/api/v1/members/${id}/actions`, data, { auth }),
};

// 工具：根据姓名生成头像缩写
export function avatarOf(name: string): string {
  if (!name) return '?';
  // 中文：取最后两个字符；英文：取首字母
  const trimmed = name.trim();
  if (/[一-龥]/.test(trimmed)) {
    return trimmed.slice(-2);
  }
  const parts = trimmed.split(/\s+/);
  return (parts[0][0] + (parts[1]?.[0] ?? '')).toUpperCase();
}