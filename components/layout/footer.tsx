"use client";

import Link from "next/link";
import { BookOpenCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
                <BookOpenCheck className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-zinc-100">KDP Studio</span>
            </div>
            <p className="text-sm text-zinc-500">
              AI-powered book publishing for Amazon KDP. Create, illustrate, and export professional books in minutes.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-zinc-200 mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li><Link href="/pricing" className="hover:text-zinc-300 transition-colors">Pricing</Link></li>
              <li><Link href="/#features" className="hover:text-zinc-300 transition-colors">Features</Link></li>
              <li><Link href="/#how-it-works" className="hover:text-zinc-300 transition-colors">How It Works</Link></li>
              <li><Link href="/#faq" className="hover:text-zinc-300 transition-colors">FAQ</Link></li>
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
              <li><Link href="/legal" className="hover:text-zinc-300 transition-colors">Legal Overview</Link></li>
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
  );
}
