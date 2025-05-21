import { api } from './api';

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  link?: string;
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  inApp: boolean;
  types: {
    subscription: boolean;
    payment: boolean;
    api: boolean;
    system: boolean;
  };
}

export const notificationService = {
  async getNotifications(page: number = 1, limit: number = 10): Promise<{
    notifications: Notification[];
    total: number;
  }> {
    const response = await api.get('/notifications', {
      params: { page, limit },
    });
    return response.data;
  },

  async markAsRead(notificationId: string): Promise<void> {
    await api.put(`/notifications/${notificationId}/read`);
  },

  async markAllAsRead(): Promise<void> {
    await api.put('/notifications/read-all');
  },

  async deleteNotification(notificationId: string): Promise<void> {
    await api.delete(`/notifications/${notificationId}`);
  },

  async getPreferences(): Promise<NotificationPreferences> {
    const response = await api.get('/notifications/preferences');
    return response.data;
  },

  async updatePreferences(preferences: Partial<NotificationPreferences>): Promise<NotificationPreferences> {
    const response = await api.put('/notifications/preferences', preferences);
    return response.data;
  },

  async subscribeToPushNotifications(subscription: PushSubscription): Promise<void> {
    await api.post('/notifications/push/subscribe', {
      subscription: subscription.toJSON(),
    });
  },

  async unsubscribeFromPushNotifications(subscription: PushSubscription): Promise<void> {
    await api.post('/notifications/push/unsubscribe', {
      subscription: subscription.toJSON(),
    });
  },
}; 