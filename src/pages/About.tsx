import React from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';

const About = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 10, mb: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        LXA 소개
      </Typography>
      
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" gutterBottom>
          우리의 비전
        </Typography>
        <Typography paragraph>
          LXA는 개발자들이 쉽고 빠르게 API를 찾고 사용할 수 있는 마켓플레이스를 제공합니다.
          우리는 API 생태계를 더욱 활성화하고, 개발자들의 생산성을 높이는 것을 목표로 합니다.
        </Typography>
      </Box>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            API 제공자
          </Typography>
          <Typography paragraph>
            - 안정적인 API 호스팅 환경 제공
            - 상세한 사용량 분석 및 모니터링
            - 쉬운 API 문서화 및 버전 관리
            - 안전한 결제 시스템
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            API 사용자
          </Typography>
          <Typography paragraph>
            - 다양한 API 카탈로그
            - 간편한 API 키 발급
            - 상세한 API 문서와 예제
            - 안정적인 서비스 품질
          </Typography>
        </Grid>
      </Grid>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" gutterBottom>
          기술 스택
        </Typography>
        <Typography paragraph>
          - 최신 웹 기술과 클라우드 인프라
          - 고성능 API 게이트웨이
          - 실시간 모니터링 시스템
          - 보안 및 인증 시스템
        </Typography>
      </Box>
    </Container>
  );
};

export default About; 