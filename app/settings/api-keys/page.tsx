"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { KeyRound, Eye, EyeOff, Trash2, ShieldCheck, CheckCircle2, Loader2 } from "lucide-react";

interface KeyConfig {
  service: "openai" | "stability";
  name: string;
  description: string;
  isConfigured: boolean;
}

export default function ApiKeysPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [keyStatus, setKeyStatus] = useState<Record<string, boolean>>({});
  const [visibleInputs, setVisibleInputs] = useState<Record<string, string>>({});
  const [showKey, setShowKey] = useState<Record<string, boolean>>({});

  const services: KeyConfig[] = [
    { 
      service: "openai", 
      name: "OpenAI API Key", 
      description: "Used for book planning, chapter generation, and text content (GPT-4.1).",
      isConfigured: keyStatus["openai"] || false 
    },
    { 
      service: "stability", 
      name: "Stability AI Key", 
      description: "Used for generating high-quality illustrations and coloring pages (SDXL).",
      isConfigured: keyStatus["stability"] || false 
    },
  ];

  const fetchStatus = async () => {
    try {
      const res = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "check-keys", profile_name: "default" }),
      });
      if (res.ok) {
        const data = await res.json();
        setKeyStatus({
          openai: data.openai_configured,
          stability: data.stability_configured,
        });
      }
    } catch (err) {
      console.error("Failed to fetch key status", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleSave = async (service: string) => {
    const apiKey = visibleInputs[service];
    if (!apiKey) return;

    setSaving(service);
    try {
      const res = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          action: "save-key", 
          service, 
          api_key: apiKey,
          profile_name: "default" 
        }),
      });
      if (res.ok) {
        setKeyStatus(prev => ({ ...prev, [service]: true }));
        setVisibleInputs(prev => ({ ...prev, [service]: "" }));
      }
    } catch (err) {
      console.error("Failed to save key", err);
    } finally {
      setSaving(null);
    }
  };

  const handleDelete = async (service: string) => {
    if (!confirm(`Are you sure you want to remove your ${service} key?`)) return;

    try {
      const res = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          action: "delete-key", 
          service,
          profile_name: "default" 
        }),
      });
      if (res.ok) {
        setKeyStatus(prev => ({ ...prev, [service]: false }));
      }
    } catch (err) {
      console.error("Failed to delete key", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">AI Provider Keys</h1>
        <p className="mt-1 text-sm text-zinc-500">
          KDP Studio uses your own API keys to generate content. This ensures you pay only the wholesale 
          cost of AI usage with no markups.
        </p>
      </div>

      <Card className="border-indigo-500/20 bg-indigo-600/5">
        <CardContent className="flex items-start gap-3 p-4">
          <ShieldCheck className="h-5 w-5 text-indigo-400 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-zinc-200">Encryption at Rest</p>
            <p className="text-zinc-500 mt-1">
              Your keys are encrypted using a master production key before being saved to our database. 
              They are only decrypted in memory during the book generation process.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {services.map((svc) => (
          <Card key={svc.service} className="border-zinc-800 bg-zinc-900/50 overflow-hidden">
            <CardHeader className="pb-3 border-b border-zinc-800/50 bg-zinc-800/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 border border-zinc-700">
                    <KeyRound className={`h-5 w-5 ${svc.isConfigured ? "text-emerald-400" : "text-zinc-500"}`} />
                  </div>
                  <div>
                    <CardTitle className="text-base text-zinc-100">{svc.name}</CardTitle>
                    <CardDescription className="text-xs text-zinc-500">{svc.description}</CardDescription>
                  </div>
                </div>
                <Badge variant={svc.isConfigured ? "success" : "outline"} className={svc.isConfigured ? "" : "text-zinc-500 border-zinc-700"}>
                  {svc.isConfigured ? (
                    <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Configured</span>
                  ) : "Not Set"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-5">
              {svc.isConfigured ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span>Your key is safely stored and encrypted.</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleDelete(svc.service)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10 h-8 gap-2"
                  >
                    <Trash2 className="h-4 w-4" /> Remove Key
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative">
                    <Input
                      type={showKey[svc.service] ? "text" : "password"}
                      placeholder={`Paste your ${svc.name} here...`}
                      value={visibleInputs[svc.service] || ""}
                      onChange={(e) => setVisibleInputs(prev => ({ ...prev, [svc.service]: e.target.value }))}
                      className="bg-zinc-950 border-zinc-700 font-mono text-sm pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowKey(prev => ({ ...prev, [svc.service]: !prev[svc.service] }))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                    >
                      {showKey[svc.service] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-zinc-500">
                      Need a key? Visit <a href={svc.service === "openai" ? "https://platform.openai.com/api-keys" : "https://platform.stability.ai/account/keys"} target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline">
                        {svc.service === "openai" ? "OpenAI Dashboard" : "Stability AI Dashboard"}
                      </a>
                    </p>
                    <Button 
                      size="sm" 
                      onClick={() => handleSave(svc.service)}
                      disabled={!visibleInputs[svc.service] || saving === svc.service}
                      className="bg-indigo-600 hover:bg-indigo-500 min-w-[100px]"
                    >
                      {saving === svc.service ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Key"}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-zinc-800 bg-zinc-900/50">
        <CardHeader>
          <CardTitle className="text-zinc-100 text-lg">Why Bring Your Own Key?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-zinc-400 leading-relaxed">
          <p>
            Standard AI platforms often charge a significant markup (sometimes 5x-10x) on top of the actual 
            AI costs. By connecting your own keys, you bypass these markups.
          </p>
          <div className="grid sm:grid-cols-2 gap-6 pt-2">
            <div>
              <h4 className="font-medium text-zinc-200 mb-1">OpenAI (Text)</h4>
              <p>GPT-4.1 costs approximately $0.01 per page of high-quality fiction or planning logic. A 200-page book costs around $2.00 to draft.</p>
            </div>
            <div>
              <h4 className="font-medium text-zinc-200 mb-1">Stability AI (Images)</h4>
              <p>SDXL costs roughly $0.04 per high-resolution illustration. A children's book with 25 images costs around $1.00.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
