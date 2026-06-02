"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CircleHelp, Search, FileText, BookOpen, Sparkles, Download, Settings, MessageCircle, ChevronRight, ExternalLink, Lightbulb, AlertTriangle } from "lucide-react";
import Link from "next/link";

const categories = [
  {
    icon: BookOpen, title: "Getting Started", description: "Learn the basics of creating your first book",
    articles: [
      { title: "Quick start guide", slug: "quick-start" },
      { title: "Understanding book types", slug: "book-types" },
      { title: "Setting up your first project", slug: "setup-project" }
    ],
  },
  {
    icon: Sparkles, title: "AI Generation", description: "Tips for optimal AI content generation",
    articles: [
      { title: "Writing effective prompts", slug: "prompts" },
      { title: "Content quality settings", slug: "quality" },
      { title: "Image generation guide", slug: "image-gen" }
    ],
  },
  {
    icon: Download, title: "Export & Publishing", description: "Export your books to KDP-ready formats",
    articles: [
      { title: "PDF export settings", slug: "pdf-settings" },
      { title: "EPUB formatting guide", slug: "epub-guide" },
      { title: "KDP compliance checklist", slug: "kdp-checklist" }
    ],
  },
  {
    icon: Settings, title: "Account & Billing", description: "Manage your subscription and API keys",
    articles: [
      { title: "Subscription plans", slug: "plans" },
      { title: "Managing API keys", slug: "api-keys" },
      { title: "Usage and billing", slug: "billing" }
    ],
  },
];

const popularArticles = [
  { title: "How to create your first KDP book in 5 minutes", slug: "how-to-create", views: "2.4k" },
  { title: "Understanding KDP trim sizes and margins", slug: "trim-sizes", views: "1.8k" },
  { title: "Best practices for AI-generated content", slug: "best-practices", views: "1.5k" },
  { title: "Troubleshooting common PDF export issues", slug: "troubleshooting", views: "1.2k" },
];

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />
      <div className="pt-24 pb-12">
        <div className="space-y-8 max-w-5xl mx-auto px-6">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600/10">
            <CircleHelp className="h-8 w-8 text-indigo-400" />
          </div>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">Help Center</h1>
        <p className="text-zinc-500">Find guides, tutorials, and answers to common questions.</p>
        <div className="relative max-w-lg mx-auto pt-4">
          <Search className="absolute left-3 top-[calc(50%+8px)] h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <Input placeholder="Search articles..." className="pl-9 h-12 border-zinc-700 bg-zinc-900/50 text-zinc-300 placeholder:text-zinc-500" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 border-zinc-800 bg-zinc-900/50">
          <CardHeader>
            <CardTitle className="text-zinc-100">Popular Articles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-1 gap-3">
              {popularArticles.map((article) => (
                <Link key={article.title} href={`/help/article/${article.slug}`}
                  className="flex items-center justify-between rounded-lg border border-zinc-800/50 p-4 transition-all hover:bg-zinc-800/30 hover:border-zinc-700">
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-indigo-400" />
                    <span className="text-sm font-medium text-zinc-200">{article.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-500">{article.views} views</span>
                    <ChevronRight className="h-4 w-4 text-zinc-500" />
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-indigo-600/5 h-full">
          <CardHeader>
            <CardTitle className="text-sm text-zinc-100 flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-amber-400" /> Pro Tip
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-zinc-400 space-y-4">
            <p>
              Always verify your book plan before generating full content. AI planning saves you 
              valuable time and credits by ensuring the structure is perfect first.
            </p>
            <div className="pt-4 border-t border-zinc-800">
              <div className="flex items-center gap-2 text-zinc-300 mb-2 font-medium">
                <AlertTriangle className="h-4 w-4 text-indigo-400" /> Common Issue
              </div>
              <p className="text-xs">
                Export failing? Check your image aspect ratios and ensure your API keys are active.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {categories.map((category) => (
          <Card key={category.title} className="border-zinc-800 bg-zinc-900/50 transition-all duration-200 hover:border-zinc-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600/10">
                  <category.icon className="h-5 w-5 text-indigo-400" />
                </div>
                <div>
                  <CardTitle className="text-base text-zinc-200">{category.title}</CardTitle>
                  <CardDescription className="text-zinc-500 text-xs">{category.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {category.articles.map((article) => (
                  <li key={article.slug}>
                    <Link href={`/help/article/${article.slug}`} className="flex items-center gap-2 text-sm text-zinc-500 hover:text-indigo-400 transition-colors">
                      <ChevronRight className="h-3 w-3" />
                      {article.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-indigo-500/20 bg-indigo-600/5">
        <CardContent className="flex flex-col items-center py-10 text-center">
          <MessageCircle className="h-10 w-10 text-indigo-400 mb-4" />
          <h3 className="text-xl font-semibold text-zinc-200">Still need help?</h3>
          <p className="text-sm text-zinc-500 mt-2 max-w-md">Our support team is available to help with any questions or technical issues.</p>
          <div className="flex gap-4 mt-6">
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-indigo-500 transition-colors">
              <MessageCircle className="h-4 w-4" /> Contact Support
            </Link>
            <Link href="#" className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-6 py-2.5 text-sm font-medium text-zinc-300 hover:bg-zinc-800 transition-colors">
              <ExternalLink className="h-4 w-4" /> API Docs
            </Link>
          </div>
        </CardContent>
      </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}
