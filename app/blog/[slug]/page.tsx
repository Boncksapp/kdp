"use client";

import { useParams } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, Clock, User, Calendar, Share2, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const posts = {
  "future-ai": {
    title: "The Future of Self-Publishing with AI",
    content: `
      <p>Self-publishing has undergone a massive transformation in the last decade, but nothing compares to the shift we're seeing today with generative AI. For the first time, independent authors have access to tools that were previously reserved for major publishing houses.</p>
      
      <h3>The Democratization of Design</h3>
      <p>One of the biggest hurdles for self-publishers has always been cover design and internal illustrations. With AI models like Stable Diffusion and Midjourney, authors can now generate high-quality visual content that matches their narrative vision perfectly, without the five-figure price tag of professional studios.</p>
      
      <h3>Orchestration is Key</h3>
      <p>The real power of AI isn't just in generating text or images; it's in the orchestration. KDP Studio is designed to bridge the gap between "raw AI output" and a "professional book." By automating the formatting, bleed calculations, and margin requirements of Amazon KDP, we let authors focus on what they do best: storytelling.</p>
      
      <h3>A Collaborative Future</h3>
      <p>We don't believe AI will replace authors. Instead, it will act as a tireless assistant—a research partner, a copy editor, and an illustrator all rolled into one. The authors who thrive in this new era will be those who learn to steer these models effectively.</p>
    `,
    category: "Insights",
    author: "Alex Rivera",
    date: "June 1, 2026",
    readTime: "5 min read"
  },
  "save-byok": {
    title: "How to Save 80% on AI Costs with BYOK",
    content: `
      <p>Many AI writing platforms hide their true costs behind "credits" or expensive monthly tiers. At KDP Studio, we've taken a different approach: Bring Your Own Key (BYOK).</p>
      
      <h3>The Markup Problem</h3>
      <p>Most SaaS companies in the AI space charge a 300% to 500% markup on the tokens they provide. If you're producing high-volume content, these costs can spiral out of control. By connecting your own OpenAI or Stability AI keys, you eliminate the middleman and pay wholesale prices directly to the providers.</p>
      
      <h3>Transparency and Control</h3>
      <p>With BYOK, you have full transparency. You can see exactly how many tokens your book consumed and what it cost you in your provider's dashboard. This level of control is essential for professional self-publishers who are scaling their business.</p>
      
      <h3>Security First</h3>
      <p>We take the security of your API keys seriously. Your keys are encrypted at rest using industry-standard protocols and are only decrypted in memory during the execution of your generation jobs. You remain the sole owner of your data and your keys.</p>
    `,
    category: "Tutorial",
    author: "Jordan Smith",
    date: "May 28, 2026",
    readTime: "4 min read"
  },
  "line-art-sdxl": {
    title: "Mastering Coloring Book Line Art with SDXL",
    content: `
      <p>Coloring books are a massive niche on Amazon KDP. Generating consistent, clean line art is the "holy grail" for these creators. Here's how to master it with KDP Studio and SDXL.</p>
      
      <h3>Prompt Engineering for Line Art</h3>
      <p>The key to good coloring book pages is simplicity. Use prompts that emphasize "thick black lines," "white background," and "no shading." For example: <em>"A cute baby elephant, simple vector line art, coloring book style, black and white, thick outlines, white background, no gradients --ar 3:4"</em>.</p>
      
      <h3>Resolution and Vectorization</h3>
      <p>To ensure your prints don't look pixelated, we recommend generating at high resolutions. KDP Studio's export engine ensures that your images are correctly placed and formatted for the 300 DPI requirements of physical printing.</p>
      
      <h3>Creating a Themed Portfolio</h3>
      <p>Consistency is what sells. Use the same style keywords across your entire project to ensure your coloring book feels cohesive and professional.</p>
    `,
    category: "Design",
    author: "Sam Chen",
    date: "May 20, 2026",
    readTime: "7 min read"
  },
  "kdp-formatting": {
    title: "Understanding KDP Formatting Requirements",
    content: `
      <p>Amazon KDP is notoriously strict about formatting. A single pixel out of place can lead to your book being rejected. Here's what you need to know.</p>
      
      <h3>Bleed vs. No Bleed</h3>
      <p>If your images go all the way to the edge of the page, you must select "Bleed." KDP requires an extra 0.125 inches on the outer edges to account for the physical trimming process. KDP Studio calculates this for you automatically when you select your trim size.</p>
      
      <h3>The Gutter Margin</h3>
      <p>The "gutter" is the inside margin where the pages are glued together. As your page count increases, the gutter must get wider so that your text doesn't disappear into the spine. Our export engine handles these dynamic calculations based on your project's page count.</p>
      
      <h3>Font Embedding</h3>
      <p>Every PDF uploaded to KDP must have all fonts embedded. KDP Studio uses a standardized set of high-quality, print-optimized fonts that are automatically embedded in every export, ensuring your book looks exactly how you designed it.</p>
    `,
    category: "KDP",
    author: "Alex Rivera",
    date: "May 15, 2026",
    readTime: "6 min read"
  }
};

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = posts[slug as keyof typeof posts];

  if (!post) {
    return (
      <div className="min-h-screen bg-zinc-950">
        <Navbar />
        <div className="pt-32 pb-12 text-center text-zinc-100">
          <h1 className="text-2xl font-bold">Post not found</h1>
          <Link href="/blog" className="text-indigo-400 hover:underline mt-4 inline-block">Back to Blog</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/blog" className="flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors mb-8 group">
            <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>
          
          <div className="space-y-6 mb-12">
            <Badge className="bg-indigo-600 text-white">{post.category}</Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl leading-tight">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-6 text-zinc-500 text-sm">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {post.author}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {post.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </div>
            </div>
          </div>

          <div className="aspect-video bg-zinc-900 rounded-2xl border border-zinc-800 mb-12 flex items-center justify-center">
             <Share2 className="h-20 w-20 text-zinc-800" />
          </div>

          <Card className="border-zinc-800 bg-zinc-900/50 mb-12">
            <CardContent className="pt-10">
              <div 
                className="prose prose-zinc prose-invert max-w-none text-zinc-400 space-y-6 blog-content"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </CardContent>
          </Card>

          <div className="rounded-2xl border border-indigo-500/20 bg-indigo-600/5 p-8 text-center space-y-4">
            <h2 className="text-2xl font-bold">Ready to start your book?</h2>
            <p className="text-zinc-400">Join thousands of authors using KDP Studio to scale their publishing business.</p>
            <div className="pt-4">
              <Link href="/login" className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-indigo-600 font-semibold hover:bg-indigo-500 transition-colors">
                Get Started for Free
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
