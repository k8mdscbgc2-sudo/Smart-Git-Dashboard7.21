'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AuthContext, loadAuth, saveAuth, clearAuth } from '@/lib/api';

interface AuthValue {
  auth: AuthContext | null;
  setAuth: (ctx: AuthContext) => void;
  logout: () => void;
  ready: boolean;
}

const AuthCtx = createContext<AuthValue>({
  auth: null,
  setAuth: () => {},
  logout: () => {},
  ready: false,
});

const PUBLIC_PATHS = new Set(['/login']);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuthState] = useState<AuthContext | null>(null);
  const [ready, setReady] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const stored = loadAuth();
    setAuthState(stored);
    setReady(true);

    if (!stored && pathname && !PUBLIC_PATHS.has(pathname)) {
      router.replace('/login');
    }
  }, [pathname, router]);

  const setAuth = useCallback((ctx: AuthContext) => {
    saveAuth(ctx);
    setAuthState(ctx);
  }, []);

  const logout = useCallback(() => {
    clearAuth();
    setAuthState(null);
    router.replace('/login');
  }, [router]);

  return (
    <AuthCtx.Provider value={{ auth, setAuth, logout, ready }}>
      {children}
    </AuthCtx.Provider>
  );
}

export function useAuth(): AuthValue {
  return useContext(AuthCtx);
}