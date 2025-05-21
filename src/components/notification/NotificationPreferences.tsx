import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Switch,
  FormGroup,
  FormControlLabel,
  Divider,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import { notificationService, NotificationPreferences } from '../../services/notificationService';
import { usePushNotifications } from '../../hooks/usePushNotifications';

const NotificationPreferencesForm: React.FC = () => {
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    email: true,
    push: false,
    inApp: true,
    types: {
      subscription: true,
      payment: true,
      api: true,
      system: true,
    },
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    isSubscribed,
    isLoading: pushLoading,
    error: pushError,
    subscribe,
    unsubscribe
  } = usePushNotifications();

  useEffect(() => {
    fetchPreferences();
  }, []);

  const fetchPreferences = async () => {
    try {
      setLoading(true);
      const data = await notificationService.getPreferences();
      setPreferences(data);
    } catch (err) {
      setError('알림 설정을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setPreferences(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setPreferences(prev => ({
      ...prev,
      types: {
        ...prev.types,
        [name]: checked
      }
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      await notificationService.updatePreferences(preferences);
      setSuccess(true);
    } catch (err) {
      setError('알림 설정 저장에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  };

  const handlePushToggle = async () => {
    if (isSubscribed) {
      await unsubscribe();
    } else {
      await subscribe();
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        알림 설정
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          알림 설정이 저장되었습니다.
        </Alert>
      )}

      {pushError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {pushError}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            알림 수신 방법
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={preferences.email}
                  onChange={handleChange}
                  name="email"
                />
              }
              label="이메일 알림"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={isSubscribed}
                  onChange={handlePushToggle}
                  name="push"
                  disabled={pushLoading}
                />
              }
              label="푸시 알림"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={preferences.inApp}
                  onChange={handleChange}
                  name="inApp"
                />
              }
              label="앱 내 알림"
            />
          </FormGroup>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            알림 유형
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={preferences.types.subscription}
                  onChange={handleTypeChange}
                  name="subscription"
                />
              }
              label="구독 관련 알림"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={preferences.types.payment}
                  onChange={handleTypeChange}
                  name="payment"
                />
              }
              label="결제 관련 알림"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={preferences.types.api}
                  onChange={handleTypeChange}
                  name="api"
                />
              }
              label="API 사용 관련 알림"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={preferences.types.system}
                  onChange={handleTypeChange}
                  name="system"
                />
              }
              label="시스템 알림"
            />
          </FormGroup>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="submit"
            variant="contained"
            disabled={saving}
            startIcon={saving ? <CircularProgress size={20} /> : null}
          >
            {saving ? '저장 중...' : '저장'}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default NotificationPreferencesForm; 