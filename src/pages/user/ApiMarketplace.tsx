import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
} from '@mui/material';
import {
  Search as SearchIcon,
  Code as CodeIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
} from '@mui/icons-material';
import { ApiProduct } from '../../types';

interface ApiCategory {
  id: string;
  name: string;
  description: string;
}

const categories: ApiCategory[] = [
  {
    id: 'analytics',
    name: '학습분석 API',
    description: '학습자 행동 분석 및 성과 측정을 위한 API',
  },
  {
    id: 'integration',
    name: '표준연계 API',
    description: '다양한 학습 시스템과의 연계를 위한 API',
  },
  {
    id: 'tools',
    name: '학습도구 API',
    description: '학습 도구 및 기능을 위한 API',
  },
];

// Mock API data
const mockApis: ApiProduct[] = [
  {
    id: '1',
    name: '학습자 행동 분석 API',
    description: '학습자의 행동 패턴을 분석하고 인사이트를 제공하는 API',
    category: 'analytics',
    endpoints: [
      {
        path: '/api/v1/analytics/behavior',
        method: 'GET',
        description: '학습자 행동 데이터 조회',
      },
      {
        path: '/api/v1/analytics/performance',
        method: 'GET',
        description: '학습 성과 데이터 조회',
      },
    ],
    pricing: [
      {
        plan: 'basic',
        price: 99000,
        features: ['월 1,000건 호출', '기본 분석 리포트'],
      },
      {
        plan: 'premium',
        price: 299000,
        features: ['월 10,000건 호출', '고급 분석 리포트', '실시간 알림'],
      },
    ],
  },
  // Add more mock APIs here
];

const ApiMarketplace: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedApi, setSelectedApi] = useState<ApiProduct | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleCategoryChange = (_: React.SyntheticEvent, newValue: string) => {
    setSelectedCategory(newValue);
  };

  const handleApiSelect = (api: ApiProduct) => {
    setSelectedApi(api);
    setOpenDialog(true);
  };

  const filteredApis = mockApis.filter((api) => {
    const matchesSearch = api.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      api.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || api.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    }).format(price);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        API 마켓플레이스
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" paragraph>
        다양한 API를 탐색하고 비즈니스에 맞는 서비스를 선택하세요
      </Typography>

      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="API 검색..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Tabs
        value={selectedCategory}
        onChange={handleCategoryChange}
        sx={{ mb: 4 }}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label="전체" value="all" />
        {categories.map((category) => (
          <Tab key={category.id} label={category.name} value={category.id} />
        ))}
      </Tabs>

      <Grid container spacing={3}>
        {filteredApis.map((api) => (
          <Grid item key={api.id} xs={12} md={6} lg={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {api.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {api.description}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Chip
                    icon={<CodeIcon />}
                    label={categories.find((c) => c.id === api.category)?.name}
                    size="small"
                    sx={{ mr: 1 }}
                  />
                  <Chip
                    icon={<SpeedIcon />}
                    label={`${api.endpoints.length}개 엔드포인트`}
                    size="small"
                    sx={{ mr: 1 }}
                  />
                  <Chip
                    icon={<SecurityIcon />}
                    label="보안 인증"
                    size="small"
                  />
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => handleApiSelect(api)}
                >
                  자세히 보기
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{selectedApi?.name}</DialogTitle>
        <DialogContent>
          <Typography variant="body1" paragraph>
            {selectedApi?.description}
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            엔드포인트
          </Typography>
          <List>
            {selectedApi?.endpoints.map((endpoint, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemText
                    primary={endpoint.path}
                    secondary={endpoint.description}
                  />
                  <Chip
                    label={endpoint.method}
                    color={endpoint.method === 'GET' ? 'success' : 'primary'}
                    size="small"
                  />
                </ListItem>
                {index < (selectedApi?.endpoints.length || 0) - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>

          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            가격 정책
          </Typography>
          <Grid container spacing={2}>
            {selectedApi?.pricing.map((plan, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {plan.plan === 'basic' ? '기본' : '프리미엄'}
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                      {formatPrice(plan.price)}
                      <Typography
                        component="span"
                        variant="subtitle1"
                        color="text.secondary"
                        sx={{ ml: 1 }}
                      >
                        /월
                      </Typography>
                    </Typography>
                    <List dense>
                      {plan.features.map((feature, idx) => (
                        <ListItem key={idx}>
                          <ListItemText primary={feature} />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>닫기</Button>
          <Button variant="contained" color="primary">
            구독하기
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ApiMarketplace; 