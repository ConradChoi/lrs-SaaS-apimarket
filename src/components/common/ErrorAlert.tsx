import React from 'react';
import { Alert, AlertTitle, Snackbar } from '@mui/material';

interface ErrorAlertProps {
  error: string | null;
  onClose: () => void;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ error, onClose }) => {
  if (!error) return null;

  return (
    <Snackbar
      open={!!error}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        onClose={onClose}
        severity="error"
        variant="filled"
        sx={{ width: '100%' }}
      >
        <AlertTitle>오류</AlertTitle>
        {error}
      </Alert>
    </Snackbar>
  );
}; 