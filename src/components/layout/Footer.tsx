import React from 'react';
import { Box, Container, Grid, Typography, Link, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  color: '#222',
  borderTop: '1px solid #eee',
  padding: theme.spacing(6, 0, 2, 0),
  fontFamily: 'Pretendard, sans-serif',
  fontSize: 16,
}));

const LogoBox = styled(Box)({
  height: 48,
  marginBottom: 16,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  background: '#f0f0f0',
  borderRadius: 8,
  width: 220,
  minHeight: 48,
  fontWeight: 700,
  fontSize: 20,
  color: '#888',
  paddingLeft: 16,
});

const SectionTitle = styled(Typography)({
  fontWeight: 700,
  fontSize: 24,
  marginBottom: 16,
  color: '#222',
});

const InfoText = styled(Typography)({
  color: '#555',
  fontSize: 18,
  marginBottom: 8,
});

const FooterLink = styled(Link)({
  color: '#555',
  textDecoration: 'none',
  fontSize: 18,
  display: 'block',
  marginBottom: 8,
  '&:hover': {
    textDecoration: 'underline',
    color: '#1976d2',
  },
});

const ContactBox = styled(Box)({
  background: '#f7f7fb',
  borderRadius: 16,
  padding: '20px 24px',
  marginBottom: 16,
  display: 'flex',
  alignItems: 'center',
  gap: 16,
});

const Footer = () => {
  return (
    <FooterContainer>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* 좌측: 로고/슬로건 */}
          <Grid item xs={12} md={4}>
            <LogoBox>인튜브 로고 영역</LogoBox>
            <Typography sx={{ color: '#555', fontSize: 20, fontWeight: 400 }}>
              데이터로 기업과 사람의 신뢰를 연결합니다.
            </Typography>
          </Grid>

          {/* 중앙: 회사 정보 */}
          <Grid item xs={12} md={4}>
            <SectionTitle>인튜브</SectionTitle>
            <InfoText>서울특별시 강남구 학동로33길 17, 2층</InfoText>
            <InfoText>사업자 번호 : 123-45-67890</InfoText>
            <InfoText>통신판매업 신고번호 : 2017-서울강남-0000</InfoText>
            <InfoText>대표이사: 이대현</InfoText>
            <InfoText>개인정보책임자: 홍길동</InfoText>
            <InfoText>서비스 상태: <span style={{color:'#22c55e', fontWeight:600}}>정상</span></InfoText>
          </Grid>

          {/* 우측: 약관/문의/연락처 */}
          <Grid item xs={12} md={4}>
            <SectionTitle>약관 및 조건</SectionTitle>
            <FooterLink href="/terms">서비스 약관</FooterLink>
            <FooterLink href="/privacy">개인정보 처리방침</FooterLink>
            <FooterLink href="/support">고객 지원</FooterLink>
            <SectionTitle sx={{ mt: 4 }}>문의하기</SectionTitle>
            <ContactBox>
              <EmailIcon sx={{ color: '#8b8bff', fontSize: 36 }} />
              <Box>
                <Typography sx={{ color: '#888', fontSize: 16 }}>이메일:</Typography>
                <Typography sx={{ color: '#222', fontWeight: 700, fontSize: 18 }}>intube@intube.kr</Typography>
              </Box>
            </ContactBox>
            <ContactBox>
              <PhoneIcon sx={{ color: '#8b8bff', fontSize: 36 }} />
              <Box>
                <Typography sx={{ color: '#888', fontSize: 16 }}>전화:</Typography>
                <Typography sx={{ color: '#222', fontWeight: 700, fontSize: 18 }}>02-6956-0104</Typography>
              </Box>
            </ContactBox>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4 }} />
        <Typography align="center" sx={{ color: '#aaa', fontSize: 16 }}>
          Copyright ⓒ 2025 인튜브 All rights reserved.
        </Typography>
      </Container>
    </FooterContainer>
  );
};

export default Footer; 