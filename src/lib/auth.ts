import { User, AuthResponse } from '@/types';
import { getUserByEmail, createUser } from './data';

// Simple password hashing (in production, use bcrypt)
function hashPassword(password: string): string {
  // For demo purposes - in production use proper bcrypt hashing
  return Buffer.from(password).toString('base64');
}

function verifyPassword(password: string, hashedPassword: string): boolean {
  return hashPassword(password) === hashedPassword;
}

// Authentication functions
export async function authenticateUser(email: string, password: string, role: string): Promise<AuthResponse> {
  try {
    const user = await getUserByEmail(email);
    
    if (!user) {
      return {
        success: false,
        message: 'User not found'
      };
    }

    if (user.role !== role) {
      return {
        success: false,
        message: 'Invalid role for this user'
      };
    }

    if (!user.isActive) {
      return {
        success: false,
        message: 'Account is deactivated'
      };
    }

    if (!verifyPassword(password, user.password)) {
      return {
        success: false,
        message: 'Invalid password'
      };
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return {
      success: true,
      message: 'Login successful',
      user: userWithoutPassword as User,
      token: generateToken(user.id)
    };
  } catch (error) {
    return {
      success: false,
      message: 'Authentication failed'
    };
  }
}

export async function registerUser(userData: any): Promise<AuthResponse> {
  try {
    const existingUser = await getUserByEmail(userData.email);
    
    if (existingUser) {
      return {
        success: false,
        message: 'User with this email already exists'
      };
    }

    // Hash password
    const hashedPassword = hashPassword(userData.password);
    
    const newUser = await createUser({
      ...userData,
      password: hashedPassword
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser;

    return {
      success: true,
      message: 'Registration successful',
      user: userWithoutPassword as User,
      token: generateToken(newUser.id)
    };
  } catch (error) {
    return {
      success: false,
      message: 'Registration failed'
    };
  }
}

// Simple token generation (in production, use JWT)
function generateToken(userId: string): string {
  const payload = {
    userId,
    timestamp: Date.now()
  };
  return Buffer.from(JSON.stringify(payload)).toString('base64');
}

export function verifyToken(token: string): { userId: string } | null {
  try {
    const payload = JSON.parse(Buffer.from(token, 'base64').toString());
    
    // Check if token is not too old (24 hours)
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours
    if (Date.now() - payload.timestamp > maxAge) {
      return null;
    }
    
    return { userId: payload.userId };
  } catch {
    return null;
  }
}

// Session management utilities
export function setAuthCookie(token: string): string {
  const maxAge = 24 * 60 * 60; // 24 hours in seconds
  return `auth-token=${token}; HttpOnly; Path=/; Max-Age=${maxAge}; SameSite=Strict`;
}

export function clearAuthCookie(): string {
  return 'auth-token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict';
}

export function getAuthToken(request: Request): string | null {
  const cookieHeader = request.headers.get('Cookie');
  if (!cookieHeader) return null;
  
  const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);
  
  return cookies['auth-token'] || null;
}

// Role-based access control
export function hasPermission(userRole: string, requiredRole: string | string[]): boolean {
  if (Array.isArray(requiredRole)) {
    return requiredRole.includes(userRole);
  }
  
  if (userRole === 'admin') return true; // Admin has access to everything
  return userRole === requiredRole;
}

// User session validation
export async function validateSession(request: Request): Promise<User | null> {
  const token = getAuthToken(request);
  if (!token) return null;
  
  const decoded = verifyToken(token);
  if (!decoded) return null;
  
  const user = await import('./data').then(({ getUserById }) => getUserById(decoded.userId));
  if (!user || !user.isActive) return null;
  
  return user;
}