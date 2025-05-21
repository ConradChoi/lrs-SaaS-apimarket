import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  ShoppingCart as OrderIcon,
  Payment as PaymentIcon,
  CardMembership as SubscriptionIcon,
  Api as ApiIcon,
  Article as BoardIcon,
  Campaign as PopupIcon,
  Notifications as NotificationIcon,
  BarChart as StatisticsIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../store/slices/authSlice';

const drawerWidth = 280;

const AdminLayout: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const menuItems = [
    { text: '대시보드', icon: <DashboardIcon />, path: '/admin/dashboard' },
    { text: '회원 관리', icon: <PeopleIcon />, path: '/admin/users' },
    { text: '주문 관리', icon: <OrderIcon />, path: '/admin/orders' },
    { text: '결제 관리', icon: <PaymentIcon />, path: '/admin/payments' },
    { text: '구독 관리', icon: <SubscriptionIcon />, path: '/admin/subscriptions' },
    { text: 'API 관리', icon: <ApiIcon />, path: '/admin/apis' },
    { text: '게시판 관리', icon: <BoardIcon />, path: '/admin/boards' },
    { text: '팝업 관리', icon: <PopupIcon />, path: '/admin/popups' },
    { text: '알림 관리', icon: <NotificationIcon />, path: '/admin/notifications' },
    { text: '통계', icon: <StatisticsIcon />, path: '/admin/statistics' },
    { text: '시스템 관리', icon: <SettingsIcon />, path: '/admin/system' },
  ];

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          LRS SaaS Admin
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => {
              navigate(item.path);
              if (isMobile) setMobileOpen(false);
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            LRS SaaS API Market - 관리자
          </Typography>
          {user && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body1">{user.name}</Typography>
              <Button color="inherit" onClick={handleLogout}>
                로그아웃
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: '64px',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout; 