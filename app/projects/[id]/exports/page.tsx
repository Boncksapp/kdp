"use client";

import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, FileText, BookOpen } from "lucide-react";
import Link from "next/link";

export default function ProjectExportsPage() {
  const params = useParams();
  const projectId = params.id as string;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Link href={`/projects/${projectId}`}>
        <Button variant="ghost" size="sm" className="gap-2 text-zinc-500 hover:text-zinc-300">
          <ArrowLeft className="h-4 w-4" />
          Back to Project
        </Button>
      </Link>

      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Export Files</h1>
        <p className="mt-1 text-sm text-zinc-500">Download your book in all available formats.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {[
          { format: "PDF (Print-Ready)", desc: "KDP-compliant PDF with bleeds and margins", size: "12.4 MB", ready: true },
          { format: "EPUB (eBook)", desc: "Reflowable EPUB for Kindle and other readers", size: "8.1 MB", ready: true },
          { format: "Cover (PDF)", desc: "KDP cover template with spine and back cover", size: "3.2 MB", ready: true },
          { format: "Cover (PNG)", desc: "High-resolution cover image for marketing", size: "5.7 MB", ready: false },
        ].map((file) => (
          <Card key={file.format} className="border-zinc-800 bg-zinc-900/50 transition-all hover:border-zinc-700">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600/10">
                    <FileText className="h-5 w-5 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-200">{file.format}</p>
                    <p className="text-xs text-zinc-500 mt-0.5">{file.desc}</p>
                    <p className="text-xs text-zinc-600 mt-1">{file.size}</p>
                  </div>
                </div>
              </div>
              <Button
                disabled={!file.ready}
                className="w-full mt-4 gap-2"
                variant={file.ready ? "default" : "outline"}
                size="sm"
              >
                <Download className="h-4 w-4" />
                {file.ready ? "Download" : "Not Available"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}