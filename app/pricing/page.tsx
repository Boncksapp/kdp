"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, BookOpen, Zap, Users, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

const tiers = [
  {
    name: "Creator",
    price: "$19.99",
    period: "/month",
    description: "Full access to the professional KDP publishing studio.",
    features: [
      "Unlimited Book Projects",
      "Unlimited Book Exports",
      "GPT-4 Page Planning",
      "SDXL Image Generation",
      "KDP-Compliant PDF Export",
      "Reflowable EPUB Export",
      "Priority Customer Support",
    ],
    highlighted: true,
    cta: "Get Started",
    popular: true,
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
        <h1 className="text-4xl font-bold tracking-tight text-zinc-100">Simple, Professional Pricing</h1>
        <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
          One plan. Everything you need to create and publish books on Amazon KDP.
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
            <Badge variant="success" className="ml-2 text-[10px] px-1.5 py-0 font-medium">Save 20%</Badge>
          </span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="flex justify-center">
        {tiers.map((tier) => (
          <Card
            key={tier.name}
            className="relative border border-indigo-500 bg-zinc-900 shadow-lg shadow-indigo-600/10 scale-105 max-w-md w-full transition-all duration-200"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <Badge variant="default" className="bg-indigo-600 text-white px-4 py-1 text-xs font-semibold">
                Most Popular
              </Badge>
            </div>

            <CardHeader className="pb-4">
              <CardTitle className="text-xl text-zinc-100">{tier.name}</CardTitle>
              <CardDescription className="text-zinc-500">{tier.description}</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold text-zinc-100">
                  {annual ? `${Math.round(19.99 * 0.8 * 12 / 12)}.99` : tier.price}
                </span>
                <span className="text-zinc-500 ml-1">{annual ? "/month, billed annually" : tier.period}</span>
              </div>
            </CardHeader>

            <CardContent>
              <Link href="/signup">
                <Button
                  className="w-full mb-6 bg-indigo-600 hover:bg-indigo-500 text-white"
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
              
              <div className="mt-8 pt-6 border-t border-zinc-800">
                <p className="text-xs text-zinc-500 text-center">
                  * Requires your own OpenAI and Stability AI API keys. 
                  You pay only the wholesale cost of generation with zero markup from us.
                </p>
              </div>
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