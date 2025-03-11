export interface User {
  id: number;
  username: string;
  email?: string;
  role: 'admin' | 'user';
  createdAt: string;
  updatedAt: string;
}

export interface UserCreateInput {
  username: string;
  email: string;
  password: string;
}

export interface UserUpdateInput {
  username?: string;
  email?: string;
  password?: string;
}

export interface UserLoginInput {
  username: string;
  password: string;
}

export interface UserLoginResponse {
  user: User;
  token: string;
}