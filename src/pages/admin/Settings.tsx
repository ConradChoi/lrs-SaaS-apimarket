import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  CircularProgress,
} from '@mui/material';
import { adminService } from '../../services/adminService';
import { Settings as AdminSettings } from '../../types/admin';

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<AdminSettings>({
    siteName: '',
    siteDescription: '',
    maintenanceMode: false,
    maxApiCalls: 1000,
    defaultSubscriptionPlan: '',
    emailNotifications: true,
    pushNotifications: true,
    securitySettings: {
      requireEmailVerification: true,
      requirePhoneVerification: false,
      twoFactorAuth: false
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const response = await adminService.getSettings();
        setSettings(response);
      } catch (err) {
        setError('설정을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await adminService.updateSettings(settings);
      setSuccess('설정이 성공적으로 저장되었습니다.');
    } catch (err) {
      setError('설정 저장에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        시스템 설정
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="사이트 이름"
              value={settings.siteName}
              onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
              fullWidth
            />
            <TextField
              label="사이트 설명"
              value={settings.siteDescription}
              onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
              multiline
              rows={3}
              fullWidth
            />
            <TextField
              label="기본 구독 플랜"
              value={settings.defaultSubscriptionPlan}
              onChange={(e) => setSettings({ ...settings, defaultSubscriptionPlan: e.target.value })}
              fullWidth
            />
            <TextField
              label="최대 API 호출 수"
              type="number"
              value={settings.maxApiCalls}
              onChange={(e) => setSettings({ ...settings, maxApiCalls: Number(e.target.value) })}
              fullWidth
            />
            <FormControlLabel
              control={
                <Switch
                  checked={settings.maintenanceMode}
                  onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                />
              }
              label="유지보수 모드"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={settings.emailNotifications}
                  onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                />
              }
              label="이메일 알림"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={settings.pushNotifications}
                  onChange={(e) => setSettings({ ...settings, pushNotifications: e.target.checked })}
                />
              }
              label="푸시 알림"
            />
            <Typography variant="h6" gutterBottom>
              보안 설정
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.securitySettings.requireEmailVerification}
                  onChange={(e) => setSettings({
                    ...settings,
                    securitySettings: {
                      ...settings.securitySettings,
                      requireEmailVerification: e.target.checked
                    }
                  })}
                />
              }
              label="이메일 인증 필수"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={settings.securitySettings.requirePhoneVerification}
                  onChange={(e) => setSettings({
                    ...settings,
                    securitySettings: {
                      ...settings.securitySettings,
                      requirePhoneVerification: e.target.checked
                    }
                  })}
                />
              }
              label="전화번호 인증 필수"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={settings.securitySettings.twoFactorAuth}
                  onChange={(e) => setSettings({
                    ...settings,
                    securitySettings: {
                      ...settings.securitySettings,
                      twoFactorAuth: e.target.checked
                    }
                  })}
                />
              }
              label="2단계 인증"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              저장
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default Settings; 