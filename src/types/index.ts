// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: string;
  phone?: string;
  company?: string;
  createdAt: string;
  subscription?: {
    plan: string;
    status: string;
    nextBillingDate?: string;
  };
}

// Subscription Types
export type SubscriptionPlan = 'basic' | 'standard' | 'professional' | 'on-premise';

export interface Subscription {
  id: string;
  userId: string;
  plan: string;
  status: 'active' | 'inactive' | 'cancelled';
  startDate: string;
  endDate: string;
  price: number;
  billingCycle: 'monthly' | 'yearly';
}

// API Types
export interface ApiProduct {
  id: string;
  name: string;
  description: string;
  category: string;
  endpoints: {
    path: string;
    method: string;
    description: string;
  }[];
  pricing: {
    plan: string;
    price: number;
    features: string[];
  }[];
}

export interface ApiEndpoint {
  id: string;
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  description: string;
  parameters: ApiParameter[];
}

export interface ApiParameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

export interface ApiPricing {
  plan: SubscriptionPlan;
  price: number;
  quota: number;
}

// Payment Types
export interface PaymentMethod {
  id: string;
  userId: string;
  type: 'card';
  last4: string;
  brand: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
}

export interface Payment {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  type: 'subscription' | 'api_usage';
  createdAt: string;
}

// Board Types
export interface Notice {
  id: string;
  title: string;
  content: string;
  isImportant: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface SupportTicket {
  id: string;
  userId: string;
  title: string;
  content: string;
  status: 'open' | 'in-progress' | 'closed';
  createdAt: string;
  updatedAt: string;
  responses: SupportResponse[];
}

export interface SupportResponse {
  id: string;
  ticketId: string;
  userId: string;
  content: string;
  isAdmin: boolean;
  createdAt: string;
}

// Statistics Types
export interface ApiUsage {
  apiId: string;
  userId: string;
  endpoint: string;
  method: string;
  status: number;
  timestamp: string;
  responseTime: number;
}

export interface UserStatistics {
  userId: string;
  period: string;
  apiCalls: number;
  totalCost: number;
  mostUsedApis: {
    apiId: string;
    calls: number;
  }[];
} 