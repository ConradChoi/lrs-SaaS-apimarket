import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Box,
  Chip,
  InputAdornment,
  Tabs,
  Tab,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';

const ApiCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
}));

interface Api {
  id: string;
  name: string;
  description: string;
  category: string;
  price: string;
  rating: number;
}

const ApiCardComponent: React.FC<{ api: Api }> = ({ api }) => (
  <ApiCard>
    <CardContent sx={{ flexGrow: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" component="h2">
          {api.name}
        </Typography>
        <Chip
          label={api.price}
          color={api.price === '무료' ? 'success' : 'primary'}
          size="small"
        />
      </Box>
      <Typography color="text.secondary" paragraph>
        {api.description}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        카테고리: {api.category}
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        <Chip label={api.category} size="small" />
        <Chip label={`평점 ${api.rating}/5`} size="small" />
      </Box>
    </CardContent>
    <CardActions>
      <Button size="small" component={RouterLink} to={`/api/${api.id}`}>
        자세히 보기
      </Button>
      <Button size="small" component={RouterLink} to={`/api/${api.id}/docs`}>
        문서 보기
      </Button>
    </CardActions>
  </ApiCard>
);

const ApiMarket = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const categories = ['전체', '학습분석 API', '표준연계 API', '학습도구 API'];

  const apis: Api[] = [
    {
      id: '1',
      name: '학습자 행동 분석 API',
      description: '학습자의 행동 패턴을 분석하여 학습 효과를 측정합니다.',
      category: '학습분석 API',
      price: '무료',
      rating: 4.5
    },
    {
      id: '2',
      name: 'LMS 연동 API',
      description: '다양한 LMS 시스템과의 원활한 연동을 제공합니다.',
      category: '표준연계 API',
      price: '₩50,000/월',
      rating: 4.8
    },
    {
      id: '3',
      name: '학습 도구 통합 API',
      description: '다양한 학습 도구들을 하나의 플랫폼에서 관리할 수 있습니다.',
      category: '학습도구 API',
      price: '₩30,000/월',
      rating: 4.2
    },
    // 추가 API 예시...
  ];

  const filteredApis = apis.filter(api => {
    const matchesSearch = api.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         api.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === '전체' || api.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCategoryChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedCategory(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        API 마켓플레이스
      </Typography>
      <Typography variant="h6" align="center" color="text.secondary" paragraph>
        다양한 API를 검색하고 활용해보세요
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Tabs
          value={selectedCategory}
          onChange={handleCategoryChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          {categories.map((category) => (
            <Tab key={category} label={category} value={category} />
          ))}
        </Tabs>
      </Box>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="API 검색..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 4 }}
      />

      <Grid container spacing={4}>
        {filteredApis.map((api) => (
          <Grid item key={api.id} xs={12} sm={6} md={4}>
            <ApiCardComponent api={api} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ApiMarket; 