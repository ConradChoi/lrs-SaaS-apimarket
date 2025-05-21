import React from 'react';
import { Box, Container, Typography, Button, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';

const HeroSection = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
}));

const LandingPage = () => {
  return (
    <Box>
      <HeroSection>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h1" gutterBottom>
                API 마켓플레이스
              </Typography>
              <Typography variant="h5" paragraph>
                다양한 API를 쉽고 빠르게 찾고 사용하세요.
                개발 시간을 단축하고 비즈니스를 성장시키세요.
              </Typography>
              <Button
                component={RouterLink}
                to="/signup"
                variant="contained"
                color="secondary"
                size="large"
                sx={{ mt: 2 }}
              >
                무료로 시작하기
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              {/* 여기에 히어로 이미지 추가 */}
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" align="center" gutterBottom>
          주요 기능
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={4}>
            <FeatureCard elevation={3}>
              <Typography variant="h5" component="h3" gutterBottom>
                다양한 API
              </Typography>
              <Typography>
                수많은 개발자들이 제공하는 다양한 API를 한 곳에서 찾아보세요.
              </Typography>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard elevation={3}>
              <Typography variant="h5" component="h3" gutterBottom>
                쉬운 통합
              </Typography>
              <Typography>
                간단한 API 키 발급으로 바로 사용할 수 있습니다.
                상세한 문서와 예제 코드를 제공합니다.
              </Typography>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard elevation={3}>
              <Typography variant="h5" component="h3" gutterBottom>
                안정적인 서비스
              </Typography>
              <Typography>
                99.9% 가용성을 보장하는 안정적인 서비스를 제공합니다.
                24/7 모니터링과 기술 지원을 제공합니다.
              </Typography>
            </FeatureCard>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LandingPage; 