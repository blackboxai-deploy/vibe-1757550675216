import { promises as fs } from 'fs';
import path from 'path';
import { User, Room, Booking, Payment, Complaint } from '@/types';

// Data file paths
const DATA_DIR = path.join(process.cwd(), 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const ROOMS_FILE = path.join(DATA_DIR, 'rooms.json');
const BOOKINGS_FILE = path.join(DATA_DIR, 'bookings.json');
const PAYMENTS_FILE = path.join(DATA_DIR, 'payments.json');
const COMPLAINTS_FILE = path.join(DATA_DIR, 'complaints.json');

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

// Generic file operations
async function readJSONFile<T>(filePath: string, defaultData: T[] = []): Promise<T[]> {
  try {
    await ensureDataDir();
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, create it with default data
    await writeJSONFile(filePath, defaultData);
    return defaultData;
  }
}

async function writeJSONFile<T>(filePath: string, data: T[]): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
}

// User operations
export async function getAllUsers(): Promise<User[]> {
  return readJSONFile<User>(USERS_FILE, []);
}

export async function getUserById(id: string): Promise<User | null> {
  const users = await getAllUsers();
  return users.find(user => user.id === id) || null;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const users = await getAllUsers();
  return users.find(user => user.email === email) || null;
}

export async function getUsersByRole(role: string): Promise<User[]> {
  const users = await getAllUsers();
  return users.filter(user => user.role === role);
}

export async function createUser(userData: User): Promise<User> {
  const users = await getAllUsers();
  const newUser = {
    ...userData,
    id: generateId(),
    dateJoined: new Date().toISOString(),
    isActive: true
  };
  users.push(newUser);
  await writeJSONFile(USERS_FILE, users);
  return newUser;
}

export async function updateUser(id: string, updates: Partial<User>): Promise<User | null> {
  const users = await getAllUsers();
  const index = users.findIndex(user => user.id === id);
  if (index === -1) return null;
  
  users[index] = { ...users[index], ...updates };
  await writeJSONFile(USERS_FILE, users);
  return users[index];
}

export async function deleteUser(id: string): Promise<boolean> {
  const users = await getAllUsers();
  const filteredUsers = users.filter(user => user.id !== id);
  if (filteredUsers.length === users.length) return false;
  
  await writeJSONFile(USERS_FILE, filteredUsers);
  return true;
}

// Room operations
export async function getAllRooms(): Promise<Room[]> {
  return readJSONFile<Room>(ROOMS_FILE, []);
}

export async function getRoomById(id: string): Promise<Room | null> {
  const rooms = await getAllRooms();
  return rooms.find(room => room.id === id) || null;
}

export async function getRoomByNumber(roomNumber: string): Promise<Room | null> {
  const rooms = await getAllRooms();
  return rooms.find(room => room.roomNumber === roomNumber) || null;
}

export async function getRoomsByStatus(status: string): Promise<Room[]> {
  const rooms = await getAllRooms();
  return rooms.filter(room => room.status === status);
}

export async function createRoom(roomData: Omit<Room, 'id' | 'lastUpdated'>): Promise<Room> {
  const rooms = await getAllRooms();
  const newRoom: Room = {
    ...roomData,
    id: generateId(),
    lastUpdated: new Date().toISOString()
  };
  rooms.push(newRoom);
  await writeJSONFile(ROOMS_FILE, rooms);
  return newRoom;
}

export async function updateRoom(id: string, updates: Partial<Room>): Promise<Room | null> {
  const rooms = await getAllRooms();
  const index = rooms.findIndex(room => room.id === id);
  if (index === -1) return null;
  
  rooms[index] = { ...rooms[index], ...updates, lastUpdated: new Date().toISOString() };
  await writeJSONFile(ROOMS_FILE, rooms);
  return rooms[index];
}

export async function deleteRoom(id: string): Promise<boolean> {
  const rooms = await getAllRooms();
  const filteredRooms = rooms.filter(room => room.id !== id);
  if (filteredRooms.length === rooms.length) return false;
  
  await writeJSONFile(ROOMS_FILE, filteredRooms);
  return true;
}

// Booking operations
export async function getAllBookings(): Promise<Booking[]> {
  return readJSONFile<Booking>(BOOKINGS_FILE, []);
}

export async function getBookingById(id: string): Promise<Booking | null> {
  const bookings = await getAllBookings();
  return bookings.find(booking => booking.id === id) || null;
}

export async function getBookingsByStudentId(studentId: string): Promise<Booking[]> {
  const bookings = await getAllBookings();
  return bookings.filter(booking => booking.studentId === studentId);
}

export async function getActiveBookingByStudentId(studentId: string): Promise<Booking | null> {
  const bookings = await getAllBookings();
  return bookings.find(booking => booking.studentId === studentId && booking.status === 'active') || null;
}

export async function createBooking(bookingData: Omit<Booking, 'id' | 'bookingDate'>): Promise<Booking> {
  const bookings = await getAllBookings();
  const newBooking: Booking = {
    ...bookingData,
    id: generateId(),
    bookingDate: new Date().toISOString()
  };
  bookings.push(newBooking);
  await writeJSONFile(BOOKINGS_FILE, bookings);
  return newBooking;
}

export async function updateBooking(id: string, updates: Partial<Booking>): Promise<Booking | null> {
  const bookings = await getAllBookings();
  const index = bookings.findIndex(booking => booking.id === id);
  if (index === -1) return null;
  
  bookings[index] = { ...bookings[index], ...updates };
  await writeJSONFile(BOOKINGS_FILE, bookings);
  return bookings[index];
}

// Payment operations
export async function getAllPayments(): Promise<Payment[]> {
  return readJSONFile<Payment>(PAYMENTS_FILE, []);
}

export async function getPaymentsByStudentId(studentId: string): Promise<Payment[]> {
  const payments = await getAllPayments();
  return payments.filter(payment => payment.studentId === studentId);
}

export async function getPaymentsByStatus(status: string): Promise<Payment[]> {
  const payments = await getAllPayments();
  return payments.filter(payment => payment.status === status);
}

export async function createPayment(paymentData: Omit<Payment, 'id' | 'receiptNumber'>): Promise<Payment> {
  const payments = await getAllPayments();
  const newPayment: Payment = {
    ...paymentData,
    id: generateId(),
    receiptNumber: generateReceiptNumber()
  };
  payments.push(newPayment);
  await writeJSONFile(PAYMENTS_FILE, payments);
  return newPayment;
}

export async function updatePayment(id: string, updates: Partial<Payment>): Promise<Payment | null> {
  const payments = await getAllPayments();
  const index = payments.findIndex(payment => payment.id === id);
  if (index === -1) return null;
  
  payments[index] = { ...payments[index], ...updates };
  await writeJSONFile(PAYMENTS_FILE, payments);
  return payments[index];
}

// Complaint operations
export async function getAllComplaints(): Promise<Complaint[]> {
  return readJSONFile<Complaint>(COMPLAINTS_FILE, []);
}

export async function getComplaintById(id: string): Promise<Complaint | null> {
  const complaints = await getAllComplaints();
  return complaints.find(complaint => complaint.id === id) || null;
}

export async function getComplaintsByStudentId(studentId: string): Promise<Complaint[]> {
  const complaints = await getAllComplaints();
  return complaints.filter(complaint => complaint.studentId === studentId);
}

export async function getComplaintsByStatus(status: string): Promise<Complaint[]> {
  const complaints = await getAllComplaints();
  return complaints.filter(complaint => complaint.status === status);
}

export async function createComplaint(complaintData: Omit<Complaint, 'id' | 'submissionDate' | 'status'>): Promise<Complaint> {
  const complaints = await getAllComplaints();
  const newComplaint: Complaint = {
    ...complaintData,
    id: generateId(),
    submissionDate: new Date().toISOString(),
    status: 'pending'
  };
  complaints.push(newComplaint);
  await writeJSONFile(COMPLAINTS_FILE, complaints);
  return newComplaint;
}

export async function updateComplaint(id: string, updates: Partial<Complaint>): Promise<Complaint | null> {
  const complaints = await getAllComplaints();
  const index = complaints.findIndex(complaint => complaint.id === id);
  if (index === -1) return null;
  
  if (updates.response && !complaints[index].responseDate) {
    updates.responseDate = new Date().toISOString();
  }
  
  complaints[index] = { ...complaints[index], ...updates };
  await writeJSONFile(COMPLAINTS_FILE, complaints);
  return complaints[index];
}

// Utility functions
function generateId(): string {
  return 'id_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

function generateReceiptNumber(): string {
  const prefix = 'RCP';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.random().toString(36).substr(2, 4).toUpperCase();
  return `${prefix}${timestamp}${random}`;
}

// Dashboard statistics
export async function getDashboardStats() {
  const [users, rooms, bookings, payments, complaints] = await Promise.all([
    getAllUsers(),
    getAllRooms(),
    getAllBookings(),
    getAllPayments(),
    getAllComplaints()
  ]);

  const students = users.filter(user => user.role === 'student');
  const activeBookings = bookings.filter(booking => booking.status === 'active');
  const availableRooms = rooms.filter(room => room.status === 'available');
  const occupiedRooms = rooms.filter(room => room.status === 'occupied');
  const pendingPayments = payments.filter(payment => payment.status === 'pending' || payment.status === 'overdue');
  const activeComplaints = complaints.filter(complaint => complaint.status !== 'resolved' && complaint.status !== 'closed');
  const resolvedComplaints = complaints.filter(complaint => complaint.status === 'resolved' || complaint.status === 'closed');

  const totalRevenue = payments
    .filter(payment => payment.status === 'paid')
    .reduce((sum, payment) => sum + payment.amount, 0);

  return {
    totalStudents: students.length,
    totalRooms: rooms.length,
    occupancyRate: rooms.length > 0 ? Math.round((occupiedRooms.length / rooms.length) * 100) : 0,
    availableRooms: availableRooms.length,
    totalRevenue,
    pendingPayments: pendingPayments.reduce((sum, payment) => sum + payment.amount, 0),
    activeComplaints: activeComplaints.length,
    resolvedComplaints: resolvedComplaints.length,
    recentBookings: activeBookings.length,
    maintenanceRooms: rooms.filter(room => room.status === 'maintenance').length
  };
}