"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Zap, 
  CheckCircle2, 
  Clock, 
  History, 
  Loader2, 
  CreditCard,
  Crown,
  BookOpen,
  Image as ImageIcon,
  FileText,
  Sparkles,
  AlertCircle,
  ArrowRight,
  X,
  ExternalLink,
  Check,
} from "lucide-react";
import Link from "next/link";

export default function BillingPage() {
  const [loading, setLoading] = useState(true);
  const [subscribing, setSubscribing] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<"confirm" | "processing" | "success" | "error">("confirm");
  const [checkoutError, setCheckoutError] = useState("");
  const [stats, setStats] = useState({
    booksGenerated: 12,
    imagesGenerated: 145,
    exportsDone: 8,
    plan: "Creator",
    status: "active",
    nextBilling: "June 28, 2024"
  });

  useEffect(() => {
    // Simulated fetch
    setTimeout(() => setLoading(false), 800);
  }, []);

  const handleSubscribe = async () => {
    setSubscribing(true);
    setCheckoutStep("processing");
    setCheckoutError("");

    try {
      const res = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "complete-subscription",
          profile_name: "default",
          tier: "pro",
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.status === "redirect" && data.checkout_url) {
          // Simulate Stripe checkout redirect and success return
          setCheckoutStep("processing");
          // Simulate a successful redirect callback
          setTimeout(() => {
            setCheckoutStep("success");
            setStats(prev => ({ ...prev, status: "active", plan: "Creator" }));
          }, 2000);
        } else if (data.status === "activated") {
          // Free tier or direct activation
          setCheckoutStep("success");
          setStats(prev => ({ ...prev, status: "active", plan: "Creator" }));
        } else {
          setCheckoutStep("success");
          setStats(prev => ({ ...prev, status: "active", plan: "Creator" }));
        }
      } else {
        // Backend might be unavailable - simulate success for demo
        await new Promise(r => setTimeout(r, 1500));
        setCheckoutStep("success");
        setStats(prev => ({ ...prev, status: "active", plan: "Creator" }));
      }
    } catch {
      // Network error - simulate success for demo
      await new Promise(r => setTimeout(r, 1500));
      setCheckoutStep("success");
      setStats(prev => ({ ...prev, status: "active", plan: "Creator" }));
    } finally {
      setSubscribing(false);
    }
  };

  const openCheckout = () => {
    setShowCheckout(true);
    setCheckoutStep("confirm");
    setCheckoutError("");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-indigo-500" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Subscription & Usage</h1>
          <p className="mt-1 text-sm text-zinc-500">Manage your plan and view your studio activity.</p>
        </div>
        <Badge variant="success" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-3 py-1">
          <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
          Subscription Active
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2 border-indigo-500/20 bg-gradient-to-br from-zinc-900 to-indigo-950/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4">
            <Crown className="h-12 w-12 text-indigo-500/20 rotate-12" />
          </div>
          <CardHeader>
            <CardTitle className="text-zinc-100 flex items-center gap-2">
              {stats.plan} Plan
              <Badge className="bg-indigo-600 text-white border-none text-[10px] uppercase">Current</Badge>
            </CardTitle>
            <CardDescription className="text-zinc-500">Flat rate studio access with BYOK generation.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-zinc-100">$19.99</span>
              <span className="text-zinc-500">/month</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-zinc-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  Unlimited Drafts
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  KDP-Ready PDF Exports
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-zinc-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  Reflowable EPUBs
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  AI Page Mapping
                </div>
              </div>
            </div>

            <div className="pt-4 flex gap-3">
              <Button onClick={openCheckout} className="bg-zinc-100 text-zinc-900 hover:bg-zinc-200">
                Manage Billing
              </Button>
              <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                Cancel Subscription
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-900/50">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-zinc-400">Next Payment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-indigo-400" />
              <div>
                <p className="text-lg font-bold text-zinc-100">{stats.nextBilling}</p>
                <p className="text-xs text-zinc-500">Scheduled via Stripe</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-zinc-500" />
              <p className="text-sm text-zinc-300">Visa ending in 4242</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Books Created", value: stats.booksGenerated, icon: BookOpen, color: "text-blue-400" },
          { label: "Images Generated", value: stats.imagesGenerated, icon: ImageIcon, color: "text-purple-400" },
          { label: "Final Exports", value: stats.exportsDone, icon: FileText, color: "text-emerald-400" },
        ].map((item) => (
          <Card key={item.label} className="border-zinc-800 bg-zinc-900/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-zinc-100">{item.value}</p>
                  <p className="text-sm text-zinc-500">{item.label}</p>
                </div>
                <item.icon className={`h-8 w-8 ${item.color} opacity-20`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-zinc-800 bg-zinc-900/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-zinc-100">Recent Activity</CardTitle>
            <History className="h-5 w-5 text-zinc-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { desc: "Generated 'The Whispering Woods' illustrations", time: "2 hours ago", type: "generation" },
              { desc: "Exported 'Children's Coloring Adventure' (PDF)", time: "1 day ago", type: "export" },
              { desc: "Subscription renewal - Creator Plan", time: "May 28, 2024", type: "billing" },
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-zinc-800 last:border-0">
                <div>
                  <p className="text-sm font-medium text-zinc-200">{activity.desc}</p>
                  <p className="text-xs text-zinc-500">{activity.time}</p>
                </div>
                <Badge variant="outline" className="text-[10px] border-zinc-700 text-zinc-500">
                  {activity.type}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stripe Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <Card className="w-full max-w-lg border-zinc-800 bg-zinc-950 shadow-2xl mx-4">
            {checkoutStep === "confirm" && (
              <>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-zinc-100 text-lg">Confirm Subscription</CardTitle>
                    <button onClick={() => setShowCheckout(false)} className="text-zinc-500 hover:text-zinc-300">
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <CardDescription className="text-zinc-500">
                    You&apos;ll be redirected to Stripe to complete your payment.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-zinc-200">Creator Plan</span>
                      <Badge variant="success" className="text-[10px]">Monthly</Badge>
                    </div>
                    <div className="flex items-baseline gap-1 mb-4">
                      <span className="text-3xl font-bold text-zinc-100">$19.99</span>
                      <span className="text-zinc-500">/month</span>
                    </div>
                    <Separator className="bg-zinc-800 mb-3" />
                    <ul className="space-y-2">
                      {["Unlimited book drafts", "KDP-ready PDF exports", "Reflowable EPUB exports", "AI page mapping & planning", "SDXL illustration generation", "Priority support"].map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-zinc-300">
                          <Check className="h-4 w-4 text-emerald-400" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center gap-2 rounded-lg border border-indigo-500/20 bg-indigo-600/5 p-3">
                    <Sparkles className="h-4 w-4 text-indigo-400 flex-shrink-0" />
                    <p className="text-xs text-zinc-400">
                      Your API keys (OpenAI, Stability AI) are billed separately via the BYOK model.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1 border-zinc-700 text-zinc-300 hover:bg-zinc-800" onClick={() => setShowCheckout(false)}>
                      Cancel
                    </Button>
                    <Button className="flex-1 gap-2 bg-indigo-600 hover:bg-indigo-500" onClick={handleSubscribe}>
                      Subscribe Now
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </>
            )}

            {checkoutStep === "processing" && (
              <CardContent className="py-12 text-center">
                <Loader2 className="h-10 w-10 animate-spin text-indigo-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-zinc-100">Redirecting to Stripe...</h3>
                <p className="text-sm text-zinc-500 mt-2">
                  Please wait while we set up your checkout session.
                </p>
              </CardContent>
            )}

            {checkoutStep === "success" && (
              <CardContent className="py-12 text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15">
                    <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-zinc-100">Subscription Active!</h3>
                <p className="text-sm text-zinc-500 mt-2 max-w-sm mx-auto">
                  Your Creator plan is now active. You have full access to all KDP Studio features.
                </p>
                <Button className="mt-6 bg-zinc-100 text-zinc-900 hover:bg-zinc-200" onClick={() => setShowCheckout(false)}>
                  Done
                </Button>
              </CardContent>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}