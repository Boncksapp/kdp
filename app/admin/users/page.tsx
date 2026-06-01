"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Users, Mail, Calendar, BookOpen, MoreHorizontal } from "lucide-react";

const users = [
  { id: "1", name: "John Doe", email: "john@example.com", projects: 12, joined: "Jan 2024", plan: "Pro", status: "active" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", projects: 8, joined: "Feb 2024", plan: "Pro", status: "active" },
  { id: "3", name: "Bob Johnson", email: "bob@example.com", projects: 3, joined: "Mar 2024", plan: "Starter", status: "active" },
  { id: "4", name: "Alice Brown", email: "alice@example.com", projects: 24, joined: "Dec 2023", plan: "Agency", status: "active" },
  { id: "5", name: "Charlie Wilson", email: "charlie@example.com", projects: 0, joined: "May 2024", plan: "Starter", status: "inactive" },
];

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter(
    (u) => u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100">User Management</h1>
          <p className="mt-1 text-sm text-zinc-500">View and manage all platform users.</p>
        </div>
        <Badge variant="default" className="text-sm px-3 py-1">{users.length} total</Badge>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
        <Input
          placeholder="Search users..."
          className="pl-9 border-zinc-700 text-zinc-300 placeholder:text-zinc-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Card className="border-zinc-800 bg-zinc-900/50">
        <CardContent className="p-0">
          <div className="divide-y divide-zinc-800">
            {filteredUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-zinc-800/30">
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-indigo-600/20 text-indigo-400 text-sm">
                      {user.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-zinc-200">{user.name}</p>
                    <div className="flex items-center gap-3 text-xs text-zinc-500 mt-0.5">
                      <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {user.email}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {user.joined}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-zinc-200">{user.projects} projects</p>
                    <Badge variant={user.plan === "Agency" ? "default" : user.plan === "Pro" ? "success" : "secondary"} className="mt-1">
                      {user.plan}
                    </Badge>
                  </div>
                  <Badge variant={user.status === "active" ? "success" : "secondary"}>
                    {user.status}
                  </Badge>
                  <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-zinc-300">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}