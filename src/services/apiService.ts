import { api } from './api';
import { ApiProduct } from '../types/api';

export const apiService = {
  async getApiProducts(): Promise<ApiProduct[]> {
    const response = await api.get('/api/products');
    return response.data;
  },

  async getApiProduct(id: string): Promise<ApiProduct> {
    const response = await api.get(`/api/products/${id}`);
    return response.data;
  },

  async subscribeToApi(apiId: string): Promise<void> {
    await api.post(`/api/products/${apiId}/subscribe`);
  },

  async unsubscribeFromApi(apiId: string): Promise<void> {
    await api.post(`/api/products/${apiId}/unsubscribe`);
  },

  async getApiKey(apiId: string): Promise<string> {
    const response = await api.get(`/api/products/${apiId}/key`);
    return response.data.key;
  },

  async regenerateApiKey(apiId: string): Promise<string> {
    const response = await api.post(`/api/products/${apiId}/key/regenerate`);
    return response.data.key;
  },

  async getApiUsage(apiId: string) {
    const response = await api.get(`/api/products/${apiId}/usage`);
    return response.data;
  },
}; 