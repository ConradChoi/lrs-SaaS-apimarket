import { api } from './api';
import { UserProfile } from '../types/user';

export const userService = {
  async getProfile(): Promise<UserProfile> {
    const response = await api.get('/users/profile');
    return response.data;
  },

  async updateProfile(profile: Partial<UserProfile>): Promise<UserProfile> {
    const response = await api.put('/users/profile', profile);
    return response.data;
  },

  async getSubscription() {
    const response = await api.get('/users/subscription');
    return response.data;
  },

  async getApiUsage() {
    const response = await api.get('/users/api-usage');
    return response.data;
  },

  async getPaymentHistory() {
    const response = await api.get('/users/payment-history');
    return response.data;
  },

  async changePassword(currentPassword: string, newPassword: string) {
    const response = await api.put('/users/change-password', {
      currentPassword,
      newPassword,
    });
    return response.data;
  },

  async uploadAvatar(file: File) {
    const formData = new FormData();
    formData.append('avatar', file);
    const response = await api.post('/users/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
}; 