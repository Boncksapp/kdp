"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";

const posts = [
  {
    title: "The Future of Self-Publishing with AI",
    slug: "future-ai",
    excerpt: "Discover how AI is changing the landscape for independent authors and what you can do to stay ahead.",
    date: "June 1, 2026",
    author: "Alex Rivera",
    category: "Insights",
    readTime: "5 min read",
  },
  {
    title: "How to Save 80% on AI Costs with BYOK",
    slug: "save-byok",
    excerpt: "Stop paying massive markups on AI generation. Learn how the Bring-Your-Own-Key model puts money back in your pocket.",
    date: "May 28, 2026",
    author: "Jordan Smith",
    category: "Tutorial",
    readTime: "4 min read",
  },
  {
    title: "Mastering Coloring Book Line Art with SDXL",
    slug: "line-art-sdxl",
    excerpt: "Tips and tricks for generating consistent, high-quality line art for your coloring book projects.",
    date: "May 20, 2026",
    author: "Sam Chen",
    category: "Design",
    readTime: "7 min read",
  },
  {
    title: "Understanding KDP Formatting Requirements",
    slug: "kdp-formatting",
    excerpt: "Everything you need to know about bleeds, margins, and trim sizes for a successful Amazon submission.",
    date: "May 15, 2026",
    author: "Alex Rivera",
    category: "KDP",
    readTime: "6 min read",
  },
];

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />
      <div className="pt-24 pb-12">
        <div className="space-y-12 max-w-5xl mx-auto px-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl">KDP Studio Blog</h1>
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
          Publishing tips, AI insights, and technical guides to help you succeed.
        </p>
      </div>

      <div className="grid gap-8">
        <Card className="border-zinc-800 bg-zinc-900/50 overflow-hidden group transition-all hover:border-zinc-700">
          <div className="md:flex">
            <div className="md:w-1/2 bg-zinc-800 aspect-video md:aspect-auto flex items-center justify-center">
              <BookOpen className="h-20 w-20 text-zinc-700 group-hover:text-indigo-500/50 transition-colors" />
            </div>
            <div className="md:w-1/2 p-8 space-y-4">
              <Badge className="bg-indigo-600 text-white">Featured Article</Badge>
              <h2 className="text-2xl font-bold text-zinc-100 group-hover:text-indigo-400 transition-colors">
                {posts[0].title}
              </h2>
              <p className="text-zinc-400">{posts[0].excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-zinc-500">
                <span className="flex items-center gap-1"><User className="h-4 w-4" /> {posts[0].author}</span>
                <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {posts[0].date}</span>
              </div>
              <Link href={`/blog/${posts[0].slug}`} className="inline-flex items-center gap-2 text-indigo-400 font-medium hover:text-indigo-300">
                Read Article <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Card>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(1).map((post) => (
            <Card key={post.title} className="border-zinc-800 bg-zinc-900/50 group transition-all hover:border-zinc-700 h-full flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline" className="text-indigo-400 border-indigo-400/30">{post.category}</Badge>
                  <span className="text-xs text-zinc-500">{post.readTime}</span>
                </div>
                <CardTitle className="text-lg text-zinc-100 group-hover:text-indigo-400 transition-colors leading-tight">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 flex-grow flex flex-col">
                <p className="text-sm text-zinc-400 flex-grow">{post.excerpt}</p>
                <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                  <span className="text-xs text-zinc-500">{post.date}</span>
                  <Link href={`/blog/${post.slug}`} className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                    Read More <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card className="border-zinc-800 bg-zinc-900/30 py-12 text-center">
        <CardContent className="space-y-4">
          <h2 className="text-2xl font-bold text-zinc-100">Subscribe to our newsletter</h2>
          <p className="text-zinc-500 max-w-md mx-auto text-sm">
            Get the latest publishing tips and AI updates delivered directly to your inbox.
          </p>
          <div className="flex max-w-sm mx-auto gap-2 mt-6">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-grow bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-500 transition-colors">
              Subscribe
            </button>
          </div>
        </CardContent>
      </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}
