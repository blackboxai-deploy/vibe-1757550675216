// Core type definitions for Hostel Management System

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'warden' | 'student';
  contactNumber: string;
  dateJoined: string;
  isActive: boolean;
}

export interface Student extends User {
  role: 'student';
  studentId: string;
  course: string;
  year: string;
  roomNumber?: string;
  guardianName: string;
  guardianContact: string;
  address: string;
  emergencyContact: string;
}

export interface Admin extends User {
  role: 'admin';
  adminId: string;
  department: string;
  permissions: string[];
}

export interface Warden extends User {
  role: 'warden';
  wardenId: string;
  assignedBlocks: string[];
  shiftTiming: string;
}

export interface Room {
  id: string;
  roomNumber: string;
  block: string;
  floor: number;
  type: 'single' | 'double' | 'triple';
  capacity: number;
  currentOccupancy: number;
  monthlyRent: number;
  amenities: string[];
  status: 'available' | 'occupied' | 'maintenance' | 'reserved';
  images: string[];
  description: string;
  lastUpdated: string;
}

export interface Booking {
  id: string;
  studentId: string;
  roomId: string;
  studentName: string;
  roomNumber: string;
  checkInDate: string;
  checkOutDate?: string;
  status: 'active' | 'completed' | 'cancelled';
  bookingDate: string;
  monthlyRent: number;
  securityDeposit: number;
  totalAmount: number;
}

export interface Payment {
  id: string;
  studentId: string;
  bookingId: string;
  studentName: string;
  roomNumber: string;
  amount: number;
  paymentType: 'monthly_rent' | 'security_deposit' | 'maintenance' | 'fine';
  paymentMethod: 'cash' | 'card' | 'upi' | 'bank_transfer';
  paymentDate: string;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue' | 'partial';
  receiptNumber: string;
  remarks?: string;
  processedBy: string;
}

export interface Complaint {
  id: string;
  studentId: string;
  studentName: string;
  roomNumber: string;
  category: 'maintenance' | 'cleanliness' | 'noise' | 'facility' | 'security' | 'other';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'resolved' | 'closed';
  submissionDate: string;
  assignedTo?: string;
  response?: string;
  responseDate?: string;
  attachments?: string[];
  resolutionNotes?: string;
}

export interface DashboardStats {
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

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// Form interfaces for validation
export interface LoginFormData {
  email: string;
  password: string;
  role: 'admin' | 'warden' | 'student';
}

export interface StudentRegistrationData {
  name: string;
  email: string;
  password: string;
  contactNumber: string;
  studentId: string;
  course: string;
  year: string;
  guardianName: string;
  guardianContact: string;
  address: string;
  emergencyContact: string;
}

export interface AdminRegistrationData {
  name: string;
  email: string;
  password: string;
  contactNumber: string;
  adminId: string;
  department: string;
}

export interface WardenRegistrationData {
  name: string;
  email: string;
  password: string;
  contactNumber: string;
  wardenId: string;
  assignedBlocks: string[];
  shiftTiming: string;
}

export interface RoomFormData {
  roomNumber: string;
  block: string;
  floor: number;
  type: 'single' | 'double' | 'triple';
  capacity: number;
  monthlyRent: number;
  amenities: string[];
  description: string;
  images: string[];
}

export interface ComplaintFormData {
  category: 'maintenance' | 'cleanliness' | 'noise' | 'facility' | 'security' | 'other';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

export interface PaymentFormData {
  amount: number;
  paymentType: 'monthly_rent' | 'security_deposit' | 'maintenance' | 'fine';
  paymentMethod: 'cash' | 'card' | 'upi' | 'bank_transfer';
  remarks?: string;
}

// Utility types
export type UserRole = 'admin' | 'warden' | 'student';
export type RoomStatus = 'available' | 'occupied' | 'maintenance' | 'reserved';
export type BookingStatus = 'active' | 'completed' | 'cancelled';
export type PaymentStatus = 'paid' | 'pending' | 'overdue' | 'partial';
export type ComplaintStatus = 'pending' | 'in_progress' | 'resolved' | 'closed';
export type ComplaintPriority = 'low' | 'medium' | 'high' | 'urgent';