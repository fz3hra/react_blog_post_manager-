import { ApiResponse } from "../../types/post";

const API_BASE_URL = 'http://localhost:8080/api';

export class ApiError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'ApiError';
  }
}

export const getAuthToken = (): string => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new ApiError('User is not authenticated');
  }
  return token;
};

export const makeApiRequest = async <T>(
  endpoint: string,
  options: {
    method?: string;
    body?: any;
    headers?: Record<string, string>;
  } = {}
): Promise<ApiResponse<T>> => {
  const { method = 'GET', body, headers = {} } = options;
  const token = getAuthToken();

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...headers,
      },
      ...(body && { body: JSON.stringify(body) }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(data.message || 'API request failed', response.status);
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Network error or invalid response');
  }
};