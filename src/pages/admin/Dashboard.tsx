import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import AdminLayout from '../../components/admin/AdminLayout';

// 임시 데이터
const recentOrders = [
  {
    id: '1',
    customer: '홍길동',
    type: '구독',
    amount: '50,000원',
    status: '결제완료',
    date: '2024-02-20',
  },
  {
    id: '2',
    customer: '김철수',
    type: 'API',
    amount: '30,000원',
    status: '결제완료',
    date: '2024-02-20',
  },
  {
    id: '3',
    customer: '이영희',
    type: '구독',
    amount: '100,000원',
    status: '결제대기',
    date: '2024-02-20',
  },
];

const stats = [
  { title: '총 회원수', value: '1,234명' },
  { title: '오늘의 주문', value: '45건' },
  { title: '이번달 매출', value: '12,345,000원' },
  { title: '활성 API 수', value: '89개' },
];

const AdminDashboard: React.FC = () => {
  return (
    <AdminLayout>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h4" gutterBottom>
          대시보드
        </Typography>

        {/* 통계 카드 */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {stats.map((stat) => (
            <Grid item xs={12} sm={6} md={3} key={stat.title}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 140,
                }}
              >
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                  {stat.title}
                </Typography>
                <Typography component="p" variant="h4">
                  {stat.value}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* 최근 주문 */}
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            최근 주문
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>주문번호</TableCell>
                  <TableCell>고객명</TableCell>
                  <TableCell>주문유형</TableCell>
                  <TableCell>금액</TableCell>
                  <TableCell>상태</TableCell>
                  <TableCell>날짜</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.type}</TableCell>
                    <TableCell>{order.amount}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>{order.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </AdminLayout>
  );
};

export default AdminDashboard; 