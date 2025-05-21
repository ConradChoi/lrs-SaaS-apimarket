import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  CardHeader,
  Divider,
} from '@mui/material';
import {
  People as PeopleIcon,
  Api as ApiIcon,
  AttachMoney as MoneyIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { adminService } from '../../services/adminService';
import { AdminStats } from '../../types/admin';

const Analytics: React.FC = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const data = await adminService.getStats();
      setStats(data);
    } catch (err) {
      setError('통계 데이터를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  if (!stats) {
    return null;
  }

  const StatCard: React.FC<{
    title: string;
    value: number;
    icon: React.ReactNode;
    suffix?: string;
  }> = ({ title, value, icon, suffix = '' }) => (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box sx={{ mr: 2 }}>{icon}</Box>
          <Typography variant="h6" color="textSecondary">
            {title}
          </Typography>
        </Box>
        <Typography variant="h4">
          {value.toLocaleString()}
          {suffix}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        통계 및 분석
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard
            title="총 사용자 수"
            value={stats.totalUsers}
            icon={<PeopleIcon color="primary" />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard
            title="활성 사용자 수"
            value={stats.activeUsers}
            icon={<PeopleIcon color="success" />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard
            title="총 구독 수"
            value={stats.totalSubscriptions}
            icon={<ApiIcon color="primary" />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard
            title="활성 구독 수"
            value={stats.activeSubscriptions}
            icon={<ApiIcon color="success" />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard
            title="총 API 제품 수"
            value={stats.totalApiProducts}
            icon={<TrendingUpIcon color="primary" />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard
            title="활성 API 제품 수"
            value={stats.activeApiProducts}
            icon={<TrendingUpIcon color="success" />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard
            title="월간 매출"
            value={stats.monthlyRevenue}
            icon={<MoneyIcon color="primary" />}
            suffix="원"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard
            title="연간 매출"
            value={stats.yearlyRevenue}
            icon={<MoneyIcon color="success" />}
            suffix="원"
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            주요 지표
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="textSecondary">
                사용자 활성화율
              </Typography>
              <Typography variant="h6">
                {((stats.activeUsers / stats.totalUsers) * 100).toFixed(1)}%
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="textSecondary">
                구독 활성화율
              </Typography>
              <Typography variant="h6">
                {((stats.activeSubscriptions / stats.totalSubscriptions) * 100).toFixed(1)}%
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="textSecondary">
                API 제품 활성화율
              </Typography>
              <Typography variant="h6">
                {((stats.activeApiProducts / stats.totalApiProducts) * 100).toFixed(1)}%
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
};

export default Analytics; 