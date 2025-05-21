import { UserProfile, ApiProduct, Subscription } from './index';

export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalSubscriptions: number;
  activeSubscriptions: number;
  totalApiProducts: number;
  activeApiProducts: number;
  monthlyRevenue: number;
  yearlyRevenue: number;
}

export interface UserManagementData extends UserProfile {
  lastLoginAt: string;
  subscriptionStatus: string;
  apiUsageCount: number;
}

export interface ApiManagementData {
  id: string;
  name: string;
  description: string;
  category: string;
  totalSubscribers: number;
  totalCalls: number;
  averageResponseTime: number;
  status: 'active' | 'inactive' | 'maintenance';
  pricing: {
    monthly: number;
    yearly: number;
  };
}

export interface SubscriptionManagementData extends Subscription {
  user: {
    id: string;
    name: string;
    email: string;
  };
  apiProducts: {
    id: string;
    name: string;
  }[];
  paymentHistory: {
    id: string;
    amount: number;
    status: string;
    date: string;
  }[];
}

export interface Settings {
  siteName: string;
  siteDescription: string;
  maintenanceMode: boolean;
  maxApiCalls: number;
  defaultSubscriptionPlan: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  securitySettings: {
    requireEmailVerification: boolean;
    requirePhoneVerification: boolean;
    twoFactorAuth: boolean;
  };
} 