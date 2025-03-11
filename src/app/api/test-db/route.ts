import { NextResponse } from 'next/server';
import { getAllTestDb, getTestDbById, insertTestDb, updateTestDb, deleteTestDb } from '@/lib/models/testDb';

// GET /api/test-db
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      const data = await getTestDbById(Number(id));
      if (!data) {
        return NextResponse.json({ error: '数据不存在' }, { status: 404 });
      }
      return NextResponse.json(data);
    }

    const data = await getAllTestDb();
    return NextResponse.json(data);
  } catch (error) {
    console.error('获取数据失败:', error);
    return NextResponse.json({ error: '获取数据失败' }, { status: 500 });
  }
}

// POST /api/test-db
export async function POST(request: Request) {
  try {

    const body = await request.json();
    const data = await insertTestDb(body);
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('创建数据失败:', error);
    return NextResponse.json({ error: '创建数据失败' }, { status: 500 });
  }
}

// PUT /api/test-db?id=xxx
export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: '缺少ID参数' }, { status: 400 });
    }

    const body = await request.json();
    const data = await updateTestDb(Number(id), body);

    if (!data) {
      return NextResponse.json({ error: '数据不存在' }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('更新数据失败:', error);
    return NextResponse.json({ error: '更新数据失败' }, { status: 500 });
  }
}

// DELETE /api/test-db?id=xxx
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: '缺少ID参数' }, { status: 400 });
    }

    const data = await deleteTestDb(Number(id));

    if (!data) {
      return NextResponse.json({ error: '数据不存在' }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('删除数据失败:', error);
    return NextResponse.json({ error: '删除数据失败' }, { status: 500 });
  }
}