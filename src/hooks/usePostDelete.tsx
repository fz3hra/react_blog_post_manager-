import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postApi } from '../services/api';

interface ApiError {
  message: string;
  status?: number;
}

export const usePostDelete = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const deletePost = async (postId: number) => {
    if (!postId) {
      setError('No post ID found, unable to delete.');
      return;
    }

    try {
      await postApi.makeApiRequest('DELETE', `/Post/${postId}`);
      navigate('/');
      return true;
    } catch (error) {
    const apiError = error as ApiError;
      setError(apiError.message || 'An unknown error occurred');
      return false;
    }
  };

  return { deletePost, error };
};