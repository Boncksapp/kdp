"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BookOpen,
  Sparkles,
  KeyRound,
  CircleHelp,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  BookOpenCheck,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { navItems } from "@/lib/utils";

const iconMap: Record<string, React.ReactNode> = {
  "layout-dashboard": <LayoutDashboard className="h-5 w-5" />,
  "book-open": <BookOpen className="h-5 w-5" />,
  sparkles: <Sparkles className="h-5 w-5" />,
  "credit-card": <CreditCard className="h-5 w-5" />,
  "key-round": <KeyRound className="h-5 w-5" />,
  "circle-help": <CircleHelp className="h-5 w-5" />,
};

export function Sidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-zinc-800 bg-zinc-950 transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className={cn("flex h-16 items-center border-b border-zinc-800 px-4", collapsed && "justify-center")}>
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
            <BookOpenCheck className="h-5 w-5 text-white" />
          </div>
          {!collapsed && (
            <span className="text-lg font-bold tracking-tight text-zinc-100">
              KDP Studio
            </span>
          )}
        </Link>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        <TooltipProvider delayDuration={0}>
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = iconMap[item.icon];

            return (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-indigo-600/15 text-indigo-400 shadow-sm"
                        : "text-zinc-500 hover:bg-zinc-800/50 hover:text-zinc-300",
                      collapsed && "justify-center px-2"
                    )}
                  >
                    <span className="flex-shrink-0">{Icon}</span>
                    {!collapsed && (
                      <>
                        <span className="flex-1 truncate">{item.title}</span>
                        {item.badge && (
                          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-600/20 px-1.5 text-[10px] font-medium text-indigo-400">
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </Link>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right" className="flex items-center gap-2">
                    <span>{item.title}</span>
                    {item.badge && (
                      <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-600/20 px-1.5 text-[10px] font-medium text-indigo-400">
                        {item.badge}
                      </span>
                    )}
                  </TooltipContent>
                )}
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </nav>

      {/* Credit Indicator */}
      <div className="border-t border-zinc-800 px-3 py-3">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/settings/billing"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                  collapsed ? "justify-center px-2" : "",
                  pathname === "/settings/billing"
                    ? "bg-indigo-600/15 text-indigo-400"
                    : "text-zinc-500 hover:bg-zinc-800/50 hover:text-zinc-300"
                )}
              >
                <Zap className="h-4 w-4 flex-shrink-0" />
                {!collapsed && (
                  <>
                    <span className="flex-1 text-xs">456 credits</span>
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-600/20 px-1.5 text-[10px] font-medium text-amber-400">
                      91%
                    </span>
                  </>
                )}
              </Link>
            </TooltipTrigger>
            {collapsed && (
              <TooltipContent side="right">
                <span>456 credits</span>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="border-t border-zinc-800 px-3 py-3">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggle}
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
  );
}

export function TopBar({ collapsed, sidebarOpen, onMenuToggle }: { collapsed: boolean; sidebarOpen: boolean; onMenuToggle: () => void }) {
  return (
    <header
      className={cn(
        "fixed right-0 top-0 z-30 flex h-16 items-center border-b border-zinc-800 bg-zinc-950 px-6 transition-all duration-300",
        collapsed ? "left-16" : "left-64"
      )}
    >
      <Button variant="ghost" size="icon" onClick={onMenuToggle} className="mr-4 md:hidden">
        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      <div className="flex flex-1 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/10">
            <BookOpenCheck className="h-5 w-5 text-indigo-400" />
          </div>
          <span className="text-lg font-bold md:hidden text-zinc-100">KDP Studio</span>
        </div>

        <div className="flex items-center gap-4">
          {/* Credit Indicator in TopBar */}
          <Link
            href="/settings/billing"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-amber-600/30 bg-amber-600/5 px-3 py-1 text-xs font-medium text-amber-400 hover:bg-amber-600/10 transition-colors"
          >
            <Zap className="h-3.5 w-3.5" />
            <span>456 credits</span>
          </Link>

          <Button variant="outline" size="sm" className="hidden sm:inline-flex gap-2 border-zinc-700 text-zinc-300 hover:bg-zinc-800">
            <Sparkles className="h-4 w-4" />
            New Project
          </Button>

          <Avatar className="h-8 w-8 cursor-pointer ring-2 ring-zinc-700 ring-offset-2 ring-offset-zinc-950">
            <AvatarFallback className="bg-indigo-600/20 text-indigo-400 text-xs">JD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}

export function MobileSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <aside className="fixed left-0 top-0 z-50 flex h-full w-72 flex-col border-r border-zinc-800 bg-zinc-950">
        <div className="flex h-16 items-center justify-between border-b border-zinc-800 px-4">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
              <BookOpenCheck className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-zinc-100">KDP Studio</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = iconMap[item.icon];

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-indigo-600/15 text-indigo-400 shadow-sm"
                    : "text-zinc-500 hover:bg-zinc-800/50 hover:text-zinc-300"
                )}
              >
                <span className="flex-shrink-0">{Icon}</span>
                <span className="flex-1 truncate">{item.title}</span>
                {item.badge && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-600/20 px-1.5 text-[10px] font-medium text-indigo-400">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-zinc-800 px-3 py-3">
          <Link
            href="/settings/billing"
            onClick={onClose}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
              pathname === "/settings/billing"
                ? "bg-indigo-600/15 text-indigo-400 shadow-sm"
                : "text-zinc-500 hover:bg-zinc-800/50 hover:text-zinc-300"
            )}
          >
            <Zap className="h-4 w-4" />
            <span className="flex-1 truncate">Billing</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-600/20 px-1.5 text-[10px] font-medium text-amber-400">
              91%
            </span>
          </Link>
        </div>
        <div className="border-t border-zinc-800 px-4 py-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-indigo-600/20 text-indigo-400 text-xs">JD</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <p className="font-medium text-zinc-100">John Doe</p>
              <p className="text-xs text-zinc-500">Pro Plan</p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}