import React, { useState } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from '@mui/material';
import {
  Menu as MenuIcon,
  People as PeopleIcon,
  ShoppingCart as OrderIcon,
  Payment as PaymentIcon,
  Subscriptions as SubscriptionIcon,
  Api as ApiIcon,
  Dashboard as DashboardIcon,
  Forum as ForumIcon,
  Campaign as PopupIcon,
  Notifications as NotificationIcon,
  BarChart as StatsIcon,
  Settings as SystemIcon,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 280;

const menuItems = [
  {
    title: '회원관리',
    icon: <PeopleIcon />,
    children: [
      { title: '회원관리', path: '/admin/users' },
      { title: '탈퇴회원', path: '/admin/users/withdrawn' },
    ],
  },
  {
    title: '주문관리',
    icon: <OrderIcon />,
    children: [
      { title: '구독주문', path: '/admin/orders/subscription' },
      { title: 'API주문', path: '/admin/orders/api' },
    ],
  },
  {
    title: '결제관리',
    icon: <PaymentIcon />,
    path: '/admin/payments',
  },
  {
    title: '구독관리',
    icon: <SubscriptionIcon />,
    children: [
      { title: '요금제관리', path: '/admin/subscriptions/plans' },
      { title: '과금관리', path: '/admin/subscriptions/billing' },
    ],
  },
  {
    title: 'API관리',
    icon: <ApiIcon />,
    children: [
      { title: 'API관리', path: '/admin/apis' },
      { title: 'API오류관리', path: '/admin/apis/errors' },
    ],
  },
  {
    title: '대시보드관리',
    icon: <DashboardIcon />,
    children: [
      { title: '대시보드관리', path: '/admin/dashboard/settings' },
      { title: '시각화관리', path: '/admin/dashboard/visualization' },
    ],
  },
  {
    title: '게시판관리',
    icon: <ForumIcon />,
    children: [
      { title: '공지사항', path: '/admin/board/notice' },
      { title: 'FAQ', path: '/admin/board/faq' },
      { title: '1:1문의', path: '/admin/board/inquiry' },
    ],
  },
  {
    title: '팝업관리',
    icon: <PopupIcon />,
    path: '/admin/popups',
  },
  {
    title: '알림관리',
    icon: <NotificationIcon />,
    children: [
      { title: '알림템플릿관리', path: '/admin/notifications/templates' },
      { title: '알림트리거 설정', path: '/admin/notifications/triggers' },
    ],
  },
  {
    title: '통계',
    icon: <StatsIcon />,
    children: [
      { title: '기간별 API 사용', path: '/admin/stats/api-usage' },
      { title: '사용자별', path: '/admin/stats/users' },
    ],
  },
  {
    title: '시스템관리',
    icon: <SystemIcon />,
    children: [
      { title: '관리자관리', path: '/admin/system/admins' },
      { title: '권한관리', path: '/admin/system/permissions' },
      { title: '공통코드관리', path: '/admin/system/codes' },
      { title: '약관-정책관리', path: '/admin/system/policies' },
      { title: '로그', path: '/admin/system/logs' },
    ],
  },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClick = (title: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          관리자 메뉴
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <React.Fragment key={item.title}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  if (item.children) {
                    handleMenuClick(item.title);
                  } else {
                    navigate(item.path);
                  }
                }}
                selected={location.pathname === item.path}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
                {item.children && (openMenus[item.title] ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>
            </ListItem>
            {item.children && (
              <Collapse in={openMenus[item.title]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.children.map((child) => (
                    <ListItemButton
                      key={child.title}
                      sx={{ pl: 4 }}
                      onClick={() => navigate(child.path)}
                      selected={location.pathname === child.path}
                    >
                      <ListItemText primary={child.title} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
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
          <Typography variant="h6" noWrap component="div">
            API 마켓플레이스 관리자
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
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
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout; 