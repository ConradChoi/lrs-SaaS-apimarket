import React from 'react';
import { Alert, AlertTitle, Snackbar } from '@mui/material';

interface SuccessAlertProps {
  message: string | null;
  onClose: () => void;
}

export const SuccessAlert: React.FC<SuccessAlertProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <Snackbar
      open={!!message}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        onClose={onClose}
        severity="success"
        variant="filled"
        sx={{ width: '100%' }}
      >
        <AlertTitle>성공</AlertTitle>
        {message}
      </Alert>
    </Snackbar>
  );
}; 