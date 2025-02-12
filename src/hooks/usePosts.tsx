import { useEffect, useState, useCallback } from 'react';
import { Post } from '../components/posts/types';
import { postApi } from '../services/api';

interface ApiError {
  message: string;
  status?: number;
}

const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await postApi.makeApiRequest('GET', '/Post');
      if (data.success) {
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
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, isLoading, error, refetch: fetchPosts };
};

export default usePosts;