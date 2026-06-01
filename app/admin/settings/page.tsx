"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Shield, Bell, Lock, Palette } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Admin Settings</h1>
        <p className="mt-1 text-sm text-zinc-500">Configure system-wide preferences.</p>
      </div>

      <Card className="border-zinc-800 bg-zinc-900/50">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-600/10">
              <Bell className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <CardTitle className="text-zinc-100">Notifications</CardTitle>
              <CardDescription className="text-zinc-500">Configure system alert channels.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Webhook URL</label>
              <Input placeholder="https://hooks.example.com/alert" className="border-zinc-700 text-zinc-300" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Alert Email</label>
              <Input placeholder="admin@example.com" className="border-zinc-700 text-zinc-300" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-zinc-800 bg-zinc-900/50">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-600/10">
              <Lock className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <CardTitle className="text-zinc-100">Security</CardTitle>
              <CardDescription className="text-zinc-500">Manage access controls and rate limits.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Max API Rate</label>
              <Input placeholder="1000" className="border-zinc-700 text-zinc-300" />
              <p className="text-xs text-zinc-500">Requests per hour per user</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Max Projects Per User</label>
              <Input placeholder="50" className="border-zinc-700 text-zinc-300" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button className="bg-amber-600 hover:bg-amber-500">Save Settings</Button>
      </div>
    </div>
  );
}