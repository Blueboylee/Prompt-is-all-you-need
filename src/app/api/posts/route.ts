import { NextResponse } from 'next/server';

interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
  createdAt: string;
}

// GET /api/posts
export async function GET() {
  try {
    // 模拟文章数据
    const posts: Post[] = [
      {
        id: 1,
        title: '示例文章1',
        content: '这是第一篇示例文章的内容',
        authorId: 1,
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        title: '示例文章2',
        content: '这是第二篇示例文章的内容',
        authorId: 2,
        createdAt: new Date().toISOString()
      }
    ];
    
    return NextResponse.json({ posts });
  } catch (error) {
    return NextResponse.json(
      { error: '获取文章列表失败' },
      { status: 500 }
    );
  }
}

// POST /api/posts
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const newPost: Post = {
      id: Math.floor(Math.random() * 1000),
      ...body,
      createdAt: new Date().toISOString()
    };
    
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: '创建文章失败' },
      { status: 500 }
    );
  }
}

// PUT /api/posts
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    
    // 这里添加更新文章的逻辑
    const updatedPost = {
      ...body,
      updatedAt: new Date().toISOString()
    };
    
    return NextResponse.json(updatedPost);
  } catch (error) {
    return NextResponse.json(
      { error: '更新文章失败' },
      { status: 500 }
    );
  }
}

// DELETE /api/posts
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: '文章ID不能为空' },
        { status: 400 }
      );
    }
    
    // 这里添加删除文章的逻辑
    return NextResponse.json(
      { message: '文章删除成功' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: '删除文章失败' },
      { status: 500 }
    );
  }
}