"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Sparkles, BookOpen, FileText, ChevronRight, ChevronLeft, Check,
  Wand2, Palette, BookOpenCheck, Loader2, AlertCircle, Image as ImageIcon,
} from "lucide-react";
import Link from "next/link";

const steps = [
  { id: 1, name: "Concept", icon: Sparkles },
  { id: 2, name: "Content", icon: FileText },
  { id: 3, name: "Design", icon: Palette },
  { id: 4, name: "Review", icon: BookOpenCheck },
];

const bookTypes = [
  { id: "fiction", name: "Fiction", description: "Novels, stories, narrative" },
  { id: "childrens", name: "Children's Book", description: "Picture books with illustrations" },
  { id: "coloring", name: "Coloring Book", description: "Line-art pages for coloring" },
  { id: "journal", name: "Journal / Planner", description: "Structured notebooks" },
  { id: "nonfiction", name: "Non-Fiction", description: "Educational and reference" },
  { id: "cookbook", name: "Cookbook", description: "Recipe collections" },
];

const pageSizes = [
  { label: "6 x 9 in", value: "6x9", desc: "Standard novel" },
  { label: "8.5 x 11 in", value: "8.5x11", desc: "Coloring books" },
  { label: "8 x 10 in", value: "8x10", desc: "Children's books" },
  { label: "5.5 x 8.5 in", value: "5.5x8.5", desc: "Pocket books" },
];

const colorPalettes = [
  { name: "Ocean Breeze", colors: ["#0ea5e9", "#06b6d4", "#0891b2", "#67e8f9"] },
  { name: "Forest Earth", colors: ["#22c55e", "#16a34a", "#15803d", "#86efac"] },
  { name: "Sunset Warm", colors: ["#f97316", "#ea580c", "#dc2626", "#fdba74"] },
  { name: "Royal Purple", colors: ["#8b5cf6", "#7c3aed", "#6d28d9", "#c4b5fd"] },
  { name: "Midnight", colors: ["#1e293b", "#334155", "#475569", "#94a3b8"] },
  { name: "Rose Gold", colors: ["#e11d48", "#be123c", "#9d174d", "#fda4af"] },
];

export default function CreateBookPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedPalette, setSelectedPalette] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setCurrentStep(4);
    }, 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Create Book</h1>
        <p className="mt-1 text-sm text-zinc-500">Generate a complete KDP-ready book with AI.</p>
      </div>

      <div className="flex items-center justify-center">
        <div className="flex items-center gap-0">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${
                  currentStep > step.id
                    ? "bg-indigo-600 text-white"
                    : currentStep === step.id
                    ? "bg-indigo-600 text-white ring-2 ring-indigo-600/30 ring-offset-2 ring-offset-zinc-950"
                    : "bg-zinc-800 text-zinc-500"
                }`}>
                  {currentStep > step.id ? <Check className="h-5 w-5" /> : <step.icon className="h-5 w-5" />}
                </div>
                <div className="hidden sm:block">
                  <p className={`text-sm font-medium ${currentStep >= step.id ? "text-zinc-200" : "text-zinc-500"}`}>{step.name}</p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`mx-4 h-0.5 w-16 sm:w-24 transition-colors duration-300 ${currentStep > step.id ? "bg-indigo-600" : "bg-zinc-800"}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {currentStep === 1 && (
        <div className="space-y-6">
          <Card className="border-zinc-800 bg-zinc-900/50">
            <CardHeader>
              <CardTitle className="text-zinc-100">Book Concept</CardTitle>
              <CardDescription className="text-zinc-500">Define your book&apos;s basic idea and format.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Book Title</label>
                <Input placeholder="Enter your book title..." value={title} onChange={(e) => setTitle(e.target.value)} className="text-lg border-zinc-700 text-zinc-200 placeholder:text-zinc-500" />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-medium text-zinc-300">Book Type</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {bookTypes.map((type) => (
                    <button key={type.id} onClick={() => setSelectedType(type.id)}
                      className={`flex flex-col items-start gap-1 rounded-lg border p-4 text-left transition-all ${
                        selectedType === type.id
                          ? "border-indigo-500 bg-indigo-600/5 ring-1 ring-indigo-500"
                          : "border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/30"
                      }`}>
                      <span className="font-medium text-sm text-zinc-200">{type.name}</span>
                      <span className="text-xs text-zinc-500">{type.description}</span>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="flex justify-end">
            <Button onClick={() => setCurrentStep(2)} disabled={!title || !selectedType} className="gap-2">
              Next Step <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="space-y-6">
          <Card className="border-zinc-800 bg-zinc-900/50">
            <CardHeader>
              <CardTitle className="text-zinc-100">Content Generation</CardTitle>
              <CardDescription className="text-zinc-500">Configure how AI will generate your book content.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Content Style</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: "descriptive", label: "Descriptive", desc: "Rich, detailed prose" },
                    { id: "concise", label: "Concise", desc: "Clear and direct" },
                    { id: "playful", label: "Playful", desc: "Fun and engaging" },
                    { id: "professional", label: "Professional", desc: "Formal and polished" },
                  ].map((style) => (
                    <button key={style.id}
                      className="flex flex-col items-start gap-1 rounded-lg border border-zinc-800 p-4 text-left transition-all hover:border-zinc-700 hover:bg-zinc-800/30">
                      <span className="font-medium text-sm text-zinc-200">{style.label}</span>
                      <span className="text-xs text-zinc-500">{style.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-sm font-medium text-zinc-300">AI Features</label>
                <div className="space-y-3">
                  {[
                    { id: "auto-chapters", label: "Auto-generate chapters", desc: "AI structures your content into logical chapters" },
                    { id: "auto-illustrations", label: "Generate illustrations", desc: "Create AI artwork for each page/section" },
                    { id: "proofread", label: "Auto-proofread", desc: "Grammar and style checking" },
                  ].map((feature) => (
                    <label key={feature.id} className="flex items-start gap-3 rounded-lg border border-zinc-800 p-4 cursor-pointer hover:bg-zinc-800/30 transition-colors">
                      <input type="checkbox" className="mt-0.5 h-4 w-4 rounded border-zinc-700 text-indigo-600 focus:ring-indigo-500" />
                      <div>
                        <span className="text-sm font-medium text-zinc-200">{feature.label}</span>
                        <p className="text-xs text-zinc-500 mt-0.5">{feature.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setCurrentStep(1)} className="gap-2 border-zinc-700 text-zinc-300 hover:bg-zinc-800">
              <ChevronLeft className="h-4 w-4" /> Back
            </Button>
            <Button onClick={() => setCurrentStep(3)} className="gap-2">
              Next: Design <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div className="space-y-6">
          <Card className="border-zinc-800 bg-zinc-900/50">
            <CardHeader>
              <CardTitle className="text-zinc-100">Book Design</CardTitle>
              <CardDescription className="text-zinc-500">Choose colors, layout, and formatting options.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-medium text-zinc-300">Page Size (KDP Standard)</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {pageSizes.map((size) => (
                    <button key={size.value} onClick={() => setSelectedSize(size.value)}
                      className={`rounded-lg border p-3 text-center transition-all ${
                        selectedSize === size.value
                          ? "border-indigo-500 bg-indigo-600/5 ring-1 ring-indigo-500"
                          : "border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/30"
                      }`}>
                      <span className="text-sm font-medium block text-zinc-200">{size.label}</span>
                      <span className="text-xs text-zinc-500">{size.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-sm font-medium text-zinc-300">Color Theme</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {colorPalettes.map((palette) => (
                    <button key={palette.name} onClick={() => setSelectedPalette(palette.name)}
                      className={`flex items-center gap-3 rounded-lg border p-3 transition-all ${
                        selectedPalette === palette.name
                          ? "border-indigo-500 bg-indigo-600/5 ring-1 ring-indigo-500"
                          : "border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/30"
                      }`}>
                      <div className="flex gap-0.5">
                        {palette.colors.map((color, i) => (
                          <div key={i} className="h-6 w-4 rounded-sm first:rounded-l-md last:rounded-r-md" style={{ backgroundColor: color }} />
                        ))}
                      </div>
                      <span className="text-sm text-zinc-200">{palette.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setCurrentStep(2)} className="gap-2 border-zinc-700 text-zinc-300 hover:bg-zinc-800">
              <ChevronLeft className="h-4 w-4" /> Back
            </Button>
            <Button onClick={handleGenerate} disabled={isGenerating || !selectedSize} className="gap-2">
              {isGenerating ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Generating...</>
              ) : (
                <><Wand2 className="h-4 w-4" /> Generate Book</>
              )}
            </Button>
          </div>
        </div>
      )}

      {currentStep === 4 && (
        <div className="space-y-6">
          <Card className="border-emerald-500/30 bg-zinc-900/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/15">
                  <Check className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <CardTitle className="text-zinc-100">Book Generated Successfully</CardTitle>
                  <CardDescription className="text-zinc-500">Your book is ready for review and export.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-zinc-800/30 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600/10">
                      <BookOpen className="h-5 w-5 text-indigo-400" />
                    </div>
                    <div>
                      <p className="font-medium text-zinc-200">{title || "Untitled Book"}</p>
                      <p className="text-xs text-zinc-500">{selectedType && bookTypes.find(t => t.id === selectedType)?.name} · {selectedSize || "6x9"} · 32 pages</p>
                    </div>
                  </div>
                  <Badge variant="success">KDP Ready</Badge>
                </div>
                <Separator className="my-3 bg-zinc-800" />
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /><span className="text-zinc-400">Content generated</span></div>
                  <div className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /><span className="text-zinc-400">KDP formatting</span></div>
                  <div className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /><span className="text-zinc-400">Cover designed</span></div>
                  <div className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /><span className="text-zinc-400">Print-ready PDF</span></div>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setCurrentStep(3)} className="gap-2 border-zinc-700 text-zinc-300 hover:bg-zinc-800">
              <ChevronLeft className="h-4 w-4" /> Regenerate
            </Button>
            <div className="flex gap-3">
              <Link href="/projects"><Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">View in Projects</Button></Link>
              <Button className="gap-2"><FileText className="h-4 w-4" /> Download PDF</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}