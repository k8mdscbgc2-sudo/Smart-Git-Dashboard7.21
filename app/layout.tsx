import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { AuthProvider } from "@/components/AuthProvider";

export const metadata = {
  title: "智能Git看板",
  description: "Smart Git Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        <AuthProvider>
          <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <main className="flex-1 overflow-auto">{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}