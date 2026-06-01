"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MetadataPanel } from "@/components/projects/metadata-panel";
import {
  BookOpen,
  ArrowLeft,
  FileText,
  Download,
  Image,
  Clock,
  CheckCircle2,
  XCircle,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

// Mock project data with metadata awareness
const projectData: Record<string, {
  title: string;
  type: string;
  status: string;
  pages: number;
  created: string;
  updated: string;
  description: string;
  hasMetadata: boolean;
  hasCover: boolean;
  hasPdf: boolean;
  hasEpub: boolean;
}> = {
  "1": { title: "Children's Coloring Book", type: "Coloring Book", status: "completed", pages: 32, created: "May 28, 2024", updated: "2 hours ago", description: "A fun and engaging coloring book for children ages 4-8 featuring animals, shapes, and nature scenes.", hasMetadata: true, hasCover: true, hasPdf: true, hasEpub: true },
  "2": { title: "Fantasy Novel Vol. 1", type: "Fiction", status: "generating", pages: 240, created: "May 25, 2024", updated: "1 hour ago", description: "An epic fantasy adventure following a young hero's journey through magical realms and ancient mysteries.", hasMetadata: false, hasCover: false, hasPdf: false, hasEpub: false },
  "3": { title: "Recipe Collection", type: "Cookbook", status: "draft", pages: 64, created: "May 20, 2024", updated: "1 day ago", description: "A curated collection of 50 family-favorite recipes from around the world.", hasMetadata: false, hasCover: false, hasPdf: false, hasEpub: false },
  "4": { title: "Journal Template Pro", type: "Journal", status: "completed", pages: 200, created: "May 18, 2024", updated: "3 days ago", description: "A structured journal template with guided prompts for daily reflection and goal tracking.", hasMetadata: true, hasCover: true, hasPdf: true, hasEpub: false },
  "5": { title: "Poetry Anthology", type: "Poetry", status: "review", pages: 48, created: "May 15, 2024", updated: "5 days ago", description: "A collection of contemporary poems exploring themes of nature, love, and human connection.", hasMetadata: false, hasCover: true, hasPdf: false, hasEpub: false },
};

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;
  const project = projectData[projectId];

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <BookOpen className="h-12 w-12 text-zinc-600" />
        <h2 className="mt-4 text-xl font-semibold text-zinc-200">Project not found</h2>
        <p className="mt-2 text-sm text-zinc-500">The project you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/projects" className="mt-6">
          <Button variant="outline" className="gap-2 border-zinc-700 text-zinc-300">
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Button>
        </Link>
      </div>
    );
  }

  const statusColors: Record<string, "success" | "warning" | "secondary" | "default"> = {
    completed: "success",
    generating: "warning",
    draft: "secondary",
    review: "default",
  };

  const checklist = [
    { label: "Content generated", done: project.status !== "draft" },
    { label: "SEO metadata generated", done: project.hasMetadata },
    { label: "Cover designed", done: project.hasCover },
    { label: "KDP formatting applied", done: project.status === "completed" },
    { label: "Print-ready PDF", done: project.hasPdf },
    { label: "EPUB available", done: project.hasEpub },
  ];

  const completedCount = checklist.filter((i) => i.done).length;
  const totalCount = checklist.length;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <Link href="/projects">
        <Button variant="ghost" size="sm" className="gap-2 text-zinc-500 hover:text-zinc-300">
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Button>
      </Link>

      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-600/10">
            <BookOpen className="h-7 w-7 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-100">{project.title}</h1>
            <div className="flex items-center gap-3 mt-2">
              <Badge variant={statusColors[project.status]}>{project.status}</Badge>
              <span className="text-sm text-zinc-500">{project.type}</span>
              <span className="text-sm text-zinc-500">·</span>
              <span className="text-sm text-zinc-500">{project.pages} pages</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {project.status === "completed" && (
            <Button className="gap-2">
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Left: Project Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-zinc-800 bg-zinc-900/50">
            <CardHeader>
              <CardTitle className="text-zinc-100 text-base">Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-zinc-500 mb-1">Description</p>
                <p className="text-sm text-zinc-300">{project.description}</p>
              </div>
              <Separator className="bg-zinc-800" />
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><p className="text-xs text-zinc-500">Created</p><p className="text-zinc-300">{project.created}</p></div>
                <div><p className="text-xs text-zinc-500">Updated</p><p className="text-zinc-300">{project.updated}</p></div>
                <div><p className="text-xs text-zinc-500">Pages</p><p className="text-zinc-300">{project.pages}</p></div>
                <div><p className="text-xs text-zinc-500">Type</p><p className="text-zinc-300">{project.type}</p></div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-zinc-800 bg-zinc-900/50">
            <CardHeader>
              <CardTitle className="text-zinc-100 text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start gap-3 h-10 border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                onClick={() => router.push(`/projects/${projectId}/content`)}
              >
                <FileText className="h-4 w-4" />
                View Content
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-3 h-10 border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                onClick={() => router.push(`/create?project=${projectId}&tab=illustrations`)}
              >
                <Image className="h-4 w-4" />
                Manage Illustrations
              </Button>
              {project.status === "completed" && (
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 h-10 border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                  onClick={() => router.push(`/projects/${projectId}/exports`)}
                >
                  <Download className="h-4 w-4" />
                  Export All Formats
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Progress Summary */}
          <Card className="border-zinc-800 bg-zinc-900/50">
            <CardHeader>
              <CardTitle className="text-zinc-100 text-base">Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-3xl font-bold text-zinc-100">{completedCount}/{totalCount}</p>
                <p className="text-xs text-zinc-500 mt-1">checklist items completed</p>
              </div>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-zinc-800">
                <div className="h-full rounded-full bg-indigo-500 transition-all" style={{ width: `${(completedCount / totalCount) * 100}%` }} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Metadata + KDP Checklist */}
        <div className="lg:col-span-3 space-y-6">
          <MetadataPanel projectId={projectId} projectTitle={project.title} />

          <Card className="border-zinc-800 bg-zinc-900/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-zinc-100 text-base">KDP Readiness Checklist</CardTitle>
                <Badge variant={completedCount === totalCount ? "success" : "secondary"}>
                  {completedCount}/{totalCount}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {checklist.map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    {item.done ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <Clock className="h-4 w-4 text-zinc-600" />
                    )}
                    <span className={`text-sm ${item.done ? "text-zinc-300" : "text-zinc-500"}`}>{item.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}