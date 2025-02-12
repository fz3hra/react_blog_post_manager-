import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeApiRequest } from '../services/api';

export const usePostDelete = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const deletePost = async (postId: number) => {
    if (!postId) {
      setError('No post ID found, unable to delete.');
      return;
    }

    try {
      await makeApiRequest('DELETE', `/Post/${postId}`);
      navigate('/');
      return true;
    } catch (error: any) {
      setError(error.message || 'An unknown error occurred');
      return false;
    }
  };

  return { deletePost, error };
};