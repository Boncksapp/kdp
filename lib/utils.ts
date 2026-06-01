import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type NavItem = {
  title: string;
  href: string;
  icon: string;
  badge?: number;
};

export const navItems: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: "layout-dashboard" },
  { title: "My Projects", href: "/projects", icon: "book-open" },
  { title: "Create Book", href: "/create", icon: "sparkles" },
  { title: "Billing", href: "/settings/billing", icon: "credit-card" },
  { title: "API Keys", href: "/settings/api-keys", icon: "key-round" },
  { title: "Help Center", href: "/help", icon: "circle-help" },
];

export type StatCard = {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: string;
};

export const defaultStats: StatCard[] = [
  {
    title: "Total Books",
    value: "12",
    change: "+3 this month",
    changeType: "positive",
    icon: "book-open",
  },
  {
    title: "Active Projects",
    value: "4",
    change: "2 in review",
    changeType: "neutral",
    icon: "refresh-cw",
  },
  {
    title: "Pages Generated",
    value: "1,247",
    change: "+18% vs last month",
    changeType: "positive",
    icon: "file-text",
  },
  {
    title: "API Credits Used",
    value: "8,432",
    change: "76% of limit",
    changeType: "negative",
    icon: "zap",
  },
];