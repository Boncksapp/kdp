"use client";

import Link from "next/link";
import { BookOpenCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
            <BookOpenCheck className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-zinc-100">KDP Studio</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link href="/pricing" className="text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors">Pricing</Link>
          <Link href="/blog" className="text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors">Blog</Link>
          <Link href="/about" className="text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors">About</Link>
          <Link href="/help" className="text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors">Help</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors">Sign In</Link>
          <Link href="/login">
            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-white">Get Started</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
