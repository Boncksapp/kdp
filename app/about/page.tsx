"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Sparkles, ShieldCheck, Users, Rocket, Coins } from "lucide-react";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />
      <div className="pt-24 pb-12">
        <div className="space-y-12 max-w-5xl mx-auto px-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl">About KDP Studio</h1>
        <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
          We are empowering the next generation of authors with professional-grade AI publishing tools.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-zinc-100">Our Mission</h2>
          <p className="text-zinc-400 leading-relaxed">
            KDP Studio was founded with a single goal: to democratize high-quality book publishing. 
            By combining state-of-the-art AI orchestration with professional document processing, 
            we enable creators to move from concept to print-ready files in record time.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            We believe that the future of storytelling is collaborative, where human creativity 
            is amplified by intelligent tools. Our studio handles the technical complexities of 
            formatting, layout, and compliance, so you can focus on your vision.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-zinc-800 bg-zinc-900/50">
            <CardContent className="pt-6 text-center">
              <Rocket className="h-8 w-8 text-indigo-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-zinc-100">10k+</div>
              <div className="text-xs text-zinc-500">Books Created</div>
            </CardContent>
          </Card>
          <Card className="border-zinc-800 bg-zinc-900/50">
            <CardContent className="pt-6 text-center">
              <Users className="h-8 w-8 text-indigo-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-zinc-100">5k+</div>
              <div className="text-xs text-zinc-500">Active Authors</div>
            </CardContent>
          </Card>
          <Card className="border-zinc-800 bg-zinc-900/50">
            <CardContent className="pt-6 text-center">
              <Sparkles className="h-8 w-8 text-indigo-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-zinc-100">1M+</div>
              <div className="text-xs text-zinc-500">AI Generations</div>
            </CardContent>
          </Card>
          <Card className="border-zinc-800 bg-zinc-900/50">
            <CardContent className="pt-6 text-center">
              <ShieldCheck className="h-8 w-8 text-indigo-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-zinc-100">100%</div>
              <div className="text-xs text-zinc-500">KDP Compliant</div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-zinc-100 text-center">Why BYOK?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-zinc-800 bg-zinc-900/50">
            <CardHeader>
              <Coins className="h-10 w-10 text-indigo-400 mb-2" />
              <CardTitle className="text-zinc-100">Cost Transparency</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-400">
                Most platforms markup AI costs by 3-5x. We don't. You pay OpenAI and Stability AI 
                directly at wholesale rates.
              </p>
            </CardContent>
          </Card>
          <Card className="border-zinc-800 bg-zinc-900/50">
            <CardHeader>
              <ShieldCheck className="h-10 w-10 text-indigo-400 mb-2" />
              <CardTitle className="text-zinc-100">Data Ownership</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-400">
                Using your own keys means your interactions are tied to your accounts. You retain 
                full control over your usage history.
              </p>
            </CardContent>
          </Card>
          <Card className="border-zinc-800 bg-zinc-900/50">
            <CardHeader>
              <BookOpen className="h-10 w-10 text-indigo-400 mb-2" />
              <CardTitle className="text-zinc-100">Scalability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-400">
                Whether you're making one book or one hundred, our flat subscription fee ensures 
                predictable software costs.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-8 text-center space-y-4">
        <h2 className="text-2xl font-bold text-zinc-100">Join the Publishing Revolution</h2>
        <p className="text-zinc-400 max-w-2xl mx-auto">
          We are committed to building the best possible workspace for the modern author. 
          Thank you for being part of our journey.
        </p>
      </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
