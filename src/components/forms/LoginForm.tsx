import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { useAuthStore } from '@/store/authStore';
import { authApi } from '@/lib/api';

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await authApi.login(formData);
      login(response.user, response.token);
      router.push('/dashboard');
    } catch (err) {
      setError('登录失败，请检查用户名和密码');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="用户名"
        name="username"
        type="text"
        value={formData.username}
        onChange={handleChange}
        required
        fullWidth
      />
      <Input
        label="密码"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
        fullWidth
      />
      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {isLoading ? '登录中...' : '登录'}
      </button>
    </form>
  );
}