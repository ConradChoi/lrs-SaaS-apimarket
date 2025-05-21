import { AxiosError } from 'axios';

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export const isApiError = (error: unknown): error is ApiError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as ApiError).message === 'string'
  );
};

export const handleApiError = (error: unknown): string => {
  if (error instanceof AxiosError) {
    // API 서버에서 반환한 에러 메시지
    if (error.response?.data?.message) {
      return error.response.data.message;
    }
    
    // HTTP 상태 코드에 따른 기본 메시지
    switch (error.response?.status) {
      case 400:
        return '잘못된 요청입니다.';
      case 401:
        return '로그인이 필요합니다.';
      case 403:
        return '접근 권한이 없습니다.';
      case 404:
        return '요청한 리소스를 찾을 수 없습니다.';
      case 500:
        return '서버 오류가 발생했습니다.';
      default:
        return '알 수 없는 오류가 발생했습니다.';
    }
  }

  // 네트워크 오류
  if (error instanceof Error) {
    if (error.message === 'Network Error') {
      return '네트워크 연결을 확인해주세요.';
    }
    return error.message;
  }

  return '알 수 없는 오류가 발생했습니다.';
}; 