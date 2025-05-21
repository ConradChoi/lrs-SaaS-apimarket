import { api } from './api';
import { User } from '../hooks/useAuth';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'user' | 'admin';
}

export interface LoginResponse {
  user: UserProfile;
  token: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export const authService = {
  async login(email: string, password: string): Promise<User> {
    const response = await api.post<LoginResponse>('/auth/login', { email, password });
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return user;
  },

  async register(data: RegisterData): Promise<User> {
    await api.post('/auth/register', data);
    // 회원가입 후 자동 로그인
    return this.login(data.email, data.password);
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get<UserProfile>('/auth/me');
    return response.data;
  },

  async updateProfile(data: Partial<User>): Promise<User> {
    const response = await api.patch<UserProfile>('/auth/profile', data);
    return response.data;
  },

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await api.post('/auth/change-password', { currentPassword, newPassword });
  },

  async logout(): Promise<void> {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
  }
}; 