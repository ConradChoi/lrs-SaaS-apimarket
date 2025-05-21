import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { handleApiError } from '../utils/error';
import { getCSRFToken, CSRF_HEADER_NAME, RateLimiter } from '../utils/security';

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

// Rate limiter 설정: 1초당 10개 요청 제한
const rateLimiter = new RateLimiter(10, 1000);

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000, // 10초 타임아웃
  withCredentials: true // CSRF 토큰을 위한 설정
});

// Add a request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Rate limiting 체크
    if (!rateLimiter.canMakeRequest()) {
      const remainingTime = rateLimiter.getRemainingTime();
      return Promise.reject(new Error(`요청이 너무 많습니다. ${Math.ceil(remainingTime / 1000)}초 후에 다시 시도해주세요.`));
    }

    // CSRF 토큰 추가
    const csrfToken = getCSRFToken();
    if (csrfToken) {
      config.headers[CSRF_HEADER_NAME] = csrfToken;
    }

    // 인증 토큰 추가
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (!error.config) {
      return Promise.reject(error);
    }

    const originalRequest = error.config;

    // 토큰 만료 처리
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 토큰 갱신 시도
        const response = await api.post('/auth/refresh');
        const { token } = response.data;

        // 새 토큰 저장
        localStorage.setItem('token', token);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // 원래 요청 재시도
        if (originalRequest.headers) {
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
        }
        return api(originalRequest);
      } catch (refreshError) {
        // 토큰 갱신 실패 시 로그아웃
        localStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // 에러 메시지 처리
    const errorMessage = handleApiError(error);
    return Promise.reject(new Error(errorMessage));
  }
);

export default api; 