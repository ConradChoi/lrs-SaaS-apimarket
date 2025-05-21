import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';

interface Plan {
  name: string;
  price: string;
  priceValue: number;
  features: string[];
  popular: boolean;
}

const PlanCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[2],
  minHeight: 320,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

const PopularBadge = styled('div')(({ theme }) => ({
  background: theme.palette.primary.main,
  color: '#fff',
  borderRadius: '12px',
  padding: '2px 12px',
  fontSize: 12,
  fontWeight: 700,
  position: 'absolute',
  top: 16,
  right: 16,
}));

const plansData = {
  yearly: [
    {
      name: 'Basic',
      price: '무료',
      priceValue: 0,
      features: ['기본 API 호출 (월 1,000회)', '이메일 지원'],
      popular: false,
    },
    {
      name: 'Standard',
      price: '₩500,000/년',
      priceValue: 500000,
      features: ['API 호출 (월 10,000회)', '우선 지원', '통계 리포트'],
      popular: false,
    },
    {
      name: 'Professional',
      price: '₩1,500,000/년',
      priceValue: 1500000,
      features: ['API 호출 (월 50,000회)', '24/7 우선 지원', '전용 기술 지원 매니저'],
      popular: true,
    },
    {
      name: 'On-Premise',
      price: '문의',
      priceValue: 0,
      features: ['무제한 API 호출', '온프레미스 설치 지원', '전담 엔지니어'],
      popular: false,
    },
  ],
  monthly: [
    {
      name: 'Basic',
      price: '무료',
      priceValue: 0,
      features: ['기본 API 호출 (월 1,000회)', '이메일 지원'],
      popular: false,
    },
    {
      name: 'Standard',
      price: '₩50,000/월',
      priceValue: 50000,
      features: ['API 호출 (월 10,000회)', '우선 지원', '통계 리포트'],
      popular: false,
    },
    {
      name: 'Professional',
      price: '₩150,000/월',
      priceValue: 150000,
      features: ['API 호출 (월 50,000회)', '24/7 우선 지원', '전용 기술 지원 매니저'],
      popular: true,
    },
    {
      name: 'On-Premise',
      price: '문의',
      priceValue: 0,
      features: ['무제한 API 호출', '온프레미스 설치 지원', '전담 엔지니어'],
      popular: false,
    },
  ],
};

const faqs = [
  {
    q: 'Q. 요금제 변경은 언제든 가능한가요?',
    a: 'A. 네, 언제든 상위/하위 요금제로 변경하실 수 있습니다. 결제 주기에 따라 차액이 자동 정산됩니다.'
  },
  {
    q: 'Q. 무료 플랜에서 유료 플랜으로 전환 시 데이터는 유지되나요?',
    a: 'A. 네, 모든 데이터와 설정은 그대로 유지됩니다.'
  },
  {
    q: 'Q. On-Premise 플랜은 어떻게 신청하나요?',
    a: 'A. 문의 버튼을 통해 별도 상담 후 맞춤 견적을 안내해드립니다.'
  },
  {
    q: 'Q. 결제 수단은 어떤 것이 지원되나요?',
    a: 'A. 신용카드, 계좌이체, 무통장입금 등 다양한 결제 수단을 지원합니다.'
  },
  {
    q: 'Q. API 사용량이 초과되면 어떻게 되나요?',
    a: 'A. 초과 사용 시 추가 과금이 발생하며, 사전 알림을 드립니다.'
  },
];

const Plans: React.FC = () => {
  const [period, setPeriod] = useState<'yearly' | 'monthly'>('yearly');
  const plans = plansData[period];

  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>
        플랜 정책
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <ToggleButtonGroup
          value={period}
          exclusive
          onChange={(_, value) => value && setPeriod(value)}
          aria-label="period toggle"
        >
          <ToggleButton value="yearly">연 비용</ToggleButton>
          <ToggleButton value="monthly">월 비용</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Grid container spacing={4} justifyContent="center">
        {plans.map((plan) => (
          <Grid item xs={12} sm={6} md={3} key={plan.name}>
            <Box sx={{ position: 'relative' }}>
              {plan.popular && <PopularBadge>인기</PopularBadge>}
              <PlanCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom>{plan.name}</Typography>
                  <Typography variant="h4" color="primary" gutterBottom>{plan.price}</Typography>
                  <Divider sx={{ my: 2 }} />
                  <List>
                    {plan.features.map((feature, idx) => (
                      <ListItem key={idx}>
                        <ListItemText primary={feature} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
                <CardActions sx={{ mt: 'auto', justifyContent: 'center' }}>
                  {plan.priceValue === 0 ? (
                    <Button variant="outlined" color="primary" href="/signup">무료로 시작</Button>
                  ) : plan.name === 'On-Premise' ? (
                    <Button variant="contained" color="secondary" href="/contact">문의</Button>
                  ) : (
                    <Button variant="contained" color="primary" href="/signup">가입하기</Button>
                  )}
                </CardActions>
              </PlanCard>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 8 }}>
        <Typography variant="h5" gutterBottom>자주 묻는 질문(FAQ)</Typography>
        <List>
          {faqs.map((faq, idx) => (
            <React.Fragment key={idx}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={<Typography fontWeight={700}>{faq.q}</Typography>}
                  secondary={faq.a}
                />
              </ListItem>
              {idx < faqs.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default Plans; 