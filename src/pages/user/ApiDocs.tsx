import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
  Button,
  Collapse,
} from '@mui/material';
import {
  Code as CodeIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Description as DescriptionIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
} from '@mui/icons-material';
import { apiService } from '../../services/apiService';
import { ApiProduct } from '../../types/api';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`api-docs-tabpanel-${index}`}
      aria-labelledby={`api-docs-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const ApiDocs: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiProducts, setApiProducts] = useState<ApiProduct[]>([]);
  const [selectedApi, setSelectedApi] = useState<ApiProduct | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [expandedEndpoint, setExpandedEndpoint] = useState<string | null>(null);

  useEffect(() => {
    const fetchApiProducts = async () => {
      try {
        setLoading(true);
        const response = await apiService.getApiProducts();
        setApiProducts(response);
        if (response.length > 0) {
          setSelectedApi(response[0]);
        }
      } catch (err) {
        setError('API 제품 목록을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchApiProducts();
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleEndpointClick = (endpointId: string) => {
    setExpandedEndpoint(expandedEndpoint === endpointId ? null : endpointId);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              API 제품 목록
            </Typography>
            <List>
              {apiProducts.map((api) => (
                <ListItem
                  key={api.id}
                  button
                  selected={selectedApi?.id === api.id}
                  onClick={() => setSelectedApi(api)}
                >
                  <ListItemIcon>
                    <CodeIcon />
                  </ListItemIcon>
                  <ListItemText primary={api.name} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={9}>
          {selectedApi ? (
            <Paper>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={handleTabChange}>
                  <Tab label="개요" />
                  <Tab label="엔드포인트" />
                  <Tab label="인증" />
                  <Tab label="제한사항" />
                </Tabs>
              </Box>

              <TabPanel value={tabValue} index={0}>
                <Typography variant="h5" gutterBottom>
                  {selectedApi.name}
                </Typography>
                <Typography variant="body1" paragraph>
                  {selectedApi.description}
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="subtitle2" color="textSecondary">
                        버전
                      </Typography>
                      <Typography variant="h6">{selectedApi.version}</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="subtitle2" color="textSecondary">
                        상태
                      </Typography>
                      <Typography variant="h6">{selectedApi.status}</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="subtitle2" color="textSecondary">
                        카테고리
                      </Typography>
                      <Typography variant="h6">{selectedApi.category}</Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </TabPanel>

              <TabPanel value={tabValue} index={1}>
                <Typography variant="h6" gutterBottom>
                  엔드포인트
                </Typography>
                <List>
                  {selectedApi.endpoints.map((endpoint) => (
                    <React.Fragment key={endpoint.id}>
                      <ListItem
                        button
                        onClick={() => handleEndpointClick(endpoint.id)}
                      >
                        <ListItemIcon>
                          <CodeIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Typography
                                component="span"
                                sx={{
                                  bgcolor: 'grey.100',
                                  px: 1,
                                  py: 0.5,
                                  borderRadius: 1,
                                  mr: 1,
                                  fontFamily: 'monospace'
                                }}
                              >
                                {endpoint.method}
                              </Typography>
                              {endpoint.path}
                            </Box>
                          }
                          secondary={endpoint.description}
                        />
                        {expandedEndpoint === endpoint.id ? (
                          <ExpandLessIcon />
                        ) : (
                          <ExpandMoreIcon />
                        )}
                      </ListItem>
                      <Collapse
                        in={expandedEndpoint === endpoint.id}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Box sx={{ pl: 9, pr: 2, pb: 2 }}>
                          <Typography variant="subtitle2" gutterBottom>
                            요청 예시
                          </Typography>
                          <Paper
                            sx={{
                              p: 2,
                              bgcolor: 'grey.100',
                              fontFamily: 'monospace',
                            }}
                          >
                            {endpoint.requestExample}
                          </Paper>
                          <Typography variant="subtitle2" sx={{ mt: 2 }} gutterBottom>
                            응답 예시
                          </Typography>
                          <Paper
                            sx={{
                              p: 2,
                              bgcolor: 'grey.100',
                              fontFamily: 'monospace',
                            }}
                          >
                            {endpoint.responseExample}
                          </Paper>
                        </Box>
                      </Collapse>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
              </TabPanel>

              <TabPanel value={tabValue} index={2}>
                <Typography variant="h6" gutterBottom>
                  인증
                </Typography>
                <Paper sx={{ p: 2, bgcolor: 'grey.100' }}>
                  <Typography variant="body1" paragraph>
                    {selectedApi.authentication.description}
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom>
                    인증 방식
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {selectedApi.authentication.type}
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom>
                    API 키 발급 방법
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {selectedApi.authentication.keyInstructions}
                  </Typography>
                </Paper>
              </TabPanel>

              <TabPanel value={tabValue} index={3}>
                <Typography variant="h6" gutterBottom>
                  제한사항
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="subtitle2" color="textSecondary">
                        초당 요청 제한
                      </Typography>
                      <Typography variant="h6">
                        {selectedApi.rateLimit.requestsPerSecond} 요청/초
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="subtitle2" color="textSecondary">
                        일일 요청 제한
                      </Typography>
                      <Typography variant="h6">
                        {selectedApi.rateLimit.requestsPerDay.toLocaleString()} 요청/일
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    추가 제한사항
                  </Typography>
                  <List>
                    {selectedApi.rateLimit.additionalLimits.map((limit, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <SpeedIcon />
                        </ListItemIcon>
                        <ListItemText primary={limit} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </TabPanel>
            </Paper>
          ) : (
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" color="textSecondary">
                API 제품을 선택해주세요
              </Typography>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ApiDocs; 