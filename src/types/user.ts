export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  department?: string;
  position?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Subscription {
  id: string;
  plan: string;
  status: 'active' | 'inactive' | 'cancelled';
  startDate: string;
  endDate: string;
  nextBillingDate?: string;
  features: string[];
  price: number;
}

export interface ApiUsage {
  monthlyCalls: number;
  monthlyLimit: number;
  totalCalls: number;
  lastCallDate?: string;
  apiProducts: {
    id: string;
    name: string;
    calls: number;
    limit: number;
  }[];
}

export interface Payment {
  id: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  description: string;
  subscriptionId: string;
} 