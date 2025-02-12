import { useEffect, useState } from 'react';
import { Post } from '../components/posts/types';

interface ApiError {
  message: string;
  status?: number;
}

const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);

      const token = localStorage.getItem('authToken');

      if (!token) {
        setError('User is not authenticated.');
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:8080/api/Post', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setPosts(data.posts);
        } else {
          throw new Error(data.message || 'Failed to fetch posts.');
        }
      } catch (error) {
        const apiError = error as ApiError;
        setError(apiError.message || 'An unknown error occurred.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { posts, isLoading, error };
};

export default usePosts;
