import React from 'react';
import { AppBar, Toolbar, Box, Container } from '@mui/material';
import { Link as RouterLink, Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useAuth } from '../../hooks/useAuth';

const Logo = styled('img')({
  height: '40px',
  marginRight: '2rem'
});

const NavLink = styled(RouterLink)(({ theme }) => ({
  color: theme.palette.common.white,
  textDecoration: 'none',
  marginLeft: theme.spacing(2),
  padding: theme.spacing(1, 2),
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)'
  }
}));

const StartLink = styled(RouterLink)(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor: theme.palette.primary.main,
  textDecoration: 'none',
  marginLeft: theme.spacing(2),
  padding: theme.spacing(1, 2),
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark
  }
}));

const Navbar = () => {
  const { user } = useAuth();
  return (
    <>
      <AppBar position="fixed">
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <RouterLink to="/">
              <Logo src="/logo.png" alt="LXA Logo" />
            </RouterLink>
            
            <Box sx={{ flexGrow: 1 }} />
            
            <NavLink to="/about">
              LXA 소개
            </NavLink>
            <NavLink to="/plans">
              플랜 정책
            </NavLink>
            <NavLink to="/market">
              API 마켓
            </NavLink>
            {user ? (
              <NavLink to="/mypage">마이페이지</NavLink>
            ) : (
              <NavLink to="/login">로그인</NavLink>
            )}
            {!user && (
              <StartLink to="/signup">무료로 시작하기</StartLink>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </>
  );
};

export default Navbar; 