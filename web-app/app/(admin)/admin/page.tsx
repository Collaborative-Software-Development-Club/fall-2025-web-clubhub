//Placeholder for admin page content

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const AdminPage: React.FC = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Navigation Bar */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
      </div>

      {/* Breadcrumb Navigation */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <span className="hover:text-foreground cursor-pointer">Home</span>
        <span>/</span>
        <span className="hover:text-foreground cursor-pointer">Admin</span>
        <span>/</span>
        <span className="text-foreground">Dashboard</span>
      </div>

      {/* Content Area */}
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl">User Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Users:</span>
                <span className="text-2xl font-bold">1,234</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">New Today:</span>
                <span className="text-lg font-semibold text-green-600">+56</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl">Club Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Clubs:</span>
                <span className="text-2xl font-bold">87</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Pending Approvals:</span>
                <span className="text-lg font-semibold text-amber-600">5</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl">User Roles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-sm text-muted-foreground">Administrators:</span>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-sm text-muted-foreground">Club Leaders:</span>
                <span className="font-semibold">87</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Members:</span>
                <span className="font-semibold">1,135</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <p className="text-muted-foreground text-xs">2025-04-05 14:30</p>
                <p className="font-medium">Modified user permissions</p>
              </div>
              <div className="text-sm">
                <p className="text-muted-foreground text-xs">2025-04-05 14:20</p>
                <p className="font-medium">Approved new club registration</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
