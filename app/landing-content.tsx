"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  BookOpen,
  Image,
  FileText,
  Download,
  Wand2,
  Check,
  ChevronDown,
  Star,
  ArrowRight,
  Zap,
  Braces,
  Palette,
  Rocket,
  Clock,
  Shield,
  BookOpenCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// ── Utility ─────────────────────────────────────────────────────

function FadeInSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}


export default function LandingPageContent() {
  const [faqOpen, setFaqOpen] = useState<string | null>(null);

  // Setup framer motion features
  useEffect(() => {
    // Force framer-motion to register
  }, []);

  // ── Data ───────────────────────────────────────────────────────

  const steps = [
    { icon: Sparkles, title: "Describe Your Idea", desc: "Tell AI about your book concept, genre, and target audience in plain English." },
    { icon: Braces, title: "AI Planning", desc: "GPT-4 creates a detailed page plan with structure, chapter breaks, and content outline." },
    { icon: Palette, title: "SDXL Illustrations", desc: "Generate stunning images or coloring book line art with Stability AI's SDXL." },
    { icon: Download, title: "KDP-Ready Export", desc: "Download a print-ready PDF or reflowable EPUB that passes KDP validation." },
  ];

  const features = [
    { icon: Wand2, title: "GPT-4 Planning", desc: "Intelligent page plans with automatic chapter structuring and content optimization." },
    { icon: Image, title: "SDXL Image Gen", desc: "High-quality illustrations with coloring book mode for line-art pages." },
    { icon: FileText, title: "KDP-Compliant PDF", desc: "Print-ready PDFs with proper bleeds, margins, and trim sizes for KDP." },
    { icon: Download, title: "EPUB Export", desc: "Reflowable EPUB files for Kindle and other ebook readers." },
    { icon: Shield, title: "Cover Templates", desc: "Auto-generated KDP cover templates with correct spine dimensions." },
    { icon: Rocket, title: "One-Click Publish", desc: "From idea to KDP-ready file in minutes, not days." },
  ];

  const testimonials = [
    { name: "Sarah J.", role: "Self-Published Author", content: "I created a 32-page coloring book in under 10 minutes. The KDP export was flawless and passed review on first submission.", avatar: "SJ" },
    { name: "Mark T.", role: "KDP Entrepreneur", content: "KDP Studio has revolutionized my workflow. I'm now producing 5+ books per week with zero design experience.", avatar: "MT" },
    { name: "Emily R.", role: "Children's Author", content: "The illustration quality surprised me. My picture book looks like it was done by a professional illustrator.", avatar: "ER" },
  ];

  const pricingSummary = [
    { name: "Creator", price: "$19.99", features: "Full Platform Access", cta: "Get Started", popular: true },
  ];

  const faqs = [
    { id: "q1", q: "What types of books can I create?", a: "KDP Studio supports fiction, non-fiction, children's books, coloring books, journals, planners, cookbooks, poetry collections, and more. Our AI adapts to your chosen genre and format." },
    { id: "q2", q: "How do the AI costs work?", a: "To keep our subscription price low and give you full control, KDP Studio uses a Bring-Your-Own-Key (BYOK) model. You connect your own OpenAI and Stability AI keys, paying them directly for only what you use with zero markup from us." },
    { id: "q3", q: "Do I need design or coding experience?", a: "Not at all. KDP Studio handles all formatting, layout, and KDP compliance automatically. Just describe your idea and let AI do the rest." },
    { id: "q4", q: "Is the output KDP compliant?", a: "Absolutely. Our exports include proper bleed, margin, and trim settings for all standard KDP sizes. The PDFs pass KDP's internal validation checks." },
    { id: "q5", q: "Can I customize the AI output?", a: "Yes. Every generated element — text, images, layout — is fully editable. You have complete creative control over the final product." },
    { id: "q6", q: "Is there a limit on book exports?", a: "No. With the Creator plan, you can generate and export as many books as you like using your own AI keys." },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* ── Nav ─────────────────────────────────────────── */}

<nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
  <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
    <Link href="/" className="flex items-center gap-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
        <BookOpenCheck className="h-5 w-5 text-white" />
      </div>
      <span className="text-lg font-bold tracking-tight">KDP Studio</span>
    </Link>
    <div className="flex items-center gap-4">
      <Link href="/login" className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors">Sign In</Link>
      <Link href="/login">
        <Button size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-white">Get Started</Button>
      </Link>
    </div>
  </div>
</nav>

      {/* ── Hero ─────────────────────────────────────────── */}

      <section className="relative overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 via-transparent to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/5 rounded-full blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="mb-6 border-indigo-600/30 text-indigo-400 bg-indigo-600/5 px-4 py-1.5 text-sm">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              Professional BYO-Key AI Studio
            </Badge>
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              From Idea to{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                KDP Book
              </span>{" "}
              in Minutes
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400 sm:text-xl">
              Connect your AI keys and create professional, Amazon KDP-ready books. 
              Unlimited exports, no hidden markups, and full creative control.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/signup">
                <Button size="lg" className="gap-2 bg-indigo-600 hover:bg-indigo-500 text-base px-8 h-12">
                  Start Your First Book
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="outline" className="gap-2 border-zinc-700 text-zinc-300 hover:bg-zinc-800 text-base px-8 h-12">
                  View Pricing
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-zinc-500">
              <span className="flex items-center gap-1"><Check className="h-4 w-4 text-emerald-400" /> Bring Your Own Key</span>
              <span className="flex items-center gap-1"><Check className="h-4 w-4 text-emerald-400" /> KDP compliant</span>
              <span className="flex items-center gap-1"><Check className="h-4 w-4 text-emerald-400" /> Flat $19.99/mo</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── How It Works ───────────────────────────────── */}

      <FadeInSection>
        <section className="py-24" id="how-it-works">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How It Works</h2>
              <p className="mt-4 text-lg text-zinc-400">Four simple steps from concept to published book.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-4">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 1, y: 0 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, duration: 0.5 }}
                    className="relative text-center"
                  >
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600/10 mb-4">
                      <Icon className="h-8 w-8 text-indigo-400" />
                    </div>
                    <div className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                      {i + 1}
                    </div>
                    <h3 className="text-lg font-semibold text-zinc-100">{step.title}</h3>
                    <p className="mt-2 text-sm text-zinc-500">{step.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* ── Features ────────────────────────────────────── */}

      <FadeInSection>
        <section className="py-24 bg-zinc-900/30" id="features">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything You Need to Publish</h2>
              <p className="mt-4 text-lg text-zinc-400">Professional tools designed for self-publishers.</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 1, y: 0 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="border-zinc-800 bg-zinc-900/50 h-full transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/80">
                      <CardHeader>
                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-600/10">
                          <Icon className="h-6 w-6 text-indigo-400" />
                        </div>
                        <CardTitle className="text-lg mt-3 text-zinc-100">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-zinc-400">{feature.desc}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* ── Pricing Summary ────────────────────────────── */}

      <FadeInSection>
        <section className="py-24" id="pricing">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">One Simple Price</h2>
              <p className="mt-4 text-lg text-zinc-400">Connect your own AI keys and pay only for platform access.</p>
            </div>
            <div className="flex justify-center max-w-md mx-auto">
              {pricingSummary.map((tier) => (
                <Card key={tier.name} className={`w-full relative border border-indigo-500 bg-zinc-900 shadow-lg shadow-indigo-600/10 transition-all`}>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-indigo-600 text-white px-3 py-0.5">Creator Plan</Badge>
                  </div>
                  <CardHeader className="text-center pb-2">
                    <CardTitle className="text-xl text-zinc-100">{tier.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-zinc-100">{tier.price}</span>
                      <span className="text-zinc-500 text-sm">/mo</span>
                    </div>
                    <p className="text-sm text-zinc-400 mt-4">{tier.features}</p>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Link href="/login">
                      <Button className={`w-full bg-indigo-600 hover:bg-indigo-500 text-white`}>
                        {tier.cta}
                      </Button>
                    </Link>
                    <p className="mt-4 text-xs text-zinc-500">Requires OpenAI & Stability AI API Keys</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/pricing" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
                View detailed features →
              </Link>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* ── Testimonials ────────────────────────────────── */}

      <FadeInSection>
        <section className="py-24 bg-zinc-900/30" id="testimonials">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Loved by Self-Publishers</h2>
              <p className="mt-4 text-lg text-zinc-400">Join thousands of authors using KDP Studio.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 1, y: 0 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                >
                  <Card className="border-zinc-800 bg-zinc-900/50 h-full">
                    <CardContent className="p-6">
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, idx) => (<Star key={idx} className="h-4 w-4 fill-amber-400 text-amber-400" />))}
                      </div>
                      <p className="text-sm text-zinc-300 leading-relaxed">&ldquo;{t.content}&rdquo;</p>
                      <div className="flex items-center gap-3 mt-6">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-indigo-600/20 text-indigo-400 text-xs">{t.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-zinc-200">{t.name}</p>
                          <p className="text-xs text-zinc-500">{t.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* ── FAQ ─────────────────────────────────────────── */}

      <FadeInSection>
        <section className="py-24" id="faq">
          <div className="mx-auto max-w-3xl px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-3">
              {faqs.map((faq) => (
                <Card key={faq.id} className="border-zinc-800 bg-zinc-900/50 overflow-hidden">
                  <button
                    onClick={() => setFaqOpen(faqOpen === faq.id ? null : faq.id)}
                    className="w-full flex items-center justify-between p-4 text-left"
                  >
                    <span className="text-sm font-medium text-zinc-200">{faq.q}</span>
                    <ChevronDown className={`h-4 w-4 text-zinc-500 transition-transform ${faqOpen === faq.id ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {faqOpen === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 text-sm text-zinc-400 leading-relaxed">{faq.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* ── CTA ─────────────────────────────────────────── */}

      <FadeInSection>
        <section className="py-24">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <Card className="border-indigo-500/20 bg-gradient-to-br from-zinc-900 via-indigo-950/10 to-zinc-900 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
              <CardContent className="relative p-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-zinc-100">
                  Ready to Publish Your First Book?
                </h2>
                <p className="mt-4 text-lg text-zinc-400 max-w-xl mx-auto">
                  Join thousands of authors who are already creating KDP-ready books with AI.
                </p>
                <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                  <Link href="/signup">
                    <Button size="lg" className="gap-2 bg-indigo-600 hover:bg-indigo-500 text-base px-8 h-12">
                      <Rocket className="h-5 w-5" />
                      Start Creating Free
                    </Button>
                  </Link>
                  <Link href="/pricing">
                    <Button size="lg" variant="outline" className="gap-2 border-zinc-700 text-zinc-300 hover:bg-zinc-800 text-base px-8 h-12">
                      Compare Plans
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </FadeInSection>

      {/* ── Footer ──────────────────────────────────────── */}

      <footer className="border-t border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
                  <BookOpenCheck className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold">KDP Studio</span>
              </div>
              <p className="text-sm text-zinc-500">AI-powered book publishing for Amazon KDP. Create, illustrate, and export professional books in minutes.</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-zinc-200 mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-zinc-500">
                <li><Link href="/pricing" className="hover:text-zinc-300 transition-colors">Pricing</Link></li>
                <li><Link href="#features" className="hover:text-zinc-300 transition-colors">Features</Link></li>
                <li><Link href="#how-it-works" className="hover:text-zinc-300 transition-colors">How It Works</Link></li>
                <li><Link href="#faq" className="hover:text-zinc-300 transition-colors">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-zinc-200 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-zinc-500">
                <li><Link href="/about" className="hover:text-zinc-300 transition-colors">About</Link></li>
                <li><Link href="/blog" className="hover:text-zinc-300 transition-colors">Blog</Link></li>
                <li><Link href="/contact" className="hover:text-zinc-300 transition-colors">Contact</Link></li>
                <li><Link href="/help" className="hover:text-zinc-300 transition-colors">Help Center</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-zinc-200 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-zinc-500">
                <li><Link href="/terms" className="hover:text-zinc-300 transition-colors">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-zinc-300 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/cookies" className="hover:text-zinc-300 transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-zinc-800 pt-8 text-center text-sm text-zinc-600">
            <p>&copy; {new Date().getFullYear()} KDP Studio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}