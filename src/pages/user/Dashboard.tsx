import React from 'react';
import { Box, Typography, Paper, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, List, ListItem, ListItemText, Divider } from '@mui/material';

const apiUsage = [
  { name: '학습분석 API', count: 120, cost: 12000 },
  { name: '표준연계 API', count: 80, cost: 8000 },
  { name: '학습도구 API', count: 30, cost: 3000 },
];

const applications = [
  { type: '구독', name: 'Standard', date: '2024-06-01' },
  { type: 'API', name: '학습분석 API', date: '2024-06-10' },
];

const inquiries = [
  { title: 'API 사용 문의', date: '2024-06-05' },
  { title: '결제 관련 문의', date: '2024-06-12' },
];

const notices = [
  { title: '서비스 점검 안내', date: '2024-06-01' },
  { title: '신규 API 출시', date: '2024-05-28' },
];

const Dashboard: React.FC = () => (
  <Box>
    <Typography variant="h5" gutterBottom>이번 달 사용한 API</Typography>
    <TableContainer component={Paper} sx={{ mb: 3 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>API명</TableCell>
            <TableCell align="right">호출 수</TableCell>
            <TableCell align="right">비용(원)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {apiUsage.map((row) => (
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">{row.count}</TableCell>
              <TableCell align="right">{row.cost.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom>신청내역</Typography>
          <List>
            {applications.map((app, idx) => (
              <ListItem key={idx} divider>
                <ListItemText primary={`${app.type} - ${app.name}`} secondary={app.date} />
              </ListItem>
            ))}
          </List>
        </Paper>
        <Paper sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom>1:1문의</Typography>
          <List>
            {inquiries.map((inq, idx) => (
              <ListItem key={idx} divider>
                <ListItemText primary={inq.title} secondary={inq.date} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom>공지사항</Typography>
          <List>
            {notices.map((notice, idx) => (
              <ListItem key={idx} divider>
                <ListItemText primary={notice.title} secondary={notice.date} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>
    </Grid>
  </Box>
);

export default Dashboard; 