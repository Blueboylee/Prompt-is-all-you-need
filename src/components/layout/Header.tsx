import React from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';

export function Header() {
  const { user, logout } = useAuthStore();

  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-gray-800">
          My App
        </Link>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-800">
                Dashboard
              </Link>
              <Link href="/settings" className="text-gray-600 hover:text-gray-800">
                Settings
              </Link>
              <button
                onClick={logout}
                className="text-red-600 hover:text-red-800"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}