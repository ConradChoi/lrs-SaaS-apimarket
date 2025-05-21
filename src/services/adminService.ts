import api from './api';
import {
  AdminStats,
  UserManagementData,
  ApiManagementData,
  SubscriptionManagementData,
  Settings,
} from '../types/admin';

export const adminService = {
  // 통계 관련 API
  async getStats(): Promise<AdminStats> {
    const response = await api.get<AdminStats>('/admin/stats');
    return response.data;
  },

  // 사용자 관리 API
  async getUsers(page: number = 1, limit: number = 10): Promise<{ users: UserManagementData[]; total: number }> {
    const response = await api.get<{ users: UserManagementData[]; total: number }>('/admin/users', {
      params: { page, limit },
    });
    return response.data;
  },

  async updateUser(userId: string, data: Partial<UserManagementData>): Promise<UserManagementData> {
    const response = await api.put<UserManagementData>(`/admin/users/${userId}`, data);
    return response.data;
  },

  async deleteUser(userId: string): Promise<void> {
    await api.delete(`/admin/users/${userId}`);
  },

  // API 관리 API
  async getApiProducts(page: number = 1, limit: number = 10): Promise<{ products: ApiManagementData[]; total: number }> {
    const response = await api.get<{ products: ApiManagementData[]; total: number }>('/admin/api-products', {
      params: { page, limit },
    });
    return response.data;
  },

  async createApiProduct(data: Partial<ApiManagementData>): Promise<ApiManagementData> {
    const response = await api.post<ApiManagementData>('/admin/api-products', data);
    return response.data;
  },

  async updateApiProduct(productId: string, data: Partial<ApiManagementData>): Promise<ApiManagementData> {
    const response = await api.put<ApiManagementData>(`/admin/api-products/${productId}`, data);
    return response.data;
  },

  async deleteApiProduct(productId: string): Promise<void> {
    await api.delete(`/admin/api-products/${productId}`);
  },

  // 구독 관리 API
  async getSubscriptions(page: number = 1, limit: number = 10): Promise<{ subscriptions: SubscriptionManagementData[]; total: number }> {
    const response = await api.get<{ subscriptions: SubscriptionManagementData[]; total: number }>('/admin/subscriptions', {
      params: { page, limit },
    });
    return response.data;
  },

  async updateSubscription(subscriptionId: string, data: Partial<SubscriptionManagementData>): Promise<SubscriptionManagementData> {
    const response = await api.put<SubscriptionManagementData>(`/admin/subscriptions/${subscriptionId}`, data);
    return response.data;
  },

  async cancelSubscription(subscriptionId: string): Promise<void> {
    await api.delete(`/admin/subscriptions/${subscriptionId}`);
  },

  async updateSettings(settings: Settings): Promise<void> {
    await api.put('/admin/settings', settings);
  },

  async deleteSubscription(subscriptionId: string): Promise<void> {
    await api.delete(`/admin/subscriptions/${subscriptionId}`);
  },

  async createSubscription(subscriptionData: Partial<SubscriptionManagementData>): Promise<SubscriptionManagementData> {
    const response = await api.post<SubscriptionManagementData>('/admin/subscriptions', subscriptionData);
    return response.data;
  },

  async getSettings(): Promise<Settings> {
    const response = await api.get<Settings>('/admin/settings');
    return response.data;
  },
}; 