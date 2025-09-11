import { NextRequest, NextResponse } from 'next/server';
import { authenticateUser, setAuthCookie } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password, role } = await request.json();

    if (!email || !password || !role) {
      return NextResponse.json(
        { success: false, message: 'Email, password, and role are required' },
        { status: 400 }
      );
    }

    const authResult = await authenticateUser(email, password, role);

    if (authResult.success) {
      const response = NextResponse.json(authResult);
      
      if (authResult.token) {
        response.headers.set('Set-Cookie', setAuthCookie(authResult.token));
      }
      
      return response;
    } else {
      return NextResponse.json(authResult, { status: 401 });
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}