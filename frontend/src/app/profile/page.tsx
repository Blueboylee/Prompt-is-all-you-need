'use client';

import { useState, useEffect } from 'react';
import { Paper, Avatar, Button, TextField, Alert, Skeleton } from '@mui/material';
import { Snackbar } from '@mui/material';

interface User {
  id: string;
  name: string;
  email: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<User | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // 获取用户信息
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // 这里暂时使用ID为1的用户数据
        const response = await fetch('/api/users/1');
        if (!response.ok) throw new Error('获取用户信息失败');
        const data = await response.json();
        setUser(data);
        setFormData(data);
      } catch (error) {
        console.error(error);
        setSnackbar({ open: true, message: '获取用户信息失败', severity: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // 处理表单提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/users/${user?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('更新用户信息失败');
      
      const updatedUser = await response.json();
      setUser(updatedUser);
      setIsEditing(false);
      setSnackbar({ open: true, message: '个人信息更新成功', severity: 'success' });
    } catch (error) {
      console.error(error);
      setSnackbar({ open: true, message: '更新失败，请重试', severity: 'error' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => prev ? {
      ...prev,
      [e.target.name]: e.target.value
    } : null);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Paper elevation={1} sx={{ p: 3 }}>
          <Skeleton variant="circular" width={64} height={64} />
          <Skeleton variant="text" sx={{ mt: 2 }} width="60%" />
          <Skeleton variant="text" width="40%" />
        </Paper>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Paper elevation={1} sx={{ p: 3 }}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">个人资料</h2>
          {!isEditing && (
            <Button variant="contained" onClick={() => setIsEditing(true)}>
              编辑资料
            </Button>
          )}
        </div>

        {!isEditing ? (
          <div className="flex items-start space-x-4">
            <Avatar sx={{ width: 64, height: 64 }}>{user?.name?.[0]}</Avatar>
            <div className="flex-1">
              <p className="text-lg font-medium">{user?.name}</p>
              <p className="text-gray-500">{user?.email}</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="姓名"
              name="name"
              value={formData?.name || ''}
              onChange={handleChange}
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="邮箱"
              name="email"
              type="email"
              value={formData?.email || ''}
              onChange={handleChange}
              required
              margin="normal"
            />
            <div className="flex justify-end space-x-2 mt-4">
              <Button onClick={() => setIsEditing(false)}>
                取消
              </Button>
              <Button variant="contained" type="submit">
                保存
              </Button>
            </div>
          </form>
        )}
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
      >
        <Alert
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          severity={snackbar.severity as 'success' | 'error'}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}