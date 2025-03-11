import React from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';

export function Sidebar() {
  const { user } = useAuthStore();

  return (
    <aside className="w-64 bg-gray-800 min-h-screen p-4">
      <div className="mb-8">
        <h2 className="text-white text-lg font-semibold mb-4">导航菜单</h2>
        <nav className="space-y-2">
          <Link
            href="/dashboard"
            className="block text-gray-300 hover:text-white py-2 px-4 rounded hover:bg-gray-700"
          >
            仪表盘
          </Link>
          <Link
            href="/posts"
            className="block text-gray-300 hover:text-white py-2 px-4 rounded hover:bg-gray-700"
          >
            文章管理
          </Link>
          {user?.role === 'admin' && (
            <Link
              href="/users"
              className="block text-gray-300 hover:text-white py-2 px-4 rounded hover:bg-gray-700"
            >
              用户管理
            </Link>
          )}
          <Link
            href="/settings"
            className="block text-gray-300 hover:text-white py-2 px-4 rounded hover:bg-gray-700"
          >
            设置
          </Link>
        </nav>
      </div>
      
      <div className="pt-4 border-t border-gray-600">
        <div className="text-gray-400 text-sm">
          {user ? (
            <div>
              <p>当前用户：{user.username}</p>
              <p className="text-xs">角色：{user.role}</p>
            </div>
          ) : (
            <p>未登录</p>
          )}
        </div>
      </div>
    </aside>
  );
}