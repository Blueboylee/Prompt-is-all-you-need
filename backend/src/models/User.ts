// 用户模型定义
export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

// 创建用户时的数据结构
export interface CreateUserDTO {
  username: string;
  email: string;
  password: string;
}

// 更新用户时的数据结构
export interface UpdateUserDTO {
  username?: string;
  email?: string;
  password?: string;
}