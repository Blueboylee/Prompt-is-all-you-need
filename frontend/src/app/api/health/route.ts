import { NextResponse } from 'next/server';

/**
 * 健康检查API
 * GET /api/health
 */
export async function GET() {
  return NextResponse.json({ 
    status: 'ok',
    timestamp: new Date().toISOString() 
  });
}