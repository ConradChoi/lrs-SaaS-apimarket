importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
});

const messaging = firebase.messaging();

// 백그라운드 메시지 핸들러
messaging.onBackgroundMessage((payload) => {
  const { title, body, icon } = payload.notification;

  self.registration.showNotification(title, {
    body,
    icon,
    badge: '/notification-badge.png',
    data: payload.data,
  });
});

// 알림 클릭 핸들러
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.notification.data?.link) {
    event.waitUntil(
      clients.openWindow(event.notification.data.link)
    );
  }
}); 