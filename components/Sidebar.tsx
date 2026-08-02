"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

export default function Sidebar() {
  const pathname = usePathname();
  const { auth, logout } = useAuth();

  const menuItems = [
    { href: "/dashboard", label: "总览", icon: "📊" },
    { href: "/commits", label: "提交记录", icon: "📝" },
    { href: "/pr", label: "PR看板", icon: "🔀" },
    { href: "/members", label: "成员列表", icon: "👥" },
    { href: "/team", label: "团队", icon: "📋" },
  ];

  const onLogin = pathname === "/login";

  return (
    <aside className="w-60 bg-slate-800 text-white flex flex-col flex-shrink-0">
      <div className="p-5 border-b border-slate-700">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <span>📈</span>
          智能Git看板
        </h1>
        <p className="text-xs text-slate-400 mt-1">Smart Git Dashboard</p>
      </div>

      {!onLogin && (
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    pathname === item.href
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-slate-300 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <div className="p-4 border-t border-slate-700 text-xs space-y-2">
        {auth && !onLogin && (
          <div className="text-slate-300">
            <div>Team: <span className="text-white font-mono">{auth.teamId}</span></div>
            <div>Role: <span className="text-white">{auth.role}</span></div>
            <button
              onClick={logout}
              className="mt-2 w-full bg-slate-700 hover:bg-red-600 text-white text-xs py-1.5 rounded transition"
            >
              登出
            </button>
          </div>
        )}
        <p className="text-slate-500 text-center">v1.0.0 © 2026</p>
      </div>
    </aside>
  );
}