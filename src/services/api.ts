interface RequestBody {
  title: string;
  description: string;
  excerpt: string;
  tags: string[];
  isPublished: boolean;
  featuredImage: string | null;
}
interface ApiConfig {
  baseUrl: string;
}
export class ApiService {
  private baseUrl: string;

  constructor(config: ApiConfig) {
    this.baseUrl = config.baseUrl;
  }

  async makeApiRequest(method: string, endpoint: string, body?: RequestBody) {
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error('User is not authenticated');

    const url = `${this.baseUrl}${endpoint}`;
    console.log('Making request to:', url, { method, body });

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        ...(body && { body: JSON.stringify(body) }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      const text = await response.text();
      console.log('Response text:', text);

      if (response.status === 204) return null;
      if (!text) return null;

      const data = JSON.parse(text);
      if (!response.ok) throw new Error(data?.message || 'API request failed');
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }
}

export const postApi = new ApiService({ baseUrl: 'http://localhost:8080/api' });