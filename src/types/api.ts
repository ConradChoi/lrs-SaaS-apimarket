export interface ApiProduct {
  id: string;
  name: string;
  description: string;
  version: string;
  status: 'active' | 'inactive' | 'maintenance';
  category: string;
  endpoints: ApiEndpoint[];
  authentication: ApiAuthentication;
  rateLimit: ApiRateLimit;
}

export interface ApiEndpoint {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  description: string;
  requestExample: string;
  responseExample: string;
  parameters?: ApiParameter[];
  responses?: ApiResponse[];
}

export interface ApiParameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
  defaultValue?: string;
}

export interface ApiResponse {
  statusCode: number;
  description: string;
  schema: string;
}

export interface ApiAuthentication {
  type: string;
  description: string;
  keyInstructions: string;
}

export interface ApiRateLimit {
  requestsPerSecond: number;
  requestsPerDay: number;
  additionalLimits: string[];
} 