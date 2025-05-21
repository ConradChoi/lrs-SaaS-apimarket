import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';
import { notificationService } from './notificationService';

const firebaseConfig = {
  apiKey: "AIzaSyCyLWJiOhb1jHB3FzAMJSChvePu_2b42Ak",
  authDomain: "api-market-place-c8d27.firebaseapp.com",
  projectId: "api-market-place-c8d27",
  storageBucket: "api-market-place-c8d27.appspot.com",
  messagingSenderId: "332404227476",
  appId: "1:332404227476:web:ce81bc1eba72299950a381"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

export const initializePushNotifications = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: "BNLJOSzAU3YSyOSpYsX_COMvez2Cp31GjyN8dlFXw9OPLeonICBV8XLar7EnogmfKmyLlRKua1AWiDycHxzUNK8"
      });
      console.log('Firebase Cloud Messaging Token:', token);

      // 서버에 푸시 알림 구독 정보 전송
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: "BNLJOSzAU3YSyOSpYsX_COMvez2Cp31GjyN8dlFXw9OPLeonICBV8XLar7EnogmfKmyLlRKua1AWiDycHxzUNK8"
      });
      await notificationService.subscribeToPushNotifications(subscription);
    }
  } catch (error) {
    console.error('푸시 알림 초기화 실패:', error);
    throw error;
  }
};

export const unsubscribeFromPushNotifications = async () => {
  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    if (subscription) {
      await notificationService.unsubscribeFromPushNotifications(subscription);
      await subscription.unsubscribe();
    }
  } catch (error) {
    console.error('푸시 알림 구독 해제 실패:', error);
    throw error;
  }
};

export default app; 