"use client";

import { useState, useEffect } from "react";
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
  Loader2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;
  const [loading, setLoading] = useState(true);
  const [jobData, setJobData] = useState<any>(null);

  useEffect(() => {
    if (!projectId) return;
    const fetchJob = async () => {
      try {
        const res = await fetch("/api/books", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "job-status", job_id: projectId }),
        });
        if (res.ok) setJobData(await res.json());
      } catch {} finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [projectId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  const title = jobData?.job_type || `Project ${projectId?.slice(0, 8)}`;
  const status = jobData?.status || "unknown";
  const progress = jobData?.progress || 0;
  const result = jobData?.result || {};
  const hasPdf = !!result.pdfUrl;
  const hasEpub = !!result.epubUrl;
  const hasSeo = !!result.seoTitle;

  if (!projectId) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <BookOpen className="h-12 w-12 text-zinc-600" />
        <h2 className="mt-4 text-xl font-semibold text-zinc-200">Project not found</h2>
        <Link href="/projects" className="mt-6">
          <Button variant="outline" className="gap-2 border-zinc-700 text-zinc-300">
            <ArrowLeft className="h-4 w-4" /> Back to Projects
          </Button>
        </Link>
      </div>
    );
  }

  const statusColors: Record<string, "success" | "warning" | "secondary" | "default" | "destructive"> = {
    completed: "success",
    generating: "warning",
    running: "warning",
    draft: "secondary",
    queued: "secondary",
    review: "default",
    failed: "destructive",
  };

  const checklist = [
    { label: "Content generated", done: status !== "draft" && status !== "queued" },
    { label: "SEO metadata generated", done: hasSeo },
    { label: "Cover designed", done: status === "completed" || status === "review" },
    { label: "KDP formatting applied", done: status === "completed" },
    { label: "Print-ready PDF", done: hasPdf },
    { label: "EPUB available", done: hasEpub },
  ];

  const completedCount = checklist.filter((i) => i.done).length;
  const totalCount = checklist.length;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <Link href="/projects">
        <Button variant="ghost" size="sm" className="gap-2 text-zinc-500 hover:text-zinc-300">
          <ArrowLeft className="h-4 w-4" /> Back to Projects
        </Button>
      </Link>

      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-600/10">
            <BookOpen className="h-7 w-7 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-100">{title}</h1>
            <div className="flex items-center gap-3 mt-2">
              <Badge variant={statusColors[status] || "secondary"}>{status}</Badge>
              <span className="text-sm text-zinc-500">{progress}% complete</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {status === "completed" && (
            <Button className="gap-2"><Download className="h-4 w-4" /> Download PDF</Button>
          )}
        </div>
      </div>

      {status === "failed" && jobData?.error && (
        <div className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/5 p-3">
          <AlertCircle className="h-4 w-4 text-red-400" />
          <p className="text-xs text-red-300">{jobData.error}</p>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-zinc-800 bg-zinc-900/50">
            <CardHeader>
              <CardTitle className="text-zinc-100 text-base">Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-zinc-500 mb-1">Job Type</p>
                <p className="text-sm text-zinc-300">{title}</p>
              </div>
              <Separator className="bg-zinc-800" />
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><p className="text-xs text-zinc-500">Status</p><p className="text-zinc-300">{status}</p></div>
                <div><p className="text-xs text-zinc-500">Progress</p><p className="text-zinc-300">{progress}%</p></div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-zinc-800 bg-zinc-900/50">
            <CardHeader>
              <CardTitle className="text-zinc-100 text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start gap-3 h-10 border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                onClick={() => router.push(`/projects/${projectId}/content`)}>
                <FileText className="h-4 w-4" /> View Content
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3 h-10 border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                onClick={() => router.push(`/create?project=${projectId}&tab=illustrations`)}>
                <Image className="h-4 w-4" /> Manage Illustrations
              </Button>
              {status === "completed" && (
                <Button variant="outline" className="w-full justify-start gap-3 h-10 border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                  onClick={() => router.push(`/projects/${projectId}/exports`)}>
                  <Download className="h-4 w-4" /> Export All Formats
                </Button>
              )}
            </CardContent>
          </Card>

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

        <div className="lg:col-span-3 space-y-6">
          <MetadataPanel projectId={projectId} projectTitle={title} />

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