import { v4 as uuidv4 } from 'uuid';

const CSRF_TOKEN_KEY = 'csrf_token';
const CSRF_HEADER = 'X-CSRF-Token';

export const generateCSRFToken = (): string => {
  const token = uuidv4();
  localStorage.setItem(CSRF_TOKEN_KEY, token);
  return token;
};

export const getCSRFToken = (): string | null => {
  return localStorage.getItem(CSRF_TOKEN_KEY);
};

export const removeCSRFToken = (): void => {
  localStorage.removeItem(CSRF_TOKEN_KEY);
};

export const CSRF_HEADER_NAME = CSRF_HEADER;

// XSS 방지를 위한 입력값 검증
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

// Rate limiting을 위한 요청 제한
export class RateLimiter {
  private requests: number[] = [];
  private readonly limit: number;
  private readonly interval: number;

  constructor(limit: number, interval: number) {
    this.limit = limit;
    this.interval = interval;
  }

  canMakeRequest(): boolean {
    const now = Date.now();
    this.requests = this.requests.filter(time => now - time < this.interval);
    
    if (this.requests.length < this.limit) {
      this.requests.push(now);
      return true;
    }
    
    return false;
  }

  getRemainingTime(): number {
    if (this.requests.length === 0) return 0;
    const oldestRequest = this.requests[0];
    const now = Date.now();
    return Math.max(0, this.interval - (now - oldestRequest));
  }
} 