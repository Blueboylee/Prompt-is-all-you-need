import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken';

// 不需要验证的路由
const publicPaths = [
  '/login',
  '/api/auth/login',
  '/api/auth/github',
  '/api/auth/github/callback',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log("pathname",pathname);

  // 检查是否是公开路由
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // 获取认证token
  const token = request.cookies.get('auth_token')?.value;
  console.log("token",token);

  if (!token) {
    // 如果是API请求，返回401状态码
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: '未授权访问' }, { status: 401 });
    }
    // 否则重定向到登录页面
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    // 验证token
    verify(token, process.env.JWT_SECRET!);
    return NextResponse.next();
  } catch (error) {
    // token无效
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'token无效' }, { status: 401 });
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

// 配置需要进行中间件处理的路由
export const config = {
  matcher: [
    '/',
    '/dashboard/:path*',
    '/settings/:path*',
    '/api/((?!auth/login|auth/github).*)'
  ],
};