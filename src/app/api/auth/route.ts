import { NextResponse } from 'next/server';

interface LoginBody {
  username: string;
  password: string;
}

// POST /api/auth/login
export async function POST(request: Request) {
  try {
    const body: LoginBody = await request.json();
    
    // 这里添加实际的用户认证逻辑
    if (body.username === 'admin' && body.password === 'password') {
      return NextResponse.json({
        token: 'mock_jwt_token',
        user: {
          id: 1,
          username: body.username,
          role: 'admin'
        }
      });
    }
    
    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}