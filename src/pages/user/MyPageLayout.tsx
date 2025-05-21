import React from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar, Divider, Collapse, IconButton, Typography, ListItemIcon } from '@mui/material';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { ExpandLess, ExpandMore, Menu as MenuIcon, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, Dashboard as DashboardIcon, ListAlt as ListAltIcon, Payment as PaymentIcon, Person as PersonIcon, Lock as LockIcon, QuestionAnswer as InquiryIcon, Campaign as NoticeIcon, Logout as LogoutIcon, Delete as DeleteIcon, VpnKey as VpnKeyIcon } from '@mui/icons-material';

const drawerWidth = 220;
const collapsedWidth = 64;

const menu = [
  { label: '대시보드', path: '/mypage', icon: <DashboardIcon /> },
  {
    label: '신청내역',
    icon: <ListAltIcon />,
    children: [
      { label: '구독 신청', path: '/mypage/subscription', icon: <ListAltIcon /> },
      { label: 'API 신청', path: '/mypage/api', icon: <ListAltIcon /> },
    ],
  },
  { label: '결제내역', path: '/mypage/payments', icon: <PaymentIcon /> },
  {
    label: '정보수정',
    icon: <PersonIcon />,
    children: [
      { label: '정보수정', path: '/mypage/profile', icon: <PersonIcon /> },
      { label: '로그아웃', path: '/mypage/logout', icon: <LogoutIcon /> },
      { label: '회원탈퇴', path: '/mypage/withdraw', icon: <DeleteIcon /> },
    ],
  },
  { label: '비밀번호변경', path: '/mypage/password', icon: <VpnKeyIcon /> },
  { label: '1:1문의', path: '/mypage/inquiry', icon: <InquiryIcon /> },
  { label: '공지사항', path: '/mypage/notice', icon: <NoticeIcon /> },
];

interface MyPageLayoutProps {
  children?: React.ReactNode;
}

const MyPageLayout: React.FC<MyPageLayoutProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = React.useState<{ [key: string]: boolean }>({});
  const [collapsed, setCollapsed] = React.useState(false);

  const handleClick = (label: string) => {
    setOpen((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const handleCollapseToggle = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', pt: 8 }}>
      <Drawer
        variant="permanent"
        sx={{
          width: collapsed ? collapsedWidth : drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: collapsed ? collapsedWidth : drawerWidth,
            boxSizing: 'border-box',
            top: 64,
            transition: 'width 0.2s',
            overflowX: 'hidden',
          },
        }}
      >
        <Toolbar sx={{ justifyContent: collapsed ? 'center' : 'space-between', px: 1 }}>
          {collapsed ? (
            <IconButton onClick={handleCollapseToggle} size="small">
              <ChevronRightIcon />
            </IconButton>
          ) : (
            <>
              <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                마이페이지
              </Typography>
              <IconButton onClick={handleCollapseToggle} size="small">
                <ChevronLeftIcon />
              </IconButton>
            </>
          )}
        </Toolbar>
        <Divider />
        <List>
          {menu.map((item) =>
            item.children ? (
              <React.Fragment key={item.label}>
                <ListItemButton
                  onClick={() => handleClick(item.label)}
                  selected={item.children.some(child => location.pathname === child.path)}
                  sx={{
                    minHeight: 48,
                    justifyContent: collapsed ? 'center' : 'initial',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 0, mr: collapsed ? 'auto' : 2, justifyContent: 'center' }}>{item.icon}</ListItemIcon>
                  {!collapsed && <ListItemText primary={item.label} />}
                  {!collapsed && (open[item.label] ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>
                <Collapse in={open[item.label] && !collapsed} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.children.map((child) => (
                      <ListItemButton
                        key={child.label}
                        sx={{ pl: collapsed ? 2.5 : 4, justifyContent: collapsed ? 'center' : 'initial' }}
                        selected={location.pathname === child.path}
                        onClick={() => navigate(child.path)}
                      >
                        <ListItemIcon sx={{ minWidth: 0, mr: collapsed ? 'auto' : 2, justifyContent: 'center' }}>{child.icon}</ListItemIcon>
                        {!collapsed && <ListItemText primary={child.label} />}
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            ) : (
              <ListItem key={item.label} disablePadding>
                <ListItemButton
                  selected={location.pathname === item.path}
                  onClick={() => navigate(item.path)}
                  sx={{
                    minHeight: 48,
                    justifyContent: collapsed ? 'center' : 'initial',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 0, mr: collapsed ? 'auto' : 2, justifyContent: 'center' }}>{item.icon}</ListItemIcon>
                  {!collapsed && <ListItemText primary={item.label} />}
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, minHeight: '100vh', background: '#f7f7f7' }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default MyPageLayout; 