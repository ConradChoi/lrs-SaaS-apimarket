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
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { adminService } from '../../services/adminService';
import { ApiManagementData } from '../../types/admin';

interface FormData {
  name: string;
  description: string;
  pricing: {
    monthly: number;
    yearly: number;
  };
  // ... other fields ...
}

const ApiManagement: React.FC = () => {
  const [products, setProducts] = useState<ApiManagementData[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ApiManagementData | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState<Partial<ApiManagementData>>({});

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await adminService.getApiProducts(page + 1, rowsPerPage);
      setProducts(response.products);
      setTotal(response.total);
    } catch (err) {
      setError('API 제품 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, rowsPerPage]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (product: ApiManagementData) => {
    setSelectedProduct(product);
    setFormData(product);
    setOpenDialog(true);
  };

  const handleDelete = async (productId: string) => {
    if (window.confirm('정말로 이 API 제품을 삭제하시겠습니까?')) {
      try {
        await adminService.deleteApiProduct(productId);
        fetchProducts();
      } catch (err) {
        setError('API 제품 삭제에 실패했습니다.');
      }
    }
  };

  const handleSubmit = async () => {
    try {
      if (selectedProduct) {
        await adminService.updateApiProduct(selectedProduct.id, formData);
      } else {
        await adminService.createApiProduct(formData);
      }
      setOpenDialog(false);
      fetchProducts();
    } catch (err) {
      setError(selectedProduct ? 'API 제품 수정에 실패했습니다.' : 'API 제품 생성에 실패했습니다.');
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
        <Typography variant="h4">API 관리</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setSelectedProduct(null);
            setFormData({});
            setOpenDialog(true);
          }}
        >
          API 제품 추가
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
              <TableCell>설명</TableCell>
              <TableCell>카테고리</TableCell>
              <TableCell>구독자 수</TableCell>
              <TableCell>총 호출 수</TableCell>
              <TableCell>평균 응답 시간</TableCell>
              <TableCell>상태</TableCell>
              <TableCell>관리</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.totalSubscribers}</TableCell>
                <TableCell>{product.totalCalls}</TableCell>
                <TableCell>{product.averageResponseTime}ms</TableCell>
                <TableCell>
                  <Chip
                    label={product.status}
                    color={product.status === 'active' ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(product)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(product.id)}>
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
          {selectedProduct ? 'API 제품 수정' : '새 API 제품 추가'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              label="이름"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              fullWidth
            />
            <TextField
              label="설명"
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              multiline
              rows={3}
              fullWidth
            />
            <TextField
              label="카테고리"
              value={formData.category || ''}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              fullWidth
            />
            <TextField
              label="가격 (월간)"
              type="number"
              value={formData.pricing?.monthly || ''}
              onChange={(e) => setFormData({
                ...formData,
                pricing: {
                  monthly: Number(e.target.value),
                  yearly: formData.pricing?.yearly || 0
                }
              })}
              fullWidth
            />
            <TextField
              label="가격 (연간)"
              type="number"
              value={formData.pricing?.yearly || ''}
              onChange={(e) => setFormData({
                ...formData,
                pricing: {
                  monthly: formData.pricing?.monthly || 0,
                  yearly: Number(e.target.value)
                }
              })}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>취소</Button>
          <Button onClick={handleSubmit} variant="contained">
            {selectedProduct ? '수정' : '추가'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ApiManagement; 