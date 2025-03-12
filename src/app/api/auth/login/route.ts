import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// POST /api/auth/login
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // 这里应该添加实际的用户验证逻辑
    // 示例中使用简单的验证
    if (username === 'admin' && password === 'admin') {
      // 设置会话cookie
      cookies().set('auth_token', 'sample_token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/'
      });

      return NextResponse.json({
        success: true,
        user: { id: 1, username: 'admin' }
      });
    }

    return NextResponse.json(
      { error: '用户名或密码错误' },
      { status: 401 }
    );
  } catch (error) {
    console.error('登录失败:', error);
    return NextResponse.json(
      { error: '登录失败' },
      { status: 500 }
    );
  }
}