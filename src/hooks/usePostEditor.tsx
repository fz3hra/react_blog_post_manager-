import { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

interface Post {
  title: string;
  content: string;
  featuredImage: string | null;
  tags: string[];
  excerpt: string;
  isPublished: boolean;
}

interface UsePostEditorProps {
  postId?: string;
}

interface UsePostEditorReturn {
  post: Post;
  isLoading: boolean;
  errorMessage: string | null;
  wordCount: number;
  handleTitleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleContentChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  handleImageUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImage: () => void;
  handleTagsChange: (tags: string[]) => void;
  handleExcerptChange: (excerpt: string) => void;
  saveDraft: () => Promise<void>;
  publishPost: () => Promise<void>;
}

export const usePostEditor = ({ postId }: UsePostEditorProps = {}): UsePostEditorReturn => {
  const navigate = useNavigate();
  const [post, setPost] = useState<Post>({
    title: '',
    content: '',
    featuredImage: null,
    tags: [],
    excerpt: '',
    isPublished: false  
  });
  const [wordCount, setWordCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (postId) {
      fetchPost(postId);
    }
  }, [postId]);

  useEffect(() => {
    const words = post.content.trim().split(/\s+/).filter((word) => word.length > 0);
    setWordCount(words.length);
  }, [post.content]);

  const fetchPost = async (id: string) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('User is not authenticated');

      const response = await fetch(`http://localhost:8080/api/Post/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setPost({
          title: data.post.title,
          content: data.post.description,
          featuredImage: data.post.featuredImageUrl,
          tags: data.post.tags || [],
          excerpt: data.post.excerpt || '',
          isPublished: data.post.isPublished || false  
        });
      } else {
        throw new Error(data.message || 'Failed to fetch post');
      }
    } catch (error: unknown) {
      console.error('Error fetching post:', error);
      setErrorMessage('An error occurred while fetching the post');
    }
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPost((prev) => ({ ...prev, title: e.target.value }));
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPost((prev) => ({ ...prev, content: e.target.value }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPost((prev) => ({
          ...prev,
          featuredImage: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPost((prev) => ({ ...prev, featuredImage: null }));
  };

  const handleTagsChange = (tags: string[]) => {
    setPost((prev) => ({ ...prev, tags }));
  };

  const handleExcerptChange = (excerpt: string) => {
    setPost((prev) => ({ ...prev, excerpt }));
  };

  const createRequestBody = (shouldPublish: boolean) => {
   
    return {
      title: post.title,
      description: post.content,
      excerpt: post.excerpt,
      tags: post.tags,
      isPublished: shouldPublish,  
      featuredImage: post.featuredImage,
    };
  };

  const makeApiRequest = async (method: string, endpoint: string, body: any) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('User is not authenticated');
    }

    const response = await fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }
    return data;
  };

  const saveDraft = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const endpoint = `http://localhost:8080/api/Post${postId ? `/${postId}` : ''}`;
      const method = postId ? 'PUT' : 'POST';
      await makeApiRequest(method, endpoint, createRequestBody(false));  
      navigate('/');
    } catch (error: any) {
      console.error('Error saving draft:', error);
      setErrorMessage(error.message || 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const publishPost = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const endpoint = `http://localhost:8080/api/Post${postId ? `/${postId}` : ''}`;
      const method = postId ? 'PUT' : 'POST';
      
      await makeApiRequest(method, endpoint, createRequestBody(true));
      navigate('/');
    } catch (error: any) {
      console.error('Error publishing post:', error);
      setErrorMessage(error.message || 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };



  return {
    post,
    isLoading,
    errorMessage,
    wordCount,
    handleTitleChange,
    handleContentChange,
    handleImageUpload,
    handleRemoveImage,
    handleTagsChange,
    handleExcerptChange,
    saveDraft,
    publishPost,
  };
};