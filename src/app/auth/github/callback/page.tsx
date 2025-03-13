'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function GitHubCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useAuthStore();
  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setError('未获取到登录令牌');
      return;
    }
    const handleGitHubCallback = async () => {
      try {
        // 解析JWT令牌
        const tokenData = JSON.parse(atob(token.split('.')[1]));
        
        // 更新用户状态
        setUser({
          id: tokenData.userId,
          username: tokenData.username,
          role: tokenData.role,
        });
        
        // 登录成功后跳转到仪表板
        router.push('/');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'GitHub登录失败');
      }
    };

    handleGitHubCallback();
  }, [searchParams.get('token'), router, setUser]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-red-500 text-center">{error}</div>
          <button
            onClick={() => router.push('/login')}
            className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            返回登录页面
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center">处理GitHub登录中...</div>
      </div>
    </div>
  );
}