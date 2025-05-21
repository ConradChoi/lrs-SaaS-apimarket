import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Alert,
  Chip,
  Grid,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { adminService } from '../../services/adminService';
import { SubscriptionManagementData } from '../../types/admin';

const SubscriptionManagement: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<SubscriptionManagementData[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSubscription, setSelectedSubscription] = useState<SubscriptionManagementData | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState<Partial<SubscriptionManagementData>>({});

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      const response = await adminService.getSubscriptions(page + 1, rowsPerPage);
      setSubscriptions(response.subscriptions);
      setTotal(response.total);
    } catch (err) {
      setError('구독 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, [page, rowsPerPage]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (subscription: SubscriptionManagementData) => {
    setSelectedSubscription(subscription);
    setFormData(subscription);
    setOpenDialog(true);
  };

  const handleDelete = async (subscriptionId: string) => {
    if (window.confirm('정말로 이 구독을 삭제하시겠습니까?')) {
      try {
        await adminService.deleteSubscription(subscriptionId);
        fetchSubscriptions();
      } catch (err) {
        setError('구독 삭제에 실패했습니다.');
      }
    }
  };

  const handleSubmit = async () => {
    try {
      if (selectedSubscription) {
        await adminService.updateSubscription(selectedSubscription.id, formData);
      } else {
        await adminService.createSubscription(formData);
      }
      setOpenDialog(false);
      fetchSubscriptions();
    } catch (err) {
      setError(selectedSubscription ? '구독 수정에 실패했습니다.' : '구독 생성에 실패했습니다.');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">구독 관리</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setSelectedSubscription(null);
            setFormData({});
            setOpenDialog(true);
          }}
        >
          구독 추가
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>사용자</TableCell>
              <TableCell>이메일</TableCell>
              <TableCell>구독 플랜</TableCell>
              <TableCell>시작일</TableCell>
              <TableCell>만료일</TableCell>
              <TableCell>상태</TableCell>
              <TableCell>결제 내역</TableCell>
              <TableCell>관리</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subscriptions.map((subscription) => (
              <TableRow key={subscription.id}>
                <TableCell>{subscription.user.name}</TableCell>
                <TableCell>{subscription.user.email}</TableCell>
                <TableCell>{subscription.plan}</TableCell>
                <TableCell>{new Date(subscription.startDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(subscription.endDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Chip
                    label={subscription.status}
                    color={subscription.status === 'active' ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {subscription.paymentHistory.length > 0 ? (
                    <Typography variant="body2">
                      {subscription.paymentHistory[0].amount.toLocaleString()}원
                      <br />
                      {new Date(subscription.paymentHistory[0].date).toLocaleDateString()}
                    </Typography>
                  ) : (
                    '없음'
                  )}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(subscription)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(subscription.id)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton>
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={total}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedSubscription ? '구독 수정' : '새 구독 추가'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="사용자 ID"
                  value={formData.user?.id || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    user: {
                      id: e.target.value,
                      name: formData.user?.name || '',
                      email: formData.user?.email || ''
                    }
                  })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="구독 플랜"
                  value={formData.plan || ''}
                  onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="시작일"
                  type="date"
                  value={formData.startDate ? new Date(formData.startDate).toISOString().split('T')[0] : ''}
                  onChange={(e) => setFormData({ ...formData, startDate: new Date(e.target.value).toISOString() })}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="만료일"
                  type="date"
                  value={formData.endDate ? new Date(formData.endDate).toISOString().split('T')[0] : ''}
                  onChange={(e) => setFormData({ ...formData, endDate: new Date(e.target.value).toISOString() })}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="상태"
                  select
                  value={formData.status || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    status: e.target.value as 'active' | 'inactive' | 'cancelled'
                  })}
                  fullWidth
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="active">활성</option>
                  <option value="inactive">비활성</option>
                  <option value="expired">만료</option>
                </TextField>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>취소</Button>
          <Button onClick={handleSubmit} variant="contained">
            {selectedSubscription ? '수정' : '추가'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SubscriptionManagement; 