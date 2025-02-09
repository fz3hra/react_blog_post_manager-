import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Upload, ArrowLeft, HelpCircle } from 'lucide-react';

interface Post {
  title: string;
  content: string;
  featuredImage: string | null;
}

const PostEditor: React.FC = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState<Post>({
    title: '',
    content: '',
    featuredImage: null
  });
  const [wordCount, setWordCount] = useState<number>(0);

  useEffect(() => {
    const words = post.content.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  }, [post.content]);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPost(prev => ({
          ...prev,
          featuredImage: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/');
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPost(prev => ({ ...prev, title: e.target.value }));
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPost(prev => ({ ...prev, content: e.target.value }));
  };

  const handleRemoveImage = (): void => {
    setPost(prev => ({ ...prev, featuredImage: null }));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto p-6">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-400 hover:text-white">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <span className="text-gray-400">Posts</span>
            <span className="text-gray-400">/</span>
            <span>New</span>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="relative">
            {post.featuredImage ? (
              <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                <img 
                  src={post.featuredImage} 
                  alt="Featured" 
                  className="w-full h-full object-cover"
                />
                <button 
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-gray-800 p-2 rounded-full"
                >
                  ×
                </button>
              </div>
            ) : (
              <div className="mb-8">
                <label 
                  htmlFor="feature-image"
                  className="flex items-center justify-center w-full h-48 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-gray-500 transition-colors"
                >
                  <div className="text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <span className="text-gray-400">Add feature image</span>
                  </div>
                </label>
                <input
                  id="feature-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            )}
          </div>

          <div>
            <input
              type="text"
              value={post.title}
              onChange={handleTitleChange}
              placeholder="Post title"
              className="w-full bg-transparent text-4xl font-bold placeholder-gray-600 focus:outline-none"
            />
          </div>

          <div className="relative">
            <textarea
              value={post.content}
              onChange={handleContentChange}
              placeholder="Begin writing your post..."
              className="w-full min-h-[400px] bg-transparent text-lg placeholder-gray-600 focus:outline-none resize-none"
            />
            <div className="absolute bottom-4 right-4 flex items-center space-x-2 text-sm text-gray-400">
              <span>{wordCount} words</span>
              <HelpCircle className="w-4 h-4" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostEditor;