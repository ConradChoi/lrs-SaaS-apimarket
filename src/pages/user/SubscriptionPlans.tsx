import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardActions, Button, Box } from '@mui/material';

const SubscriptionPlans: React.FC = () => {
  const plans = [
    {
      id: 1,
      name: '기본 플랜',
      price: '무료',
      features: ['일일 100회 API 호출', '기본 API 접근', '이메일 지원'],
    },
    {
      id: 2,
      name: '프로 플랜',
      price: '월 50,000원',
      features: ['일일 1,000회 API 호출', '모든 API 접근', '우선 지원', '고급 분석'],
    },
    {
      id: 3,
      name: '엔터프라이즈 플랜',
      price: '문의',
      features: ['무제한 API 호출', '모든 API 접근', '24/7 지원', '맞춤형 솔루션'],
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        구독 플랜
      </Typography>
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {plans.map((plan) => (
          <Grid item xs={12} md={4} key={plan.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  {plan.name}
                </Typography>
                <Typography variant="h4" color="primary" gutterBottom>
                  {plan.price}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {plan.features.map((feature, index) => (
                    <Typography key={index} variant="body1" sx={{ mb: 1 }}>
                      • {feature}
                    </Typography>
                  ))}
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mx: 2, mb: 2 }}
                >
                  구독하기
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SubscriptionPlans; 