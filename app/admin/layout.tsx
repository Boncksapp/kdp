"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Users,
  Activity,
  Shield,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Settings,
  BookOpenCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";

const adminNavItems = [
  { title: "Overview", href: "/admin/overview", icon: BarChart3 },
  { title: "User Management", href: "/admin/users", icon: Users },
  { title: "Job Monitor", href: "/admin/jobs", icon: Activity },
  { title: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Admin Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-zinc-800 bg-zinc-950 transition-all duration-300",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <div className={cn("flex h-16 items-center border-b border-zinc-800 px-4", collapsed && "justify-center")}>
          <Link href="/admin/overview" className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-600">
              <Shield className="h-5 w-5 text-white" />
            </div>
            {!collapsed && (
              <span className="text-lg font-bold tracking-tight text-zinc-100">
                Admin Panel
              </span>
            )}
          </Link>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          <TooltipProvider delayDuration={0}>
            {adminNavItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              const Icon = item.icon;

              return (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-amber-600/15 text-amber-400 shadow-sm"
                          : "text-zinc-500 hover:bg-zinc-800/50 hover:text-zinc-300",
                        collapsed && "justify-center px-2"
                      )}
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && <span className="flex-1 truncate">{item.title}</span>}
                    </Link>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right">{item.title}</TooltipContent>
                  )}
                </Tooltip>
              );
            })}
          </TooltipProvider>
        </nav>

        <div className="border-t border-zinc-800 px-3 py-3">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50">
              <BookOpenCheck className="h-4 w-4" />
              {!collapsed && <span>Back to App</span>}
            </Button>
          </Link>
        </div>

        <div className="border-t border-zinc-800 px-3 py-3">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCollapsed(!collapsed)}
                  className={cn("h-9 w-full text-zinc-500 hover:bg-zinc-800/50 hover:text-zinc-300", collapsed && "w-9 mx-auto")}
                >
                  {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                {collapsed ? "Expand sidebar" : "Collapse sidebar"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </aside>

      {/* Main content */}
      <main className={cn("min-h-screen transition-all duration-300", collapsed ? "ml-16" : "ml-64")}>
        <header className="flex h-16 items-center border-b border-zinc-800 bg-zinc-950 px-6">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-amber-400" />
            <span className="text-sm font-medium text-zinc-400">Admin</span>
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                <BookOpenCheck className="h-4 w-4 mr-1" />
                Dashboard
              </Button>
            </Link>
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-amber-600/20 text-amber-400 text-xs">AD</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}