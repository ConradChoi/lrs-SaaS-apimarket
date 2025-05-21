import { useState } from 'react';
import { initializePushNotifications, unsubscribeFromPushNotifications } from '../services/firebase';

export const usePushNotifications = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subscribe = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await initializePushNotifications();
      setIsSubscribed(true);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '푸시 알림 구독에 실패했습니다.';
      setError(errorMessage);
      console.error('푸시 알림 구독 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const unsubscribe = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await unsubscribeFromPushNotifications();
      setIsSubscribed(false);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '푸시 알림 구독 해제에 실패했습니다.';
      setError(errorMessage);
      console.error('푸시 알림 구독 해제 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isSubscribed,
    isLoading,
    error,
    subscribe,
    unsubscribe
  };
}; 