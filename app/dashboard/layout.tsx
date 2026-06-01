"use client";

import { useState } from "react";
import { Sidebar, TopBar, MobileSidebar } from "@/components/layout/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="hidden md:block">
        <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      </div>
      <MobileSidebar open={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} />
      <TopBar collapsed={sidebarCollapsed} sidebarOpen={mobileSidebarOpen} onMenuToggle={() => setMobileSidebarOpen(!mobileSidebarOpen)} />
      <main className={`min-h-screen pt-16 transition-all duration-300 ${sidebarCollapsed ? "md:ml-16" : "md:ml-64"}`}>
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}