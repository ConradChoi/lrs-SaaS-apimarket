import api from './api';
import { Subscription, Plan } from '../types/subscription';

export const subscriptionService = {
  async getPlans(): Promise<Plan[]> {
    const response = await api.get<Plan[]>('/subscriptions/plans');
    return response.data;
  },

  async getCurrentSubscription(): Promise<Subscription> {
    const response = await api.get<Subscription>('/subscriptions/current');
    return response.data;
  },

  async subscribe(planId: string, billingCycle: 'monthly' | 'yearly'): Promise<Subscription> {
    const response = await api.post<Subscription>('/subscriptions', {
      planId,
      billingCycle,
    });
    return response.data;
  },

  async cancelSubscription(): Promise<void> {
    await api.delete('/subscriptions/current');
  },

  async updateSubscription(planId: string): Promise<Subscription> {
    const response = await api.put<Subscription>('/subscriptions/current', {
      planId,
    });
    return response.data;
  },

  async getBillingHistory(): Promise<any[]> {
    const response = await api.get('/subscriptions/billing-history');
    return response.data;
  },
}; 