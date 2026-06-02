"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { defaultStats } from "@/lib/utils";
import {
  BookOpen,
  RefreshCw,
  FileText,
  Zap,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

const iconMap: Record<string, React.ReactNode> = {
  "book-open": <BookOpen className="h-5 w-5" />,
  "refresh-cw": <RefreshCw className="h-5 w-5" />,
  "file-text": <FileText className="h-5 w-5" />,
  zap: <Zap className="h-5 w-5" />,
};

const changeIconMap: Record<string, React.ReactNode> = {
  positive: <TrendingUp className="h-4 w-4 text-emerald-400" />,
  negative: <TrendingDown className="h-4 w-4 text-red-400" />,
  neutral: <Clock className="h-4 w-4 text-amber-400" />,
};

const recentProjects = [
  { name: "Children's Coloring Book", status: "completed", pages: 32, updated: "2h ago" },
  { name: "Fantasy Novel Vol. 1", status: "generating", pages: 240, updated: "1h ago" },
  { name: "Recipe Collection", status: "draft", pages: 64, updated: "1d ago" },
  { name: "Journal Template Pro", status: "completed", pages: 200, updated: "3d ago" },
  { name: "Poetry Anthology", status: "review", pages: 48, updated: "5d ago" },
];

const statusColors: Record<string, string> = {
  completed: "success",
  generating: "warning",
  draft: "secondary",
  review: "default",
} as const;

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Dashboard</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Welcome back! Here&apos;s your publishing overview.
          </p>
        </div>
        <Link href="/create">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Book
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {defaultStats.map((stat) => (
          <Card key={stat.title} className="border-zinc-800 bg-zinc-900/50 transition-all duration-200 hover:border-zinc-700">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-zinc-500">{stat.title}</CardTitle>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600/10">
                <div className="text-indigo-400">{iconMap[stat.icon]}</div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-zinc-100">{stat.value}</div>
              <p className="mt-1 flex items-center gap-1 text-xs text-zinc-500">
                {changeIconMap[stat.changeType]}
                <span>{stat.change}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-zinc-800 bg-zinc-900/50 lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-zinc-100">Recent Projects</CardTitle>
            <Link href="/projects" className="flex items-center gap-1 text-xs text-zinc-500 hover:text-indigo-400 transition-colors">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {recentProjects.map((project) => (
                <div key={project.name} className="flex items-center justify-between rounded-lg px-3 py-2.5 transition-colors hover:bg-zinc-800/30">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-indigo-600/10">
                      <BookOpen className="h-4 w-4 text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-zinc-200">{project.name}</p>
                      <p className="text-xs text-zinc-500">{project.pages} pages</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={statusColors[project.status] as "success" | "warning" | "secondary" | "default"}>{project.status}</Badge>
                    <span className="text-xs text-zinc-500">{project.updated}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-zinc-800 bg-zinc-900/50">
            <CardHeader>
              <CardTitle className="text-zinc-100">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/create">
                <Button variant="outline" className="w-full justify-start gap-3 h-10 border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                  <Plus className="h-4 w-4" />
                  Start New Book
                </Button>
              </Link>
              <Link href="/projects">
                <Button variant="outline" className="w-full justify-start gap-3 h-10 border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                  <BookOpen className="h-4 w-4" />
                  Browse Projects
                </Button>
              </Link>
              <Link href="/help">
                <Button variant="outline" className="w-full justify-start gap-3 h-10 border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                  <FileText className="h-4 w-4" />
                  View Documentation
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-zinc-800 bg-zinc-900/50">
            <CardHeader>
              <CardTitle className="text-zinc-100">Usage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="text-zinc-500">Monthly Credits</span>
                  <span className="font-medium text-zinc-200">8,432 / 10,000</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800">
                  <div className="h-full rounded-full bg-indigo-500 transition-all" style={{ width: "84%" }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="text-zinc-500">Storage</span>
                  <span className="font-medium text-zinc-200">2.1 GB / 5 GB</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800">
                  <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: "42%" }} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}