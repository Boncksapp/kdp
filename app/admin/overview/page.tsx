"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  BookOpen,
  Users,
  TrendingUp,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

const metrics = [
  {
    title: "Total Books Generated",
    value: "847",
    change: "+12.5% this week",
    changeType: "positive",
    icon: BookOpen,
    color: "text-blue-400 bg-blue-600/10",
  },
  {
    title: "Export Success Rate",
    value: "97.3%",
    change: "+2.1% improvement",
    changeType: "positive",
    icon: CheckCircle2,
    color: "text-emerald-400 bg-emerald-600/10",
  },
  {
    title: "Active Users (24h)",
    value: "128",
    change: "+18 vs yesterday",
    changeType: "positive",
    icon: Users,
    color: "text-purple-400 bg-purple-600/10",
  },
  {
    title: "Total API Cost",
    value: "$4,283.47",
    change: "+$342 from last month",
    changeType: "negative",
    icon: DollarSign,
    color: "text-amber-400 bg-amber-600/10",
  },
];

const recentErrors = [
  { type: "SDXL Timeout", count: 3, lastOccurred: "2 min ago" },
  { type: "LLM Rate Limit", count: 12, lastOccurred: "15 min ago" },
  { type: "PDF Render Fail", count: 1, lastOccurred: "1 hour ago" },
];

export default function AdminOverviewPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Admin Overview</h1>
        <p className="mt-1 text-sm text-zinc-500">
          System-wide metrics and performance at a glance.
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.title} className="border-zinc-800 bg-zinc-900/50 transition-all duration-200 hover:border-zinc-700">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-zinc-500">{metric.title}</CardTitle>
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${metric.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-zinc-100">{metric.value}</div>
                <div className="mt-1 flex items-center gap-1 text-xs">
                  {metric.changeType === "positive" ? (
                    <ArrowUp className="h-3 w-3 text-emerald-400" />
                  ) : (
                    <ArrowDown className="h-3 w-3 text-red-400" />
                  )}
                  <span className={metric.changeType === "positive" ? "text-emerald-400" : "text-red-400"}>
                    {metric.change}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity / Error Log */}
        <Card className="border-zinc-800 bg-zinc-900/50">
          <CardHeader>
            <CardTitle className="text-zinc-100">Recent Errors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentErrors.map((err) => (
                <div key={err.type} className="flex items-center justify-between rounded-lg border border-zinc-800/50 p-3">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-4 w-4 text-red-400" />
                    <div>
                      <p className="text-sm font-medium text-zinc-200">{err.type}</p>
                      <p className="text-xs text-zinc-500">{err.count} occurrences</p>
                    </div>
                  </div>
                  <span className="text-xs text-zinc-500">{err.lastOccurred}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card className="border-zinc-800 bg-zinc-900/50">
          <CardHeader>
            <CardTitle className="text-zinc-100">System Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "API Latency", value: "245ms", status: "healthy" },
              { label: "Database", value: "Connected", status: "healthy" },
              { label: "Job Queue", value: "12 pending", status: "warning" },
              { label: "Storage", value: "68% used", status: "healthy" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">{item.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-zinc-200">{item.value}</span>
                  <Badge variant={item.status === "healthy" ? "success" : "warning"}>
                    {item.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "API Requests Today", value: "12,487" },
          { label: "Avg Response Time", value: "342ms" },
          { label: "Jobs Completed", value: "1,204" },
          { label: "Uptime", value: "99.97%" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 text-center">
            <p className="text-xl font-bold text-zinc-100">{stat.value}</p>
            <p className="text-xs text-zinc-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}