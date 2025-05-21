import React, { createContext, useContext, useState, useCallback } from 'react';
import { LoadingOverlay } from '../components/common/LoadingOverlay';
import { ErrorAlert } from '../components/common/ErrorAlert';
import { SuccessAlert } from '../components/common/SuccessAlert';

interface NotificationContextType {
  showLoading: (message?: string) => void;
  hideLoading: () => void;
  showError: (message: string) => void;
  showSuccess: (message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState<string>();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const showLoading = useCallback((message?: string) => {
    setLoading(true);
    setLoadingMessage(message);
  }, []);

  const hideLoading = useCallback(() => {
    setLoading(false);
    setLoadingMessage(undefined);
  }, []);

  const showError = useCallback((message: string) => {
    setError(message);
  }, []);

  const showSuccess = useCallback((message: string) => {
    setSuccess(message);
  }, []);

  const handleErrorClose = useCallback(() => {
    setError(null);
  }, []);

  const handleSuccessClose = useCallback(() => {
    setSuccess(null);
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        showLoading,
        hideLoading,
        showError,
        showSuccess
      }}
    >
      {children}
      <LoadingOverlay open={loading} message={loadingMessage} />
      <ErrorAlert error={error} onClose={handleErrorClose} />
      <SuccessAlert message={success} onClose={handleSuccessClose} />
    </NotificationContext.Provider>
  );
}; 