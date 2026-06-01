"use client";

import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, FileText } from "lucide-react";
import Link from "next/link";

export default function ProjectContentViewPage() {
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
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Book Content</h1>
        <p className="mt-1 text-sm text-zinc-500">View and manage your book's generated content.</p>
      </div>

      <Card className="border-zinc-800 bg-zinc-900/50">
        <CardHeader>
          <CardTitle className="text-zinc-100">Content Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { chapter: "Chapter 1", pages: "pp. 1-12" },
              { chapter: "Chapter 2", pages: "pp. 13-28" },
              { chapter: "Chapter 3", pages: "pp. 29-44" },
              { chapter: "Chapter 4", pages: "pp. 45-58" },
            ].map((ch) => (
              <div key={ch.chapter} className="flex items-center justify-between rounded-lg border border-zinc-800/50 p-4 transition-colors hover:bg-zinc-800/30">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-indigo-400" />
                  <span className="text-sm font-medium text-zinc-200">{ch.chapter}</span>
                </div>
                <span className="text-xs text-zinc-500">{ch.pages}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}