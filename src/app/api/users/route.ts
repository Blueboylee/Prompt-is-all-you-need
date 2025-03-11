import { NextResponse } from 'next/server';

// GET /api/users
export async function GET() {
  try {
    // 模拟用户数据
    const users = [
      { id: 1, name: 'User 1' },
      { id: 2, name: 'User 2' },
    ];
    
    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

// POST /api/users
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // 这里添加创建用户的逻辑
    const newUser = {
      id: Math.floor(Math.random() * 1000),
      ...body
    };
    
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}