"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText, ShieldCheck, Scale, Lock, ChevronRight } from "lucide-react";
import Link from "next/link";

const legalPages = [
  {
    title: "Terms of Service",
    description: "The rules and guidelines for using KDP Studio.",
    icon: FileText,
    href: "/terms"
  },
  {
    title: "Privacy Policy",
    description: "How we handle your data and protect your privacy.",
    icon: Lock,
    href: "/privacy"
  },
  {
    title: "Cookie Policy",
    description: "Information about the cookies we use on our site.",
    icon: ShieldCheck,
    href: "/cookies"
  },
  {
    title: "GDPR Compliance",
    description: "How we comply with European data protection laws.",
    icon: Scale,
    href: "/privacy#gdpr"
  }
];

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />
      <div className="pt-24 pb-12">
        <div className="space-y-12 max-w-5xl mx-auto px-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl">Legal Information</h1>
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
          Our commitment to transparency, security, and fair use.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {legalPages.map((page) => (
          <Link key={page.title} href={page.href}>
            <Card className="border-zinc-800 bg-zinc-900/50 transition-all hover:border-zinc-700 hover:bg-zinc-900/80 h-full">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-600/10 mb-4">
                  <page.icon className="h-6 w-6 text-indigo-400" />
                </div>
                <CardTitle className="text-zinc-100">{page.title}</CardTitle>
                <CardDescription className="text-zinc-500">{page.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-1 text-sm font-medium text-indigo-400">
                  Read More <ChevronRight className="h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-8">
        <h2 className="text-xl font-bold text-zinc-100 mb-4">Compliance & Ethics</h2>
        <div className="prose prose-zinc prose-invert max-w-none text-zinc-400 space-y-4 text-sm">
          <p>
            KDP Studio is built on the foundation of ethical AI usage. We comply with the terms 
            of service of our AI providers (OpenAI and Stability AI) and encourage our users to 
            do the same.
          </p>
          <p>
            As a Bring-Your-Own-Key (BYOK) service, we act as a secure processor for your AI 
            interactions. We do not own your keys, nor do we have access to your private 
            AI account data beyond what is necessary to perform the requested book generation tasks.
          </p>
          <p>
            If you have any legal inquiries or need to report a violation, please contact us 
            at <span className="text-indigo-400">legal@kdpstudio.ai</span>.
          </p>
        </div>
      </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
