"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { KeyRound, Copy, Eye, EyeOff, Plus, Trash2, AlertCircle, Clock } from "lucide-react";

interface ApiKey {
  id: string;
  name: string;
  key: string;
  created: string;
  lastUsed: string;
  active: boolean;
}

const initialKeys: ApiKey[] = [
  { id: "1", name: "Production", key: "kdp_prod_a1b2c3d4e5f6g7h8...", created: "May 15, 2024", lastUsed: "2 hours ago", active: true },
  { id: "2", name: "Development", key: "kdp_dev_9i8u7y6t5r4e3w2q...", created: "May 10, 2024", lastUsed: "1 day ago", active: true },
];

export default function ApiKeysPage() {
  const [keys, setKeys] = useState(initialKeys);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());

  const toggleVisibility = (id: string) => {
    setVisibleKeys((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const deactivateKey = (id: string) => {
    setKeys((prev) => prev.map((k) => (k.id === id ? { ...k, active: !k.active } : k)));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100">API Keys</h1>
          <p className="mt-1 text-sm text-zinc-500">Manage your API keys for programmatic access to KDP Studio.</p>
        </div>
        <Button className="gap-2"><Plus className="h-4 w-4" /> Create Key</Button>
      </div>

      <Card className="border-indigo-500/20 bg-indigo-600/5">
        <CardContent className="flex items-start gap-3 p-4">
          <AlertCircle className="h-5 w-5 text-indigo-400 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-zinc-200">Keep your keys secure</p>
            <p className="text-zinc-500 mt-1">API keys provide full access to your account. Never share them publicly or embed them in client-side code.</p>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {keys.map((apiKey) => (
          <Card key={apiKey.id} className="border-zinc-800 bg-zinc-900/50">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600/10">
                    <KeyRound className="h-5 w-5 text-indigo-400" />
                  </div>
                  <div>
                    <CardTitle className="text-sm text-zinc-200">{apiKey.name}</CardTitle>
                    <CardDescription className="text-zinc-500">Created {apiKey.created}</CardDescription>
                  </div>
                </div>
                <Badge variant={apiKey.active ? "success" : "secondary"}>{apiKey.active ? "Active" : "Inactive"}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Input readOnly value={visibleKeys.has(apiKey.id) ? apiKey.key : apiKey.key.slice(0, 12) + "••••••••"}
                    className="font-mono text-xs pr-20 bg-zinc-800/30 border-zinc-700 text-zinc-300" />
                  <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
                      onClick={() => toggleVisibility(apiKey.id)}>
                      {visibleKeys.has(apiKey.id) ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800">
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-zinc-500">
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Last used: {apiKey.lastUsed}</span>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="h-7 text-xs gap-1 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
                    onClick={() => deactivateKey(apiKey.id)}>
                    {apiKey.active ? "Deactivate" : "Reactivate"}
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 text-xs gap-1 text-red-400 hover:text-red-300 hover:bg-red-500/10">
                    <Trash2 className="h-3 w-3" /> Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-zinc-800 bg-zinc-900/50">
        <CardHeader>
          <CardTitle className="text-zinc-100">API Usage</CardTitle>
          <CardDescription className="text-zinc-500">Monitor your API consumption across all keys.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Requests Today", value: "1,247" },
              { label: "This Month", value: "28,432" },
              { label: "Rate Limit", value: "1,000/hr" },
              { label: "Cost", value: "$12.47" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-lg bg-zinc-800/30 p-3 text-center">
                <p className="text-2xl font-bold text-zinc-200">{stat.value}</p>
                <p className="text-xs text-zinc-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}