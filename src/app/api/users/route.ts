import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { usersSQL } from '@/db/schema';

// 获取所有用户
export async function GET() {
  try {
    const result = await db.query(usersSQL.findAll);
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error('获取用户失败:', error);
    return NextResponse.json({ error: '获取用户失败' }, { status: 500 });
  }
}

// 创建新用户
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password } = body;
    
    if (!name || !email || !password) {
      return NextResponse.json({ error: '缺少必要字段' }, { status: 400 });
    }
    
    const result = await db.query(usersSQL.create, [name, email, password]);
    const newUser = result.rows[0];
    
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('创建用户失败:', error);
    return NextResponse.json({ error: '创建用户失败' }, { status: 500 });
  }
}