"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Search, Plus, Edit, Trash2, FileDown, Filter, Clock } from "lucide-react";
import Link from "next/link";

interface Project {
  id: string;
  name: string;
  type: string;
  status: "completed" | "generating" | "draft" | "review";
  pages: number;
  updated: string;
}

const projects: Project[] = [
  { id: "1", name: "Children's Coloring Book", type: "Coloring Book", status: "completed", pages: 32, updated: "2 hours ago" },
  { id: "2", name: "Fantasy Novel Vol. 1", type: "Fiction", status: "generating", pages: 240, updated: "1 hour ago" },
  { id: "3", name: "Recipe Collection", type: "Cookbook", status: "draft", pages: 64, updated: "1 day ago" },
  { id: "4", name: "Journal Template Pro", type: "Journal", status: "completed", pages: 200, updated: "3 days ago" },
  { id: "5", name: "Poetry Anthology", type: "Poetry", status: "review", pages: 48, updated: "5 days ago" },
  { id: "6", name: "Business Planner 2025", type: "Planner", status: "completed", pages: 120, updated: "1 week ago" },
  { id: "7", name: "Kids Activity Book", type: "Activity Book", status: "draft", pages: 80, updated: "1 week ago" },
  { id: "8", name: "Sci-Fi Short Stories", type: "Fiction", status: "review", pages: 160, updated: "2 weeks ago" },
];

const statusColors: Record<string, "success" | "warning" | "secondary" | "default"> = {
  completed: "success",
  generating: "warning",
  draft: "secondary",
  review: "default",
};

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100">My Projects</h1>
          <p className="mt-1 text-sm text-zinc-500">Manage and track all your book projects.</p>
        </div>
        <Link href="/create">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </Link>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <Input placeholder="Search projects..." className="pl-9 border-zinc-700 text-zinc-300 placeholder:text-zinc-500" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2 border-zinc-700 text-zinc-300 hover:bg-zinc-800">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="gap-2 border-zinc-700 text-zinc-300 hover:bg-zinc-800">
            <Clock className="h-4 w-4" />
            Sort by date
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="border-zinc-800 bg-zinc-900/50 transition-all duration-200 hover:border-zinc-700 group">
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
              <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {project.status === "completed" && (
                  <Button variant="secondary" size="sm" className="gap-1.5 h-8 text-xs flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300">
                    <FileDown className="h-3.5 w-3.5" />
                    Export
                  </Button>
                )}
                <Button variant="ghost" size="sm" className="gap-1.5 h-8 text-xs text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800">
                  <Edit className="h-3.5 w-3.5" />
                  Edit
                </Button>
                <Button variant="ghost" size="sm" className="gap-1.5 h-8 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10">
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-800">
            <BookOpen className="h-8 w-8 text-zinc-500" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-zinc-200">No projects found</h3>
          <p className="mt-1 text-sm text-zinc-500 max-w-sm">
            {searchQuery ? `No projects matching "${searchQuery}". Try a different search.` : "Get started by creating your first book project."}
          </p>
          {!searchQuery && (
            <Link href="/create" className="mt-6">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Create Your First Book
              </Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}