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
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { adminService } from '../../services/adminService';
import { UserManagementData } from '../../types/admin';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<UserManagementData[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserManagementData | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState<Partial<UserManagementData>>({});

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await adminService.getUsers(page + 1, rowsPerPage);
      setUsers(response.users);
      setTotal(response.total);
    } catch (err) {
      setError('사용자 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, rowsPerPage]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (user: UserManagementData) => {
    setSelectedUser(user);
    setFormData(user);
    setOpenDialog(true);
  };

  const handleDelete = async (userId: string) => {
    if (window.confirm('정말로 이 사용자를 삭제하시겠습니까?')) {
      try {
        await adminService.deleteUser(userId);
        fetchUsers();
      } catch (err) {
        setError('사용자 삭제에 실패했습니다.');
      }
    }
  };

  const handleSubmit = async () => {
    if (!selectedUser) return;

    try {
      await adminService.updateUser(selectedUser.id, formData);
      setOpenDialog(false);
      fetchUsers();
    } catch (err) {
      setError('사용자 정보 수정에 실패했습니다.');
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
        <Typography variant="h4">사용자 관리</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setSelectedUser(null);
            setFormData({});
            setOpenDialog(true);
          }}
        >
          사용자 추가
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
              <TableCell>이름</TableCell>
              <TableCell>이메일</TableCell>
              <TableCell>회사</TableCell>
              <TableCell>구독 상태</TableCell>
              <TableCell>마지막 로그인</TableCell>
              <TableCell>API 사용량</TableCell>
              <TableCell>관리</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.company}</TableCell>
                <TableCell>{user.subscriptionStatus}</TableCell>
                <TableCell>{new Date(user.lastLoginAt).toLocaleString()}</TableCell>
                <TableCell>{user.apiUsageCount}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(user)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(user.id)}>
                    <DeleteIcon />
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

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {selectedUser ? '사용자 정보 수정' : '새 사용자 추가'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              label="이름"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <TextField
              label="이메일"
              value={formData.email || ''}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <TextField
              label="회사"
              value={formData.company || ''}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            />
            <TextField
              label="전화번호"
              value={formData.phone || ''}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>취소</Button>
          <Button onClick={handleSubmit} variant="contained">
            {selectedUser ? '수정' : '추가'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManagement; 