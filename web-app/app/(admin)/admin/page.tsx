"use client"; // Required for Recharts and interactive components

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';

// Mock data imports
import clubs from '@/mock/clubs.json';
import { mockAttendance } from '@/mock/sample-attendance';

// Mock data for attendance graph over time
const attendanceHistory = [
  { name: 'Sept 5', attendees: 35 },
  { name: 'Sept 12', attendees: 42 },
  { name: 'Sept 19', attendees: 55 },
  { name: 'Sept 26', attendees: 51 },
  { name: 'Oct 3', attendees: 62 },
  { name: 'Oct 10', attendees: 58 },
  { name: 'Oct 17', attendees: 75 },
  { name: 'Oct 24', attendees: 72 },
  { name: 'Nov 1', attendees: 81 },
];

const ClubLeaderDashboardPage: React.FC = () => {
  // For demo purposes, let's assume the logged-in user is a leader of the first club
  const club = clubs[0];
  const clubLeaderName = club.Leaders["Primary Leader"];

  // Calculate stats from the most recent attendance mock data
  const presentAndLate = mockAttendance.filter(
    (student) => student.status === "present" || student.status === "late"
  );
  const recentAttendeesCount = presentAndLate.length;

  // Calculate average from historical data
  const totalAttendees = attendanceHistory.reduce((acc, curr) => acc + curr.attendees, 0);
  const averageAttendance = Math.round(totalAttendees / attendanceHistory.length);

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Navigation Bar */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{club["Club Name"]}</h1>
        <p className="text-muted-foreground">Welcome, {clubLeaderName}</p>
      </div>

      {/* Breadcrumb Navigation */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <span className="hover:text-foreground cursor-pointer">Home</span>
        <span>/</span>
        <span className="text-foreground">Club Dashboard</span>
      </div>

      {/* Content Area */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1 md:col-span-2 lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">Event Attendance</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button>View Attendance Graph</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                  <DialogTitle>Attendance Over Time</DialogTitle>
                </DialogHeader>
                <div className="h-[300px] w-full pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={attendanceHistory}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="attendees" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Most Recent Event: "Weekly Sync"</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">{recentAttendeesCount}</span>
                <span className="text-sm text-muted-foreground">attendees</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Average Attendance:</span>
              <span className="font-semibold">{averageAttendance}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClubLeaderDashboardPage;
