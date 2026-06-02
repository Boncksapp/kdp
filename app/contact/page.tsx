"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, Globe, Send, MapPin, Phone } from "lucide-react";
import Link from "next/link";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />
      <div className="pt-24 pb-12">
        <div className="space-y-12 max-w-5xl mx-auto px-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl">Contact Us</h1>
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
          Have questions? We're here to help you on your publishing journey.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <Card className="border-zinc-800 bg-zinc-900/50">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600/10 shrink-0">
                  <Mail className="h-5 w-5 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-zinc-200">Email Support</h3>
                  <p className="text-xs text-zinc-500 mt-1">Typical response within 24 hours</p>
                  <p className="text-sm text-indigo-400 mt-2">support@kdpstudio.ai</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600/10 shrink-0">
                  <MessageSquare className="h-5 w-5 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-zinc-200">Live Chat</h3>
                  <p className="text-xs text-zinc-500 mt-1">Available for Creator plan members</p>
                  <Link href="/dashboard" className="text-sm text-indigo-400 mt-2 hover:underline block">
                    Open Dashboard
                  </Link>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600/10 shrink-0">
                  <MapPin className="h-5 w-5 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-zinc-200">Headquarters</h3>
                  <p className="text-xs text-zinc-500 mt-1">San Francisco, CA</p>
                  <p className="text-sm text-zinc-400 mt-2">Virtual-first team worldwide</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-zinc-800 bg-indigo-600/5">
            <CardContent className="p-6">
              <h3 className="font-semibold text-zinc-200 mb-2">Help Center</h3>
              <p className="text-sm text-zinc-500 mb-4">
                Check our documentation for quick answers to common questions.
              </p>
              <Link href="/help" className="block">
                <Button variant="outline" className="w-full border-zinc-700 text-zinc-300">
                  Browse Docs
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <Card className="md:col-span-2 border-zinc-800 bg-zinc-900/50">
          <CardHeader>
            <CardTitle className="text-zinc-100">Send us a message</CardTitle>
            <CardDescription className="text-zinc-500">
              Fill out the form below and we'll get back to you as soon as possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">First Name</label>
                  <Input placeholder="John" className="bg-zinc-800 border-zinc-700 text-zinc-100" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">Last Name</label>
                  <Input placeholder="Doe" className="bg-zinc-800 border-zinc-700 text-zinc-100" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Email Address</label>
                <Input type="email" placeholder="john@example.com" className="bg-zinc-800 border-zinc-700 text-zinc-100" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Subject</label>
                <Input placeholder="How can we help?" className="bg-zinc-800 border-zinc-700 text-zinc-100" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Message</label>
                <Textarea placeholder="Tell us more about your inquiry..." className="bg-zinc-800 border-zinc-700 text-zinc-100 min-h-[150px]" />
              </div>
              <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white gap-2 h-12">
                <Send className="h-4 w-4" /> Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
