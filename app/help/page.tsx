"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CircleHelp, Search, FileText, BookOpen, Sparkles, Download, Settings, MessageCircle, ChevronRight, ExternalLink } from "lucide-react";
import Link from "next/link";

const categories = [
  {
    icon: BookOpen, title: "Getting Started", description: "Learn the basics of creating your first book",
    articles: ["Quick start guide", "Understanding book types", "Setting up your first project"],
  },
  {
    icon: Sparkles, title: "AI Generation", description: "Tips for optimal AI content generation",
    articles: ["Writing effective prompts", "Content quality settings", "Image generation guide"],
  },
  {
    icon: Download, title: "Export & Publishing", description: "Export your books to KDP-ready formats",
    articles: ["PDF export settings", "EPUB formatting guide", "KDP compliance checklist"],
  },
  {
    icon: Settings, title: "Account & Billing", description: "Manage your subscription and API keys",
    articles: ["Subscription plans", "Managing API keys", "Usage and billing"],
  },
  {
    icon: CircleHelp, title: "FAQs", description: "Frequently asked questions",
    articles: ["Common issues", "Troubleshooting", "Supported formats"],
  },
];

const popularArticles = [
  { title: "How to create your first KDP book in 5 minutes", views: "2.4k" },
  { title: "Understanding KDP trim sizes and margins", views: "1.8k" },
  { title: "Best practices for AI-generated content", views: "1.5k" },
  { title: "Troubleshooting common PDF export issues", views: "1.2k" },
];

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600/10">
            <CircleHelp className="h-8 w-8 text-indigo-400" />
          </div>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Help Center</h1>
        <p className="text-zinc-500">Find guides, tutorials, and answers to common questions.</p>
        <div className="relative max-w-lg mx-auto">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <Input placeholder="Search articles..." className="pl-9 h-11 border-zinc-700 text-zinc-300 placeholder:text-zinc-500" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
      </div>

      <Card className="border-zinc-800 bg-zinc-900/50">
        <CardHeader>
          <CardTitle className="text-zinc-100">Popular Articles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-3">
            {popularArticles.map((article) => (
              <Link key={article.title} href="#"
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

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <Card key={category.title} className="border-zinc-800 bg-zinc-900/50 transition-all duration-200 hover:border-zinc-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600/10">
                  <category.icon className="h-5 w-5 text-indigo-400" />
                </div>
                <div>
                  <CardTitle className="text-sm text-zinc-200">{category.title}</CardTitle>
                  <CardDescription className="text-zinc-500">{category.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {category.articles.map((article) => (
                  <li key={article}>
                    <Link href="#" className="flex items-center gap-2 text-sm text-zinc-500 hover:text-indigo-400 transition-colors">
                      <ChevronRight className="h-3 w-3" />
                      {article}
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-indigo-500/20 bg-indigo-600/5">
        <CardContent className="flex flex-col items-center py-8 text-center">
          <MessageCircle className="h-8 w-8 text-indigo-400 mb-3" />
          <h3 className="text-lg font-semibold text-zinc-200">Still need help?</h3>
          <p className="text-sm text-zinc-500 mt-1 max-w-md">Our support team is available 24/7 to help with any questions or issues.</p>
          <div className="flex gap-3 mt-4">
            <Link href="#" className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition-colors">
              <MessageCircle className="h-4 w-4" /> Contact Support
            </Link>
            <Link href="#" className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-800 transition-colors">
              <ExternalLink className="h-4 w-4" /> Documentation
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}