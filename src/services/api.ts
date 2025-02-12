interface RequestBody {
  title: string;
  description: string;
  excerpt: string;
  tags: string[];
  isPublished: boolean;
  featuredImage: string | null;
}

const BASE_URL = 'http://localhost:8080/api';


export const makeApiRequest = async (method: string, endpoint: string, body?: RequestBody) => {
  const token = localStorage.getItem('authToken');
  if (!token) throw new Error('User is not authenticated');

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    ...(body && { body: JSON.stringify(body) }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'API request failed');
  
  return data;
};