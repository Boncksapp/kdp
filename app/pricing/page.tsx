"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, BookOpen, Zap, Users, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

const tiers = [
  {
    name: "Starter",
    price: "$19",
    period: "/month",
    description: "Perfect for getting started with AI-powered publishing.",
    features: [
      "5 book generations per month",
      "Up to 50 pages per book",
      "SDXL image generation",
      "KDP-compliant PDF export",
      "EPUB export",
      "Email support",
    ],
    highlighted: false,
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$49",
    period: "/month",
    description: "For serious self-publishers scaling their output.",
    features: [
      "25 book generations per month",
      "Up to 200 pages per book",
      "Unlimited image generations",
      "Priority processing queue",
      "Batch project export",
      "API access (1,000 req/hr)",
      "Chat support",
      "Custom branding",
    ],
    highlighted: true,
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Agency",
    price: "$149",
    period: "/month",
    description: "For teams and high-volume publishing operations.",
    features: [
      "100 book generations per month",
      "Up to 500 pages per book",
      "Unlimited image generations",
      "Dedicated processing queue",
      "Team collaboration (5 seats)",
      "Full API access (10,000 req/hr)",
      "Priority support",
      "Custom integrations",
      "White-label exports",
      "SLA guarantee",
    ],
    highlighted: false,
    cta: "Contact Sales",
    popular: false,
  },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="space-y-12 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600/10">
            <Sparkles className="h-8 w-8 text-indigo-400" />
          </div>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-zinc-100">Simple, Transparent Pricing</h1>
        <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
          Choose the plan that fits your publishing needs. All plans include our core AI book generation engine.
        </p>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-3 pt-4">
          <span className={`text-sm ${!annual ? "text-zinc-200 font-medium" : "text-zinc-500"}`}>Monthly</span>
          <button
            onClick={() => setAnnual(!annual)}
            className={`relative h-6 w-11 rounded-full transition-colors ${annual ? "bg-indigo-600" : "bg-zinc-700"}`}
          >
            <span className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${annual ? "translate-x-5" : ""}`} />
          </button>
          <span className={`text-sm ${annual ? "text-zinc-200 font-medium" : "text-zinc-500"}`}>
            Annual
            <Badge variant="success" className="ml-2 text-[10px] px-1.5 py-0">Save 20%</Badge>
          </span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {tiers.map((tier) => (
          <Card
            key={tier.name}
            className={`relative border transition-all duration-200 ${
              tier.popular
                ? "border-indigo-500 bg-zinc-900 shadow-lg shadow-indigo-600/10 scale-105"
                : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-700"
            }`}
          >
            {tier.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge variant="default" className="bg-indigo-600 text-white px-4 py-1 text-xs font-semibold">
                  Most Popular
                </Badge>
              </div>
            )}

            <CardHeader className="pb-4">
              <CardTitle className="text-xl text-zinc-100">{tier.name}</CardTitle>
              <CardDescription className="text-zinc-500">{tier.description}</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold text-zinc-100">
                  {annual ? `$${Math.round(parseInt(tier.price.replace("$", "")) * 0.8 * 12 / 12)}` : tier.price}
                </span>
                <span className="text-zinc-500 ml-1">{annual ? "/month, billed annually" : tier.period}</span>
              </div>
            </CardHeader>

            <CardContent>
              <Link href={tier.name === "Agency" ? "#" : "/settings/billing"}>
                <Button
                  className={`w-full mb-6 ${
                    tier.popular
                      ? "bg-indigo-600 hover:bg-indigo-500 text-white"
                      : "border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                  }`}
                  variant={tier.popular ? "default" : "outline"}
                >
                  {tier.cta}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>

              <ul className="space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="text-zinc-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enterprise CTA */}
      <Card className="border-indigo-500/20 bg-indigo-600/5">
        <CardContent className="flex flex-col items-center py-8 text-center">
          <h2 className="text-xl font-semibold text-zinc-100">Need a custom plan?</h2>
          <p className="text-sm text-zinc-500 mt-2 max-w-md">
            We offer custom pricing for educational institutions, non-profits, and high-volume publishers.
          </p>
          <Link href="#">
            <Button variant="outline" className="mt-4 border-zinc-700 text-zinc-300 hover:bg-zinc-800">
              Contact Sales
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}