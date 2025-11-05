"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';

// Mock data for demonstration
const mockUsers = [
  { id: 'usr_1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', joined: '2025-01-15' },
  { id: 'usr_2', name: 'Bob Williams', email: 'bob@example.com', role: 'Club Leader', joined: '2025-02-20' },
  { id: 'usr_3', name: 'Charlie Brown', email: 'charlie@example.com', role: 'Student', joined: '2025-03-10' },
  { id: 'usr_4', name: 'Diana Miller', email: 'diana@example.com', role: 'Student', joined: '2025-08-05' },
  { id: 'usr_5', name: 'Ethan Davis', email: 'ethan@example.com', role: 'Club Leader', joined: '2025-09-01' },
];

const mockClubs = [
  { id: 'club_1', name: 'AI & Robotics Club', leader: 'Ethan Davis', members: 75, status: 'Active' },
  { id: 'club_2', name: 'Debate Club', leader: 'Bob Williams', members: 42, status: 'Active' },
  { id: 'club_3', name: 'Creative Writing Guild', leader: 'Grace Lee', members: 28, status: 'Pending' },
  { id: 'club_4', name: 'Photography Club', leader: 'Frank White', members: 55, status: 'Active' },
];

const userGrowthData = [
    { month: 'Aug', users: 25 },
    { month: 'Sep', users: 150 },
    { month: 'Oct', users: 275 },
    { month: 'Nov', users: 310 },
];

const SiteAdminPage: React.FC = () => {
  const totalUsers = mockUsers.length;
  const totalClubs = mockClubs.length;
  const pendingClubs = mockClubs.filter(club => club.status === 'Pending').length;

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Site Administration</h1>
        <p className="text-muted-foreground">Welcome, Admin</p>
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <span className="hover:text-foreground cursor-pointer">Home</span>
        <span>/</span>
        <span className="text-foreground">Site Dashboard</span>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-muted-foreground"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground">+25 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Clubs</CardTitle>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-muted-foreground"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClubs}</div>
            <p className="text-xs text-muted-foreground">+2 since last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-muted-foreground"><path d="M12 2v10" /><path d="M18.4 6.6a9 9 0 1 1-12.77.04" /></svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingClubs}</div>
            <p className="text-xs text-muted-foreground">{pendingClubs} club waiting for review</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="clubs">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="clubs">Club Management</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="analytics">Site Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="clubs">
          <Card>
            <CardHeader>
              <CardTitle>All Clubs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50">
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Club Name</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Leader</th>
                      <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Members</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground"><span className="sr-only">Actions</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockClubs.map((club) => (
                      <tr key={club.id} className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-4 align-middle font-medium">{club.name}</td>
                        <td className="p-4 align-middle">
                          <Badge variant={club.status === 'Active' ? 'default' : 'secondary'}>{club.status}</Badge>
                        </td>
                        <td className="p-4 align-middle">{club.leader}</td>
                        <td className="p-4 align-middle text-right">{club.members}</td>
                        <td className="p-4 align-middle">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button aria-haspopup="true" size="icon" variant="ghost">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              {club.status === 'Pending' && <DropdownMenuItem>Approve</DropdownMenuItem>}
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>All Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50">
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Role</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Email</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Joined</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground"><span className="sr-only">Actions</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockUsers.map((user) => (
                      <tr key={user.id} className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-4 align-middle font-medium">{user.name}</td>
                        <td className="p-4 align-middle">
                          <Badge variant={user.role === 'Admin' ? 'destructive' : 'outline'}>{user.role}</Badge>
                        </td>
                        <td className="p-4 align-middle">{user.email}</td>
                        <td className="p-4 align-middle">{user.joined}</td>
                        <td className="p-4 align-middle">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button aria-haspopup="true" size="icon" variant="ghost">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>Edit Role</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">Delete User</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics">
            <Card>
                <CardHeader>
                    <CardTitle>User Growth</CardTitle>
                </CardHeader>
                <CardContent className="h-[350px] w-full pt-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={userGrowthData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip cursor={{fill: 'hsl(var(--muted))'}} />
                            <Legend />
                            <Bar dataKey="users" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SiteAdminPage;