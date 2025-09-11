"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface WardenDashboardData {
  wardenInfo: {
    name: string;
    wardenId: string;
    assignedBlocks: string[];
    shiftTiming: string;
  };
  complaints: {
    pending: number;
    inProgress: number;
    resolved: number;
    urgent: number;
  };
  students: {
    total: number;
    activeInBlocks: number;
  };
  recentComplaints: Array<{
    id: string;
    studentName: string;
    roomNumber: string;
    category: string;
    priority: string;
    title: string;
    submissionDate: string;
  }>;
}

export default function WardenDashboard() {
  const [dashboardData, setDashboardData] = useState<WardenDashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - in real implementation, fetch from API
    const mockData: WardenDashboardData = {
      wardenInfo: {
        name: 'Warden Smith',
        wardenId: 'WAR001',
        assignedBlocks: ['Block A', 'Block B'],
        shiftTiming: 'Evening (2 PM - 10 PM)'
      },
      complaints: {
        pending: 3,
        inProgress: 2,
        resolved: 15,
        urgent: 1
      },
      students: {
        total: 85,
        activeInBlocks: 78
      },
      recentComplaints: [
        {
          id: 'CMP001',
          studentName: 'John Smith',
          roomNumber: 'A102',
          category: 'maintenance',
          priority: 'high',
          title: 'Air conditioning not working',
          submissionDate: '2024-01-10T14:30:00Z'
        },
        {
          id: 'CMP002',
          studentName: 'Sarah Johnson',
          roomNumber: 'B205',
          category: 'cleanliness',
          priority: 'medium',
          title: 'Bathroom cleaning issue',
          submissionDate: '2024-01-10T10:15:00Z'
        },
        {
          id: 'CMP003',
          studentName: 'Mike Wilson',
          roomNumber: 'A301',
          category: 'noise',
          priority: 'low',
          title: 'Noise complaint from neighboring room',
          submissionDate: '2024-01-09T22:00:00Z'
        }
      ]
    };

    setTimeout(() => {
      setDashboardData(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-3">
                <div className="w-20 h-4 bg-gray-200 rounded"></div>
              </CardHeader>
              <CardContent>
                <div className="w-16 h-8 bg-gray-300 rounded mb-2"></div>
                <div className="w-24 h-3 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-700 bg-red-100';
      case 'high': return 'text-orange-700 bg-orange-100';
      case 'medium': return 'text-yellow-700 bg-yellow-100';
      case 'low': return 'text-green-700 bg-green-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'maintenance': return '🔧';
      case 'cleanliness': return '🧹';
      case 'noise': return '🔊';
      case 'facility': return '🏢';
      case 'security': return '🔒';
      default: return '📝';
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-700 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Welcome, {dashboardData?.wardenInfo.name}!</h2>
            <p className="text-emerald-100 text-lg mb-4">
              {dashboardData?.wardenInfo.wardenId} • {dashboardData?.wardenInfo.shiftTiming}
            </p>
            <div className="flex items-center space-x-2">
              {dashboardData?.wardenInfo.assignedBlocks.map((block, index) => (
                <div key={index} className="bg-white/20 rounded-lg px-3 py-1">
                  <span className="text-sm font-medium">{block}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden md:block">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                <div className="w-8 h-8 bg-emerald-500 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Pending Complaints */}
        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-red-700">Pending Complaints</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-900">{dashboardData?.complaints.pending}</div>
            <p className="text-xs text-red-600 mt-1">Require attention</p>
          </CardContent>
        </Card>

        {/* In Progress */}
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-orange-700">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">{dashboardData?.complaints.inProgress}</div>
            <p className="text-xs text-orange-600 mt-1">Being resolved</p>
          </CardContent>
        </Card>

        {/* Resolved */}
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-green-700">Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{dashboardData?.complaints.resolved}</div>
            <p className="text-xs text-green-600 mt-1">This month</p>
          </CardContent>
        </Card>

        {/* Students in Blocks */}
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-blue-700">Students in Blocks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{dashboardData?.students.activeInBlocks}</div>
            <p className="text-xs text-blue-600 mt-1">Active residents</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Complaints */}
        <Card className="lg:col-span-2 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
              📝 Recent Complaints
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData?.recentComplaints.map((complaint) => (
                <div key={complaint.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{getCategoryIcon(complaint.category)}</span>
                      <div>
                        <h4 className="font-semibold text-gray-900">{complaint.title}</h4>
                        <p className="text-sm text-gray-600">
                          {complaint.studentName} • Room {complaint.roomNumber}
                        </p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(complaint.priority)}`}>
                      {complaint.priority.charAt(0).toUpperCase() + complaint.priority.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500">
                      Submitted: {new Date(complaint.submissionDate).toLocaleString()}
                    </p>
                    <Button size="sm" variant="outline" className="text-emerald-600 border-emerald-300 hover:bg-emerald-50">
                      Respond
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link href="/warden/complaints">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  View All Complaints
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions & Stats */}
        <div className="space-y-6">
          {/* Priority Alerts */}
          {dashboardData?.complaints.urgent && dashboardData.complaints.urgent > 0 && (
            <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center">
                  ⚠️ Urgent Attention
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">{dashboardData.complaints.urgent}</div>
                <p className="text-red-100 mb-4">Urgent complaints require immediate action</p>
                <Link href="/warden/complaints?filter=urgent">
                  <Button variant="outline" className="bg-white text-red-600 hover:bg-red-50">
                    Handle Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {/* Block Overview */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-900">Block Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData?.wardenInfo.assignedBlocks.map((block, index) => (
                  <div key={index} className="bg-emerald-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-emerald-900">{block}</span>
                      <span className="text-sm text-emerald-600">Active</span>
                    </div>
                    <div className="text-sm text-emerald-700">
                      {Math.floor(dashboardData.students.activeInBlocks / dashboardData.wardenInfo.assignedBlocks.length)} students
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-900">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Link href="/warden/complaints">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                    Manage Complaints
                  </Button>
                </Link>
                <Link href="/warden/students">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    View Students
                  </Button>
                </Link>
                <Link href="/warden/blocks">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                    Block Details
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}