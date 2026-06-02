"use client";

import { useParams } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, Clock, User, Share2, Printer } from "lucide-react";
import Link from "next/link";

const articles = {
  "quick-start": {
    title: "Quick start guide",
    content: `
      <p>Welcome to KDP Studio! This guide will help you create your first book in minutes.</p>
      <h3>1. Set up your API Keys</h3>
      <p>Go to Settings and enter your OpenAI and Stability AI API keys. This enables the AI generation features.</p>
      <h3>2. Create a New Project</h3>
      <p>Click "Create" in the sidebar and choose a book type (e.g., Fiction, Non-Fiction, Low-Content).</p>
      <h3>3. Plan your Book</h3>
      <p>Use the AI Planning tool to generate a table of contents and structure for your book.</p>
      <h3>4. Generate Content</h3>
      <p>Generate chapters and illustrations based on your plan.</p>
      <h3>5. Export</h3>
      <p>Download your book as a KDP-compliant PDF or EPUB.</p>
    `,
    category: "Getting Started",
    author: "Alex Rivera",
    date: "June 1, 2026",
    readTime: "5 min read"
  },
  "book-types": {
    title: "Understanding book types",
    content: `
      <p>KDP Studio supports several book types, each with optimized workflows:</p>
      <ul>
        <li><strong>Fiction:</strong> Best for novels and short stories. Optimized for narrative flow.</li>
        <li><strong>Non-Fiction:</strong> Best for guides, textbooks, and biographies. Focuses on clear headings and structured information.</li>
        <li><strong>Low-Content:</strong> Best for journals, planners, and coloring books. Focuses on repetitive layouts and imagery.</li>
      </ul>
    `,
    category: "Getting Started",
    author: "Alex Rivera",
    date: "June 1, 2026",
    readTime: "3 min read"
  },
  "setup-project": {
    title: "Setting up your first project",
    content: `
      <p>To start a project, you'll need to define some basic metadata:</p>
      <ul>
        <li><strong>Title:</strong> The name of your book.</li>
        <li><strong>Language:</strong> The primary language of your content.</li>
        <li><strong>Trim Size:</strong> The physical dimensions of your book (e.g., 6x9 inches).</li>
      </ul>
    `,
    category: "Getting Started",
    author: "Alex Rivera",
    date: "June 1, 2026",
    readTime: "4 min read"
  },
  "prompts": {
    title: "Writing effective prompts",
    content: `
      <p>Better prompts lead to better content. Here are some tips:</p>
      <ul>
        <li><strong>Be Specific:</strong> Instead of "a story about a dog," try "a heartwarming short story about a stray golden retriever finding a home in a small mountain town."</li>
        <li><strong>Set the Tone:</strong> Mention if you want the writing to be humorous, academic, or suspenseful.</li>
        <li><strong>Define Structure:</strong> Ask for specific elements like "a dialogue-heavy scene" or "a bulleted summary."</li>
      </ul>
    `,
    category: "AI Generation",
    author: "Sarah Chen",
    date: "June 1, 2026",
    readTime: "6 min read"
  },
  "quality": {
    title: "Content quality settings",
    content: `
      <p>You can adjust AI settings to balance speed and quality:</p>
      <ul>
        <li><strong>Model:</strong> Choose between faster models (GPT-3.5) or higher-quality models (GPT-4).</li>
        <li><strong>Temperature:</strong> Lower values are more focused; higher values are more creative.</li>
      </ul>
    `,
    category: "AI Generation",
    author: "Sarah Chen",
    date: "June 1, 2026",
    readTime: "3 min read"
  },
  "image-gen": {
    title: "Image generation guide",
    content: `
      <p>Generate stunning illustrations using Stability AI:</p>
      <ul>
        <li><strong>Aspect Ratio:</strong> Match your book's trim size.</li>
        <li><strong>Style:</strong> Use keywords like "watercolor," "photorealistic," or "sketch."</li>
      </ul>
    `,
    category: "AI Generation",
    author: "Sarah Chen",
    date: "June 1, 2026",
    readTime: "5 min read"
  },
  "pdf-settings": {
    title: "PDF export settings",
    content: `
      <p>For Amazon KDP, PDF settings are crucial:</p>
      <ul>
        <li><strong>Bleed:</strong> Ensure images extend to the edge if you choose bleed.</li>
        <li><strong>Margins:</strong> Stay within KDP's safe zones to avoid rejection.</li>
        <li><strong>Fonts:</strong> All fonts are automatically embedded by KDP Studio.</li>
      </ul>
    `,
    category: "Export & Publishing",
    author: "James Wilson",
    date: "June 1, 2026",
    readTime: "7 min read"
  },
  "epub-guide": {
    title: "EPUB formatting guide",
    content: `
      <p>EPUBs are reflowable, meaning the text adjusts to the screen size:</p>
      <ul>
        <li>Avoid fixed layouts for fiction.</li>
        <li>Use high-quality but compressed images.</li>
      </ul>
    `,
    category: "Export & Publishing",
    author: "James Wilson",
    date: "June 1, 2026",
    readTime: "4 min read"
  },
  "kdp-checklist": {
    title: "KDP compliance checklist",
    content: `
      <p>Before uploading to Amazon, check these items:</p>
      <ul>
        <li>Title matches exactly on cover and interior.</li>
        <li>ISBN is correct (if using your own).</li>
        <li>No spelling errors on the cover.</li>
      </ul>
    `,
    category: "Export & Publishing",
    author: "James Wilson",
    date: "June 1, 2026",
    readTime: "5 min read"
  },
  "plans": {
    title: "Subscription plans",
    content: `
      <p>We offer a simple flat-rate plan:</p>
      <ul>
        <li><strong>SaaS Subscription:</strong> $19.99/month for full studio access.</li>
        <li><strong>BYOK:</strong> You pay AI providers directly.</li>
      </ul>
    `,
    category: "Account & Billing",
    author: "Alex Rivera",
    date: "June 1, 2026",
    readTime: "2 min read"
  },
  "api-keys": {
    title: "Managing API keys",
    content: `
      <p>Your API keys are stored securely using encryption-at-rest:</p>
      <ul>
        <li>OpenAI keys enable text generation.</li>
        <li>Stability AI keys enable image generation.</li>
      </ul>
    `,
    category: "Account & Billing",
    author: "Alex Rivera",
    date: "June 1, 2026",
    readTime: "3 min read"
  },
  "billing": {
    title: "Usage and billing",
    content: `
      <p>You can view your subscription status in the billing dashboard. AI usage costs are billed by the respective providers (OpenAI/Stability).</p>
    `,
    category: "Account & Billing",
    author: "Alex Rivera",
    date: "June 1, 2026",
    readTime: "2 min read"
  },
  "how-to-create": {
    title: "How to create your first KDP book in 5 minutes",
    content: `
      <p>Creating a book is fast and intuitive. Follow these steps:</p>
      <ol>
        <li><strong>Describe your idea:</strong> Enter a prompt for your book topic.</li>
        <li><strong>Generate Plan:</strong> Let the AI create a structural outline.</li>
        <li><strong>Generate Chapters:</strong> Click to write the content automatically.</li>
        <li><strong>Add Illustrations:</strong> Use the image generator for a professional look.</li>
        <li><strong>Export:</strong> Get your KDP-ready file instantly.</li>
      </ol>
    `,
    category: "Getting Started",
    author: "Alex Rivera",
    date: "June 1, 2026",
    readTime: "5 min read"
  },
  "trim-sizes": {
    title: "Understanding KDP trim sizes and margins",
    content: `
      <p>Trim size is the physical size of your printed book. Common sizes include:</p>
      <ul>
        <li><strong>6 x 9 inches:</strong> Standard for novels.</li>
        <li><strong>8.5 x 11 inches:</strong> Standard for workbooks and coloring books.</li>
      </ul>
      <p>Margins ensure your content doesn't get cut off during printing. KDP Studio handles these automatically based on your selection.</p>
    `,
    category: "Export & Publishing",
    author: "James Wilson",
    date: "June 1, 2026",
    readTime: "4 min read"
  },
  "best-practices": {
    title: "Best practices for AI-generated content",
    content: `
      <p>To get the best results from AI:</p>
      <ul>
        <li><strong>Iterate:</strong> Don't settle for the first draft. Refine your prompts.</li>
        <li><strong>Human Touch:</strong> Review and edit the AI output to ensure it matches your voice.</li>
        <li><strong>Verify Facts:</strong> AI can sometimes hallucinate; always double-check technical data.</li>
      </ul>
    `,
    category: "AI Generation",
    author: "Sarah Chen",
    date: "June 1, 2026",
    readTime: "5 min read"
  },
  "troubleshooting": {
    title: "Troubleshooting common PDF export issues",
    content: `
      <p>If your export fails or looks wrong:</p>
      <ul>
        <li><strong>API Key Error:</strong> Ensure your keys have enough credits.</li>
        <li><strong>Image Resolution:</strong> Low-res images can cause PDF errors.</li>
        <li><strong>Browser Cache:</strong> Sometimes a hard refresh helps.</li>
      </ul>
    `,
    category: "Export & Publishing",
    author: "James Wilson",
    date: "June 1, 2026",
    readTime: "4 min read"
  }
};

export default function HelpArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const article = articles[slug as keyof typeof articles];

  if (!article) {
    return (
      <div className="min-h-screen bg-zinc-950">
        <Navbar />
        <div className="pt-32 pb-12 text-center text-zinc-100">
          <h1 className="text-2xl font-bold">Article not found</h1>
          <Link href="/help" className="text-indigo-400 hover:underline mt-4 inline-block">Back to Help Center</Link>
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
          <Link href="/help" className="flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors mb-8 group">
            <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Help Center
          </Link>
          
          <div className="space-y-4 mb-10">
            <div className="text-indigo-400 font-medium text-sm">{article.category}</div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{article.title}</h1>
            <div className="flex items-center gap-6 text-zinc-500 text-sm">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {article.author}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {article.readTime}
              </div>
              <div>{article.date}</div>
            </div>
          </div>

          <Card className="border-zinc-800 bg-zinc-900/50 mb-10">
            <CardContent className="pt-8">
              <div 
                className="prose prose-zinc prose-invert max-w-none text-zinc-400 space-y-6 help-article-content"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </CardContent>
          </Card>

          <div className="flex justify-between items-center py-6 border-t border-zinc-800">
            <div className="text-sm text-zinc-500">Was this article helpful?</div>
            <div className="flex gap-4">
              <button className="text-zinc-400 hover:text-zinc-200 text-sm flex items-center gap-2">
                <Share2 className="h-4 w-4" /> Share
              </button>
              <button className="text-zinc-400 hover:text-zinc-200 text-sm flex items-center gap-2">
                <Printer className="h-4 w-4" /> Print
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
