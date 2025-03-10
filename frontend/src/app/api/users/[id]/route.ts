import { NextRequest, NextResponse } from 'next/server';

// 引用模拟用户数据
// 在实际应用中，这里应该从数据库或外部API获取数据
const users = [
  { id: '1', name: '张三', email: 'zhangsan@example.com' },
  { id: '2', name: '李四', email: 'lisi@example.com' },
];

/**
 * 获取单个用户
 * GET /api/users/[id]
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = users.find(u => u.id === params.id);
  
  if (!user) {
    return NextResponse.json(
      { error: '用户不存在' },
      { status: 404 }
    );
  }
  
  return NextResponse.json(user);
}

/**
 * 更新用户
 * PUT /api/users/[id]
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const userIndex = users.findIndex(u => u.id === params.id);
    
    if (userIndex === -1) {
      return NextResponse.json(
        { error: '用户不存在' },
        { status: 404 }
      );
    }
    
    // 更新用户信息
    const updatedUser = {
      ...users[userIndex],
      ...body,
      id: params.id // 确保ID不变
    };
    
    users[userIndex] = updatedUser;
    
    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json(
      { error: '请求处理失败', details: error },
      { status: 500 }
    );
  }
}

/**
 * 删除用户
 * DELETE /api/users/[id]
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const userIndex = users.findIndex(u => u.id === params.id);
  
  if (userIndex === -1) {
    return NextResponse.json(
      { error: '用户不存在' },
      { status: 404 }
    );
  }
  
  // 删除用户
  users.splice(userIndex, 1);
  
  return NextResponse.json(
    { message: '用户已成功删除' },
    { status: 200 }
  );
}