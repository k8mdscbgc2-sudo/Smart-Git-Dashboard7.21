"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { href: "/dashboard", label: "总览", icon: "📊" },
    { href: "/commits", label: "提交记录", icon: "📝" },
    { href: "/pr", label: "PR看板", icon: "🔀" },
    { href: "/members", label: "成员列表", icon: "👥" },
    { href: "/team", label: "团队(旧)", icon: "📋" },
  ];

  return (
    <aside className="w-60 bg-slate-800 text-white flex flex-col flex-shrink-0">
      <div className="p-5 border-b border-slate-700">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <span>📈</span>
          智能Git看板
        </h1>
        <p className="text-xs text-slate-400 mt-1">Smart Git Dashboard</p>
      </div>

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

      <div className="p-4 border-t border-slate-700">
        <p className="text-xs text-slate-500 text-center">v1.0.0 © 2026</p>
      </div>
    </aside>
  );
}