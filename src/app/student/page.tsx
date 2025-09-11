"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface StudentDashboardData {
  studentInfo: {
    name: string;
    studentId: string;
    course: string;
    year: string;
    roomNumber?: string;
    status: 'booked' | 'no_booking' | 'pending';
  };
  booking: {
    roomNumber?: string;
    monthlyRent?: number;
    checkInDate?: string;
    dueDate?: string;
  };
  payments: {
    totalPaid: number;
    pendingAmount: number;
    lastPayment?: string;
    nextDueDate?: string;
  };
  complaints: {
    active: number;
    resolved: number;
    recent?: string;
  };
}

export default function StudentDashboard() {
  const [dashboardData, setDashboardData] = useState<StudentDashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - in real implementation, fetch from API
    const mockData: StudentDashboardData = {
      studentInfo: {
        name: 'John Smith',
        studentId: 'STU001',
        course: 'Computer Science',
        year: '2nd Year',
        roomNumber: 'A102',
        status: 'booked'
      },
      booking: {
        roomNumber: 'A102',
        monthlyRent: 4000,
        checkInDate: '2024-01-15',
        dueDate: '2024-02-15'
      },
      payments: {
        totalPaid: 12000,
        pendingAmount: 4000,
        lastPayment: '2024-01-15',
        nextDueDate: '2024-02-15'
      },
      complaints: {
        active: 1,
        resolved: 2,
        recent: 'Wi-Fi connectivity issue'
      }
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

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Welcome, {dashboardData?.studentInfo.name}!</h2>
            <p className="text-emerald-100 text-lg mb-4">
              Student ID: {dashboardData?.studentInfo.studentId} • {dashboardData?.studentInfo.course}
            </p>
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 rounded-lg px-3 py-1">
                <span className="text-sm font-medium">{dashboardData?.studentInfo.year}</span>
              </div>
              {dashboardData?.studentInfo.roomNumber && (
                <div className="bg-white/20 rounded-lg px-3 py-1">
                  <span className="text-sm font-medium">Room {dashboardData.studentInfo.roomNumber}</span>
                </div>
              )}
            </div>
          </div>
          <div className="hidden md:block">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                <div className="w-8 h-8 bg-emerald-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Room Status */}
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-blue-700">Room Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">
              {dashboardData?.studentInfo.roomNumber || 'Not Booked'}
            </div>
            <p className="text-xs text-blue-600 mt-1">
              {dashboardData?.studentInfo.status === 'booked' ? 'Active booking' : 'No active booking'}
            </p>
          </CardContent>
        </Card>

        {/* Monthly Rent */}
        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-emerald-700">Monthly Rent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-900">
              ₹{dashboardData?.booking.monthlyRent?.toLocaleString() || '0'}
            </div>
            <p className="text-xs text-emerald-600 mt-1">Per month</p>
          </CardContent>
        </Card>

        {/* Pending Amount */}
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-orange-700">Pending Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">
              ₹{dashboardData?.payments.pendingAmount?.toLocaleString() || '0'}
            </div>
            <p className="text-xs text-orange-600 mt-1">Due soon</p>
          </CardContent>
        </Card>

        {/* Active Complaints */}
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-purple-700">Complaints</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">
              {dashboardData?.complaints.active || 0}
            </div>
            <p className="text-xs text-purple-600 mt-1">Active issues</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Current Booking */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
              🏠 Current Booking
            </CardTitle>
          </CardHeader>
          <CardContent>
            {dashboardData?.studentInfo.status === 'booked' ? (
              <div className="space-y-4">
                <div className="bg-emerald-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-emerald-700">Room Number</span>
                    <span className="text-lg font-bold text-emerald-900">
                      {dashboardData.booking.roomNumber}
                    </span>
                  </div>
                  <div className="text-sm text-emerald-600">
                    Monthly Rent: ₹{dashboardData.booking.monthlyRent?.toLocaleString()}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Check-in Date</div>
                    <div className="font-semibold text-gray-900">
                      {new Date(dashboardData.booking.checkInDate!).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Next Due Date</div>
                    <div className="font-semibold text-orange-600">
                      {new Date(dashboardData.booking.dueDate!).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <Link href="/student/booking">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                    View Booking Details
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🏠</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Active Booking</h3>
                <p className="text-gray-600 mb-4">Browse available rooms and make a booking</p>
                <Link href="/student/rooms">
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    Browse Rooms
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Payment Summary */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
              💳 Payment Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg p-6 text-white">
              <div className="text-2xl font-bold">₹{dashboardData?.payments.totalPaid.toLocaleString()}</div>
              <div className="text-emerald-100">Total Amount Paid</div>
            </div>
            {dashboardData?.payments.pendingAmount && dashboardData.payments.pendingAmount > 0 ? (
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6 text-white">
                <div className="text-2xl font-bold">₹{dashboardData.payments.pendingAmount.toLocaleString()}</div>
                <div className="text-orange-100">
                  Due by {new Date(dashboardData.payments.nextDueDate!).toLocaleDateString()}
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
                <div className="text-2xl font-bold">All Clear!</div>
                <div className="text-green-100">No pending payments</div>
              </div>
            )}
            <Link href="/student/payments">
              <Button variant="outline" className="w-full border-emerald-300 text-emerald-700 hover:bg-emerald-50">
                View Payment History
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Recent Complaints & Quick Actions */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Complaints */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
              📝 Complaints Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-red-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-red-700">{dashboardData?.complaints.active}</div>
                <div className="text-sm text-red-600">Active</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-700">{dashboardData?.complaints.resolved}</div>
                <div className="text-sm text-green-600">Resolved</div>
              </div>
            </div>
            {dashboardData?.complaints.recent && (
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <div className="text-sm font-medium text-gray-900 mb-1">Recent Issue:</div>
                <div className="text-sm text-gray-600">{dashboardData.complaints.recent}</div>
              </div>
            )}
            <Link href="/student/complaints">
              <Button variant="outline" className="w-full border-purple-300 text-purple-700 hover:bg-purple-50">
                Manage Complaints
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/student/rooms">
                <Button className="w-full h-20 bg-blue-600 hover:bg-blue-700 text-white flex flex-col items-center justify-center">
                  <span className="text-2xl mb-1">🏨</span>
                  <span className="text-sm">Browse Rooms</span>
                </Button>
              </Link>
              <Link href="/student/payments">
                <Button className="w-full h-20 bg-emerald-600 hover:bg-emerald-700 text-white flex flex-col items-center justify-center">
                  <span className="text-2xl mb-1">💳</span>
                  <span className="text-sm">Make Payment</span>
                </Button>
              </Link>
              <Link href="/student/complaints">
                <Button className="w-full h-20 bg-purple-600 hover:bg-purple-700 text-white flex flex-col items-center justify-center">
                  <span className="text-2xl mb-1">📝</span>
                  <span className="text-sm">File Complaint</span>
                </Button>
              </Link>
              <Link href="/student/profile">
                <Button className="w-full h-20 bg-orange-600 hover:bg-orange-700 text-white flex flex-col items-center justify-center">
                  <span className="text-2xl mb-1">👤</span>
                  <span className="text-sm">Update Profile</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}