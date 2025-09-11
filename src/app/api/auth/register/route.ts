import { NextRequest, NextResponse } from 'next/server';
import { registerUser, setAuthCookie } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const userData = await request.json();

    // Validate required fields
    const { name, email, password, role, contactNumber } = userData;
    
    if (!name || !email || !password || !role || !contactNumber) {
      return NextResponse.json(
        { success: false, message: 'All required fields must be provided' },
        { status: 400 }
      );
    }

    // Role-specific validation
    if (role === 'student') {
      const { studentId, course, year, guardianName, guardianContact, address, emergencyContact } = userData;
      if (!studentId || !course || !year || !guardianName || !guardianContact || !address || !emergencyContact) {
        return NextResponse.json(
          { success: false, message: 'All student fields are required' },
          { status: 400 }
        );
      }
    } else if (role === 'admin') {
      const { adminId, department } = userData;
      if (!adminId || !department) {
        return NextResponse.json(
          { success: false, message: 'All admin fields are required' },
          { status: 400 }
        );
      }
    } else if (role === 'warden') {
      const { wardenId, assignedBlocks, shiftTiming } = userData;
      if (!wardenId || !assignedBlocks || !shiftTiming) {
        return NextResponse.json(
          { success: false, message: 'All warden fields are required' },
          { status: 400 }
        );
      }
    }

    const authResult = await registerUser(userData);

    if (authResult.success) {
      const response = NextResponse.json(authResult);
      
      if (authResult.token) {
        response.headers.set('Set-Cookie', setAuthCookie(authResult.token));
      }
      
      return response;
    } else {
      return NextResponse.json(authResult, { status: 400 });
    }
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}