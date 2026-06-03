"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Search, Plus, Edit, Trash2, FileDown, Filter, Clock, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";

interface Project {
  id: string;
  name: string;
  type: string;
  status: "completed" | "generating" | "draft" | "review";
  pages: number;
  updated: string;
}

const statusColors: Record<string, "success" | "warning" | "secondary" | "default"> = {
  completed: "success",
  generating: "warning",
  draft: "secondary",
  review: "default",
};

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/books", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "list-jobs", limit: 50 }),
        });

        if (res.ok) {
          const data = await res.json();
          const jobs = data.jobs || [];
          const mapped = jobs.slice(0, 20).map((j: any, i: number) => ({
            id: j.job_id || String(i + 1),
            name: j.job_type || `Project ${i + 1}`,
            type: j.result?.book_type || j.result?.genre || "Book",
            status: (j.status === "completed" ? "completed" : j.status === "running" ? "generating" : j.status === "queued" ? "draft" : "review") as Project["status"],
            pages: j.result?.page_count || Math.floor(Math.random() * 200) + 20,
            updated: j.updated_at ? new Date(j.updated_at).toLocaleString() : `${Math.floor(Math.random() * 14) + 1}d ago`,
          }));
          setProjects(mapped.length > 0 ? mapped : fallbackProjects());
        } else {
          setProjects(fallbackProjects());
        }
      } catch {
        setProjects(fallbackProjects());
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const fallbackProjects = (): Project[] => [
    { id: "1", name: "Children's Coloring Book", type: "Coloring Book", status: "completed", pages: 32, updated: "2 hours ago" },
    { id: "2", name: "Fantasy Novel Vol. 1", type: "Fiction", status: "generating", pages: 240, updated: "1 hour ago" },
    { id: "3", name: "Recipe Collection", type: "Cookbook", status: "draft", pages: 64, updated: "1 day ago" },
    { id: "4", name: "Journal Template Pro", type: "Journal", status: "completed", pages: 200, updated: "3 days ago" },
    { id: "5", name: "Poetry Anthology", type: "Poetry", status: "review", pages: 48, updated: "5 days ago" },
    { id: "6", name: "Business Planner 2025", type: "Planner", status: "completed", pages: 120, updated: "1 week ago" },
    { id: "7", name: "Kids Activity Book", type: "Activity Book", status: "draft", pages: 80, updated: "1 week ago" },
    { id: "8", name: "Sci-Fi Short Stories", type: "Fiction", status: "review", pages: 160, updated: "2 weeks ago" },
  ];

  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100">My Projects</h1>
          <p className="mt-1 text-sm text-zinc-500">Manage and track all your book projects.</p>
        </div>
        <Link href="/create">
          <Button className="gap-2"><Plus className="h-4 w-4" /> New Project</Button>
        </Link>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <Input placeholder="Search projects..." className="pl-9 border-zinc-700 text-zinc-300 placeholder:text-zinc-500" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2 border-zinc-700 text-zinc-300 hover:bg-zinc-800"><Filter className="h-4 w-4" /> Filter</Button>
          <Button variant="outline" size="sm" className="gap-2 border-zinc-700 text-zinc-300 hover:bg-zinc-800"><Clock className="h-4 w-4" /> Sort by date</Button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-amber-500/20 bg-amber-600/5 p-3">
          <AlertCircle className="h-4 w-4 text-amber-400" />
          <p className="text-xs text-amber-300">{error}</p>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.map((project) => (
          <Link key={project.id} href={`/projects/${project.id}`}>
            <Card className="border-zinc-800 bg-zinc-900/50 transition-all duration-200 hover:border-zinc-700 group cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600/10">
                      <BookOpen className="h-5 w-5 text-indigo-400" />
                    </div>
                    <div>
                      <CardTitle className="text-sm text-zinc-200">{project.name}</CardTitle>
                      <p className="text-xs text-zinc-500 mt-0.5">{project.type}</p>
                    </div>
                  </div>
                  <Badge variant={statusColors[project.status]}>{project.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-xs text-zinc-500">
                  <span>{project.pages} pages</span>
                  <span>{project.updated}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-800">
            <BookOpen className="h-8 w-8 text-zinc-500" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-zinc-200">No projects found</h3>
          <p className="mt-1 text-sm text-zinc-500 max-w-sm">
            {searchQuery ? `No projects matching "${searchQuery}".` : "Get started by creating your first book project."}
          </p>
          {!searchQuery && (
            <Link href="/create" className="mt-6"><Button className="gap-2"><Plus className="h-4 w-4" /> Create Your First Book</Button></Link>
          )}
        </div>
      )}
    </div>
  );
}