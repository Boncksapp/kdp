"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CreditCard,
  Zap,
  Sparkles,
  BookOpen,
  Image,
  FileText,
  Download,
  AlertCircle,
  Plus,
  CheckCircle2,
  Clock,
  History,
  Loader2,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";

const typeIcons: Record<string, React.ReactNode> = {
  usage: <BookOpen className="h-4 w-4" />,
  purchase: <Plus className="h-4 w-4" />,
  bonus: <Sparkles className="h-4 w-4" />,
  subscription_renewal: <CheckCircle2 className="h-4 w-4" />,
};

const typeColors: Record<string, string> = {
  usage: "text-blue-400 bg-blue-600/10",
  purchase: "text-amber-400 bg-amber-600/10",
  bonus: "text-pink-400 bg-pink-600/10",
  subscription_renewal: "text-emerald-400 bg-emerald-600/10",
};

export default function BillingPage() {
  const [showTopUp, setShowTopUp] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [backendAvailable, setBackendAvailable] = useState(true);
  const [usage, setUsage] = useState({
    balance: 456,
    total_credits_used: 1932,
    total_credits_purchased: 2500,
    tier: "pro",
    recent_transactions: [] as Array<{
      id: string;
      type: string;
      amount: number;
      description: string;
      timestamp: string;
    }>,
  });
  const [tierInfo, setTierInfo] = useState({
    tier_name: "Pro",
    tier_price_usd: 29.99,
    monthly_credits: 500,
    max_projects: 200,
    current_balance: 456,
  });

  // Fetch billing data from backend
  useEffect(() => {
    const fetchBilling = async () => {
      setLoading(true);
      setError(null);
      try {
        const [usageRes, tiersRes] = await Promise.all([
          fetch("/api/books", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "billing-usage", profile_name: "default" }),
          }),
          fetch("/api/books", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "billing-tiers", profile_name: "default" }),
          }),
        ]);

        if (usageRes.ok) {
          const usageData = await usageRes.json();
          setUsage({
            balance: usageData.balance ?? 456,
            total_credits_used: usageData.total_credits_used ?? 0,
            total_credits_purchased: usageData.total_credits_purchased ?? 0,
            tier: usageData.tier ?? "pro",
            recent_transactions: (usageData.recent_transactions || []).slice(0, 10),
          });
        } else {
          setBackendAvailable(false);
        }

        if (tiersRes.ok) {
          const tiersData = await tiersRes.json();
          setTierInfo({
            tier_name: tiersData.tier_name ?? "Pro",
            tier_price_usd: tiersData.tier_price_usd ?? 29.99,
            monthly_credits: tiersData.monthly_credits ?? 500,
            max_projects: tiersData.max_projects ?? 200,
            current_balance: tiersData.current_balance ?? usage.balance,
          });
        }
      } catch {
        setBackendAvailable(false);
        setError("Backend unavailable. Showing cached/mock data.");
      } finally {
        setLoading(false);
      }
    };
    fetchBilling();
  }, [usage.balance]);

  const localTransactions = [
    { id: "1", type: "usage", amount: -15, description: "Generated 'Fantasy Novel Vol. 1'", timestamp: "2 hours ago" },
    { id: "2", type: "usage", amount: -24, description: "Generated 12 illustrations", timestamp: "2 hours ago" },
    { id: "3", type: "usage", amount: -5, description: "PDF Export - 240 pages", timestamp: "2 hours ago" },
    { id: "4", type: "purchase", amount: 500, description: "Pro Plan Monthly Credit Top-Up", timestamp: "May 28, 2024" },
  ];

  const transactions = usage.recent_transactions.length > 0
    ? usage.recent_transactions
    : localTransactions;

  const balance = usage.balance;
  const monthlyTotal = tierInfo.monthly_credits;
  const usagePercent = Math.round(((monthlyTotal - balance) / monthlyTotal) * 100);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Billing & Credits</h1>
          <p className="mt-1 text-sm text-zinc-500">Manage your subscription, credits, and usage.</p>
        </div>
        <div className="flex items-center gap-2">
          {!backendAvailable && (
            <Badge variant="warning" className="gap-1">
              <AlertTriangle className="h-3 w-3" />
              Offline
            </Badge>
          )}
          <Link href="/pricing">
            <Button variant="outline" className="gap-2 border-zinc-700 text-zinc-300 hover:bg-zinc-800">
              <Sparkles className="h-4 w-4" />
              Change Plan
            </Button>
          </Link>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-amber-500/20 bg-amber-600/5 p-3">
          <AlertCircle className="h-4 w-4 text-amber-400 flex-shrink-0" />
          <p className="text-xs text-amber-300 flex-1">{error}</p>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => window.location.reload()}>
            <RefreshCw className="h-3 w-3" />
          </Button>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-zinc-500" />
        </div>
      )}

      {!loading && (
        <>
          {/* Credit Balance Card */}
          <Card className="border-zinc-800 bg-gradient-to-br from-zinc-900 to-indigo-950/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <CardContent className="relative p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="h-5 w-5 text-amber-400" />
                    <span className="text-sm font-medium text-zinc-400">Credit Balance</span>
                  </div>
                  <div className="text-4xl font-bold text-zinc-100">{balance}</div>
                  <p className="text-sm text-zinc-500 mt-1">of {monthlyTotal} monthly credits remaining</p>
                </div>
                <div className="flex gap-3">
                  <Button className="gap-2 bg-indigo-600 hover:bg-indigo-500" onClick={() => setShowTopUp(!showTopUp)}>
                    <Plus className="h-4 w-4" />
                    Buy Credits
                  </Button>
                  <Link href="/pricing">
                    <Button variant="outline" className="gap-2 border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                      <Sparkles className="h-4 w-4" />
                      Upgrade Plan
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-zinc-500">Monthly usage — <span className="text-zinc-300">{monthlyTotal - balance} used</span></span>
                  <span className="text-zinc-500">Resets in <span className="text-zinc-300">18 days</span></span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-zinc-800">
                  <div className="h-full rounded-full bg-indigo-500 transition-all" style={{ width: `${Math.min(usagePercent, 100)}%` }} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Credit Breakdown - approximated from transactions */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Content Gen", used: Math.round(usage.total_credits_used * 0.5), icon: BookOpen, color: "text-blue-400" },
              { label: "Image Gen", used: Math.round(usage.total_credits_used * 0.3), icon: Image, color: "text-purple-400" },
              { label: "PDF Export", used: Math.round(usage.total_credits_used * 0.12), icon: FileText, color: "text-emerald-400" },
              { label: "EPUB Export", used: Math.round(usage.total_credits_used * 0.08), icon: Download, color: "text-amber-400" },
            ].map((item) => (
              <Card key={item.label} className="border-zinc-800 bg-zinc-900/50">
                <CardContent className="p-4 text-center">
                  <item.icon className={`h-5 w-5 ${item.color} mx-auto mb-1`} />
                  <p className="text-lg font-bold text-zinc-100">{item.used.toLocaleString()}</p>
                  <p className="text-xs text-zinc-500">{item.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Top Up Section */}
          {showTopUp && (
            <Card className="border-zinc-800 bg-zinc-900/50 border-indigo-500/30">
              <CardHeader>
                <CardTitle className="text-zinc-100 text-lg">Buy Additional Credits</CardTitle>
                <CardDescription className="text-zinc-500">Credits never expire and are used before monthly allowance.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { amount: 100, price: "$4.99" },
                    { amount: 500, price: "$19.99", popular: true },
                    { amount: 1000, price: "$34.99" },
                    { amount: 5000, price: "$149.99" },
                  ].map((pkg) => (
                    <button key={pkg.amount}
                      className={`relative rounded-lg border p-4 text-center transition-all hover:border-zinc-600 hover:bg-zinc-800/30 ${pkg.popular ? "border-indigo-500 bg-indigo-600/5" : "border-zinc-800"}`}>
                      {pkg.popular && <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[10px] font-medium text-indigo-400 bg-indigo-600/10 px-2 py-0.5 rounded-full">Best Value</span>}
                      <p className="text-2xl font-bold text-zinc-100">{pkg.amount}</p>
                      <p className="text-xs text-zinc-500 mt-1">credits</p>
                      <p className="text-sm font-medium text-indigo-400 mt-2">{pkg.price}</p>
                    </button>
                  ))}
                </div>
                <Button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-500">Purchase Credits</Button>
              </CardContent>
            </Card>
          )}

          {/* Current Plan */}
          <Card className="border-zinc-800 bg-zinc-900/50">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-zinc-100">Current Plan</CardTitle>
                <CardDescription className="text-zinc-500">You are on the {tierInfo.tier_name} plan</CardDescription>
              </div>
              <Badge variant="success" className="text-sm px-3 py-1">Active</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Books / month", value: `${tierInfo.max_projects}` },
                  { label: "Monthly credits", value: `${tierInfo.monthly_credits}` },
                  { label: "API Rate Limit", value: "1,000/hr" },
                  { label: "Price", value: `$${tierInfo.tier_price_usd}/mo` },
                ].map((item) => (
                  <div key={item.label} className="rounded-lg bg-zinc-800/30 p-3 text-center">
                    <p className="text-lg font-bold text-zinc-100">{item.value}</p>
                    <p className="text-xs text-zinc-500 mt-1">{item.label}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-500">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Next billing: <span className="text-zinc-300">June 28, 2024</span>
              </div>
            </CardContent>
          </Card>

          {/* Usage History */}
          <Card className="border-zinc-800 bg-zinc-900/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-zinc-100">Usage History</CardTitle>
                  <CardDescription className="text-zinc-500">Recent credit transactions</CardDescription>
                </div>
                <History className="h-5 w-5 text-zinc-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {transactions.map((txn: any) => (
                  <div key={txn.id} className="flex items-center justify-between rounded-lg px-3 py-2.5 transition-colors hover:bg-zinc-800/30">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-md ${typeColors[txn.type] || "bg-zinc-800"}`}>
                        {typeIcons[txn.type] || <BookOpen className="h-4 w-4" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-zinc-200">{txn.description}</p>
                        <p className="text-xs text-zinc-500">
                          {txn.timestamp ? new Date(txn.timestamp).toLocaleDateString() : "recent"}
                        </p>
                      </div>
                    </div>
                    <span className={`text-sm font-bold ${txn.amount > 0 ? "text-emerald-400" : "text-zinc-300"}`}>
                      {txn.amount > 0 ? "+" : ""}{txn.amount}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Low Credit Alert */}
          {balance < 100 && (
            <Card className="border-amber-500/20 bg-amber-600/5">
              <CardContent className="flex items-start gap-3 p-4">
                <AlertCircle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-zinc-200">Low on credits!</p>
                  <p className="text-zinc-500 mt-1">
                    You only have {balance} credits remaining. Consider upgrading or purchasing additional credit packs.
                  </p>
                </div>
                <Link href="/pricing">
                  <Button variant="outline" size="sm" className="flex-shrink-0 border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                    View Plans
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}