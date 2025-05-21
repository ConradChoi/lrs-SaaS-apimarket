import React, { useState, useEffect } from 'react';
import {
  Box,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Info as InfoIcon,
  CheckCircle as SuccessIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Delete as DeleteIcon,
  DoneAll as DoneAllIcon,
} from '@mui/icons-material';
import { notificationService, Notification } from '../../services/notificationService';

const NotificationCenter: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await notificationService.getNotifications(page);
      setNotifications((prev) => [...prev, ...response.notifications]);
      setHasMore(response.notifications.length === 10);
    } catch (err) {
      setError('알림을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (anchorEl) {
      fetchNotifications();
    }
  }, [anchorEl, page]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await notificationService.markAsRead(notificationId);
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === notificationId
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (err) {
      setError('알림 상태 업데이트에 실패했습니다.');
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications((prev) =>
        prev.map((notification) => ({ ...notification, read: true }))
      );
    } catch (err) {
      setError('알림 상태 업데이트에 실패했습니다.');
    }
  };

  const handleDelete = async (notificationId: string) => {
    try {
      await notificationService.deleteNotification(notificationId);
      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== notificationId)
      );
    } catch (err) {
      setError('알림 삭제에 실패했습니다.');
    }
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'info':
        return <InfoIcon color="info" />;
      case 'success':
        return <SuccessIcon color="success" />;
      case 'warning':
        return <WarningIcon color="warning" />;
      case 'error':
        return <ErrorIcon color="error" />;
      default:
        return <InfoIcon />;
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <>
      <IconButton color="inherit" onClick={handleClick}>
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: { width: 360, maxHeight: 480 },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">알림</Typography>
          {notifications.length > 0 && (
            <Button
              size="small"
              startIcon={<DoneAllIcon />}
              onClick={handleMarkAllAsRead}
            >
              모두 읽음
            </Button>
          )}
        </Box>

        <Divider />

        {error && (
          <Alert severity="error" sx={{ m: 1 }}>
            {error}
          </Alert>
        )}

        <List sx={{ width: '100%', p: 0 }}>
          {notifications.length === 0 ? (
            <ListItem>
              <ListItemText
                primary="알림이 없습니다"
                sx={{ textAlign: 'center', color: 'text.secondary' }}
              />
            </ListItem>
          ) : (
            notifications.map((notification) => (
              <React.Fragment key={notification.id}>
                <ListItem
                  sx={{
                    bgcolor: notification.read ? 'inherit' : 'action.hover',
                  }}
                >
                  <ListItemIcon>{getNotificationIcon(notification.type)}</ListItemIcon>
                  <ListItemText
                    primary={notification.title}
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {notification.message}
                        </Typography>
                        <br />
                        <Typography
                          component="span"
                          variant="caption"
                          color="text.secondary"
                        >
                          {new Date(notification.createdAt).toLocaleString()}
                        </Typography>
                      </>
                    }
                  />
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(notification.id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))
          )}
        </List>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
            <CircularProgress size={24} />
          </Box>
        )}

        {hasMore && !loading && (
          <Box sx={{ p: 1, textAlign: 'center' }}>
            <Button size="small" onClick={handleLoadMore}>
              더 보기
            </Button>
          </Box>
        )}
      </Menu>
    </>
  );
};

export default NotificationCenter; 