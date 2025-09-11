"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface DashboardStats {
  totalStudents: number;
  totalRooms: number;
  occupancyRate: number;
  availableRooms: number;
  totalRevenue: number;
  pendingPayments: number;
  activeComplaints: number;
  resolvedComplaints: number;
  recentBookings: number;
  maintenanceRooms: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call - in real implementation, fetch from API
    const fetchStats = async () => {
      setLoading(true);
      // Mock data for now
      const mockStats: DashboardStats = {
        totalStudents: 150,
        totalRooms: 200,
        occupancyRate: 75,
        availableRooms: 50,
        totalRevenue: 450000,
        pendingPayments: 25000,
        activeComplaints: 8,
        resolvedComplaints: 45,
        recentBookings: 12,
        maintenanceRooms: 3
      };
      
      setTimeout(() => {
        setStats(mockStats);
        setLoading(false);
      }, 1000);
    };

    fetchStats();
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

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-700 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Welcome to Admin Dashboard</h2>
            <p className="text-emerald-100 text-lg">
              Monitor and manage your hostel operations efficiently
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Students */}
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-blue-700">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{stats?.totalStudents}</div>
            <p className="text-xs text-blue-600 mt-1">Registered students</p>
          </CardContent>
        </Card>

        {/* Occupancy Rate */}
        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-emerald-700">Occupancy Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-900">{stats?.occupancyRate}%</div>
            <p className="text-xs text-emerald-600 mt-1">Current occupancy</p>
          </CardContent>
        </Card>

        {/* Total Revenue */}
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-purple-700">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">₹{stats?.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-purple-600 mt-1">This month</p>
          </CardContent>
        </Card>

        {/* Active Complaints */}
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-orange-700">Active Complaints</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">{stats?.activeComplaints}</div>
            <p className="text-xs text-orange-600 mt-1">Pending resolution</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Stats */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Room Statistics */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
              🏠 Room Statistics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-emerald-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-emerald-700">{stats?.totalRooms}</div>
                <div className="text-sm text-emerald-600">Total Rooms</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-700">{stats?.availableRooms}</div>
                <div className="text-sm text-blue-600">Available</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-yellow-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-yellow-700">{stats?.maintenanceRooms}</div>
                <div className="text-sm text-yellow-600">Maintenance</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-700">{stats?.recentBookings}</div>
                <div className="text-sm text-green-600">Recent Bookings</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Overview */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
              💰 Payment Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg p-6 text-white">
              <div className="text-3xl font-bold">₹{stats?.totalRevenue.toLocaleString()}</div>
              <div className="text-emerald-100">Total Revenue Collected</div>
            </div>
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6 text-white">
              <div className="text-3xl font-bold">₹{stats?.pendingPayments.toLocaleString()}</div>
              <div className="text-orange-100">Pending Payments</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Complaint Summary */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
            📝 Complaint Management Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                <div>
                  <div className="text-2xl font-bold text-red-700">{stats?.activeComplaints}</div>
                  <div className="text-sm text-red-600">Active Complaints</div>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600">⚠️</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div>
                  <div className="text-2xl font-bold text-green-700">{stats?.resolvedComplaints}</div>
                  <div className="text-sm text-green-600">Resolved Complaints</div>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600">✅</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white h-12">
              Add New Room
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white h-12">
              View All Students
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white h-12">
              Payment Reports
            </Button>
            <Button className="bg-orange-600 hover:bg-orange-700 text-white h-12">
              Handle Complaints
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}