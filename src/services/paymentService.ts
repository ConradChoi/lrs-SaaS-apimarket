import { api } from './api';

export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank';
  last4: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: 'succeeded' | 'processing' | 'requires_payment_method' | 'requires_confirmation' | 'requires_action' | 'canceled';
  clientSecret: string;
}

export const paymentService = {
  async getPaymentMethods(): Promise<PaymentMethod[]> {
    const response = await api.get('/payments/methods');
    return response.data;
  },

  async addPaymentMethod(paymentMethodId: string): Promise<PaymentMethod> {
    const response = await api.post('/payments/methods', { paymentMethodId });
    return response.data;
  },

  async removePaymentMethod(paymentMethodId: string): Promise<void> {
    await api.delete(`/payments/methods/${paymentMethodId}`);
  },

  async setDefaultPaymentMethod(paymentMethodId: string): Promise<void> {
    await api.post(`/payments/methods/${paymentMethodId}/default`);
  },

  async createPaymentIntent(amount: number, currency: string = 'KRW'): Promise<PaymentIntent> {
    const response = await api.post('/payments/intents', { amount, currency });
    return response.data;
  },

  async confirmPayment(paymentIntentId: string, paymentMethodId: string): Promise<PaymentIntent> {
    const response = await api.post(`/payments/intents/${paymentIntentId}/confirm`, {
      paymentMethodId,
    });
    return response.data;
  },

  async cancelPayment(paymentIntentId: string): Promise<void> {
    await api.post(`/payments/intents/${paymentIntentId}/cancel`);
  },

  async getPaymentHistory(page: number = 1, limit: number = 10) {
    const response = await api.get('/payments/history', {
      params: { page, limit },
    });
    return response.data;
  },
}; 