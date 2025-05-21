export interface Plan {
  id: string;
  name: string;
  price: string;
  features: string[];
  duration: 'monthly' | 'yearly';
  isPopular?: boolean;
}

export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  status: 'active' | 'cancelled' | 'expired';
  startDate: string;
  endDate: string;
  autoRenew: boolean;
} 