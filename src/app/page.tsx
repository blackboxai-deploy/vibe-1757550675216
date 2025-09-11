"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl mx-auto flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded"></div>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Hostel Management
              <span className="block text-emerald-600">System</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A comprehensive solution for managing hostel operations, student bookings, 
              payments, and complaints with modern efficiency.
            </p>
          </div>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Student Card */}
          <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-emerald-200 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
                  <div className="w-4 h-4 bg-emerald-500 rounded-full"></div>
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">Student Portal</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-6 leading-relaxed">
                Browse available rooms, make bookings, track payments, 
                and submit complaints with ease.
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-center gap-2 text-sm text-emerald-700">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  Room Booking & Management
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-emerald-700">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  Payment Tracking
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-emerald-700">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  Complaint System
                </div>
              </div>
              <div className="space-y-3">
                <Link href="/login?role=student">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3">
                    Student Login
                  </Button>
                </Link>
                <Link href="/register?role=student">
                  <Button variant="outline" className="w-full border-emerald-300 text-emerald-700 hover:bg-emerald-50 font-semibold py-3">
                    Register as Student
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Admin Card */}
          <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-emerald-200 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
                  <div className="w-4 h-4 bg-emerald-600 rounded-sm"></div>
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">Admin Panel</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-6 leading-relaxed">
                Comprehensive control over student management, room assignments, 
                payments, and system administration.
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-center gap-2 text-sm text-emerald-700">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                  Student & Room Management
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-emerald-700">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                  Payment Monitoring
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-emerald-700">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                  Analytics & Reports
                </div>
              </div>
              <div className="space-y-3">
                <Link href="/login?role=admin">
                  <Button className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-3">
                    Admin Login
                  </Button>
                </Link>
                <Link href="/register?role=admin">
                  <Button variant="outline" className="w-full border-emerald-400 text-emerald-800 hover:bg-emerald-50 font-semibold py-3">
                    Register as Admin
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Warden Card */}
          <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-emerald-200 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
                  <div className="w-4 h-4 bg-emerald-500 rounded"></div>
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">Warden Access</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-6 leading-relaxed">
                Handle student complaints, manage block assignments, 
                and maintain hostel discipline efficiently.
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-center gap-2 text-sm text-emerald-700">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  Complaint Management
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-emerald-700">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  Block Supervision
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-emerald-700">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  Student Communication
                </div>
              </div>
              <div className="space-y-3">
                <Link href="/login?role=warden">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3">
                    Warden Login
                  </Button>
                </Link>
                <Link href="/register?role=warden">
                  <Button variant="outline" className="w-full border-emerald-300 text-emerald-700 hover:bg-emerald-50 font-semibold py-3">
                    Register as Warden
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-emerald-100">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Why Choose Our System?
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <div className="w-6 h-6 bg-emerald-600 rounded-md"></div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Real-time Updates</h3>
              <p className="text-sm text-gray-600">Instant notifications and live status updates</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <div className="w-6 h-6 bg-emerald-600 rounded-lg"></div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Secure & Reliable</h3>
              <p className="text-sm text-gray-600">Advanced security measures and data protection</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <div className="w-6 h-6 bg-emerald-600 rounded-full"></div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Easy to Use</h3>
              <p className="text-sm text-gray-600">Intuitive interface designed for all users</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <div className="w-6 h-6 bg-emerald-600 rounded"></div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-sm text-gray-600">Round-the-clock assistance and maintenance</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-600">
          <p>&copy; 2024 Hostel Management System. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}