import api from './api';
import { ApiProduct, ApiUsage } from '../types';

export const apiMarketplaceService = {
  async getProducts(): Promise<ApiProduct[]> {
    const response = await api.get<ApiProduct[]>('/api/products');
    return response.data;
  },

  async getProductById(id: string): Promise<ApiProduct> {
    const response = await api.get<ApiProduct>(`/api/products/${id}`);
    return response.data;
  },

  async getProductUsage(productId: string): Promise<ApiUsage> {
    const response = await api.get<ApiUsage>(`/api/products/${productId}/usage`);
    return response.data;
  },

  async subscribeToProduct(productId: string): Promise<void> {
    await api.post(`/api/products/${productId}/subscribe`);
  },

  async unsubscribeFromProduct(productId: string): Promise<void> {
    await api.delete(`/api/products/${productId}/subscribe`);
  },

  async getApiKey(productId: string): Promise<{ apiKey: string }> {
    const response = await api.get<{ apiKey: string }>(`/api/products/${productId}/key`);
    return response.data;
  },

  async regenerateApiKey(productId: string): Promise<{ apiKey: string }> {
    const response = await api.post<{ apiKey: string }>(`/api/products/${productId}/key/regenerate`);
    return response.data;
  },
}; 