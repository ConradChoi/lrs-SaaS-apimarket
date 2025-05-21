import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import notificationReducer from './features/notification/notificationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notification: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 