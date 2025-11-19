"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, ArrowUpDown, ChevronDown } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
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

  // Club Management State
  const [clubSearch, setClubSearch] = useState('');
  const [selectedClubs, setSelectedClubs] = useState<string[]>([]);
  const [clubSort, setClubSort] = useState<'name' | 'members' | 'status'>('name');

  // User Management State
  const [userSearch, setUserSearch] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [userSort, setUserSort] = useState<'name' | 'role' | 'joined'>('name');

  // Filter and sort clubs
  const filteredClubs = mockClubs
    .filter(club => club.name.toLowerCase().includes(clubSearch.toLowerCase()))
    .sort((a, b) => {
      if (clubSort === 'name') return a.name.localeCompare(b.name);
      if (clubSort === 'members') return b.members - a.members;
      if (clubSort === 'status') return a.status.localeCompare(b.status);
      return 0;
    });

  // Filter and sort users
  const filteredUsers = mockUsers
    .filter(user => 
      user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      user.email.toLowerCase().includes(userSearch.toLowerCase())
    )
    .sort((a, b) => {
      if (userSort === 'name') return a.name.localeCompare(b.name);
      if (userSort === 'role') return a.role.localeCompare(b.role);
      if (userSort === 'joined') return new Date(b.joined).getTime() - new Date(a.joined).getTime();
      return 0;
    });

  // Club selection handlers
  const toggleClubSelection = (clubId: string) => {
    setSelectedClubs(prev =>
      prev.includes(clubId) ? prev.filter(id => id !== clubId) : [...prev, clubId]
    );
  };

  const toggleAllClubs = () => {
    setSelectedClubs(prev =>
      prev.length === filteredClubs.length ? [] : filteredClubs.map(club => club.id)
    );
  };

  // User selection handlers
  const toggleUserSelection = (userId: string) => {
    setSelectedUsers(prev =>
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  const toggleAllUsers = () => {
    setSelectedUsers(prev =>
      prev.length === filteredUsers.length ? [] : filteredUsers.map(user => user.id)
    );
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Site Administration</h1>
        <p className="text-muted-foreground">Welcome, Admin</p>
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground cursor-pointer">Home</Link>
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
            <p className="text-xs text-muted-foreground">{pendingClubs} {pendingClubs === 1 ? "club" : "clubs"} waiting for review</p>
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
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>All Clubs</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedClubs.length > 0 && `${selectedClubs.length} selected`}
                </p>
              </div>
              <Input
                placeholder="Search clubs..."
                value={clubSearch}
                onChange={(e) => setClubSearch(e.target.value)}
                className="max-w-xs"
              />
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedClubs.length === filteredClubs.length && filteredClubs.length > 0}
                        onCheckedChange={toggleAllClubs}
                        aria-label="Select all"
                      />
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        onClick={() => setClubSort('name')}
                        className="h-8 gap-2"
                      >
                        Club Name
                        {clubSort === 'name' && <ArrowUpDown className="h-4 w-4" />}
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        onClick={() => setClubSort('status')}
                        className="h-8 gap-2"
                      >
                        Status
                        {clubSort === 'status' && <ArrowUpDown className="h-4 w-4" />}
                      </Button>
                    </TableHead>
                    <TableHead>Leader</TableHead>
                    <TableHead className="text-right">
                      <Button
                        variant="ghost"
                        onClick={() => setClubSort('members')}
                        className="h-8 gap-2 ml-auto"
                      >
                        Members
                        {clubSort === 'members' && <ArrowUpDown className="h-4 w-4" />}
                      </Button>
                    </TableHead>
                    <TableHead><span className="sr-only">Actions</span></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClubs.map((club) => (
                    <TableRow key={club.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedClubs.includes(club.id)}
                          onCheckedChange={() => toggleClubSelection(club.id)}
                          aria-label="Select row"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{club.name}</TableCell>
                      <TableCell>
                        <Badge variant={club.status === 'Active' ? 'default' : 'secondary'}>{club.status}</Badge>
                      </TableCell>
                      <TableCell>{club.leader}</TableCell>
                      <TableCell className="text-right">{club.members}</TableCell>
                      <TableCell>
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
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {filteredClubs.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No clubs found
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="users">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>All Users</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedUsers.length > 0 && `${selectedUsers.length} selected`}
                </p>
              </div>
              <Input
                placeholder="Search users..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="max-w-xs"
              />
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                        onCheckedChange={toggleAllUsers}
                        aria-label="Select all"
                      />
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        onClick={() => setUserSort('name')}
                        className="h-8 gap-2"
                      >
                        Name
                        {userSort === 'name' && <ArrowUpDown className="h-4 w-4" />}
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        onClick={() => setUserSort('role')}
                        className="h-8 gap-2"
                      >
                        Role
                        {userSort === 'role' && <ArrowUpDown className="h-4 w-4" />}
                      </Button>
                    </TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        onClick={() => setUserSort('joined')}
                        className="h-8 gap-2"
                      >
                        Joined
                        {userSort === 'joined' && <ArrowUpDown className="h-4 w-4" />}
                      </Button>
                    </TableHead>
                    <TableHead><span className="sr-only">Actions</span></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedUsers.includes(user.id)}
                          onCheckedChange={() => toggleUserSelection(user.id)}
                          aria-label="Select row"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>
                        <Badge variant={user.role === 'Admin' ? 'destructive' : 'outline'}>{user.role}</Badge>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.joined}</TableCell>
                      <TableCell>
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
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {filteredUsers.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No users found
                </div>
              )}
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