import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Upload, ArrowLeft, HelpCircle } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import './CustomQuillStyles.css'; 
import PostSettings from './PostSettings';
import { usePostEditor } from '../../hooks/usePostEditor';
import { usePostDelete } from '../../hooks/usePostDelete';

const PostEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const {
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
  } = usePostEditor({ postId: id });
  const { deletePost } = usePostDelete();

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ]
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'link', 'image'
  ];

  const handleBack = () => {
    const trimmedTitle = post.title.trim();
    const trimmedContent = post.content.trim();

    if (!trimmedTitle || !trimmedContent) {
      navigate('/');
      return;
    }

    saveDraft();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto p-6">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBack}
              className="text-gray-400 hover:text-white"
              disabled={isLoading}
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <span className="text-gray-400">Posts</span>
            <span className="text-gray-400">/</span>
            <span>New</span>
          </div>

          <div className="flex space-x-4">
            {post.title.trim() && post.content.trim() && (
              <button
                onClick={publishPost}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500 transition-colors"
                disabled={isLoading}
              >
                {isLoading ? 'Publishing...' : 'Publish'}
              </button>
            )}
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Settings
            </button>
          </div>
        </header>

        {errorMessage && (
          <div className="bg-red-500 text-white p-3 rounded mb-4">
            {errorMessage}
          </div>
        )}

        <div className="space-y-8">
          <div className="relative">
            {post.featuredImage ? (
              <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                <img
                  src={post.featuredImage}
                  alt="Featured"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-gray-800 p-2 rounded-full hover:bg-gray-700"
                >
                  ×
                </button>
              </div>
            ) : (
              <div className="mb-8">
                <label className="flex items-center justify-center w-full h-48 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-gray-500 transition-colors">
                  <div className="text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <span className="text-gray-400">Add feature image</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            )}
          </div>

          <input
            type="text"
            value={post.title}
            onChange={handleTitleChange}
            placeholder="Post title"
            className="w-full bg-transparent text-4xl font-bold placeholder-gray-600 focus:outline-none"
          />

          <div className="relative bg-gray-800 rounded-lg">
            <ReactQuill
              value={post.content}
              onChange={handleContentChange}
              modules={modules}
              formats={formats}
              placeholder="Begin writing your post..."
              theme="snow"
            />
            <div className="absolute bottom-4 right-4 flex items-center space-x-2 text-sm text-gray-400">
              <span>{wordCount} words</span>
              <HelpCircle className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {showSettings && (
        <div className="fixed top-0 right-0 w-80 h-full bg-gray-900 text-white shadow-lg z-50">
          <PostSettings
            tags={post.tags}
            excerpt={post.excerpt}
            onUpdateTags={handleTagsChange}
            onUpdateExcerpt={handleExcerptChange}
            onDelete={() => deletePost(parseInt(id!))}
          />
        </div>
      )}
    </div>
  );
};

export default PostEditor;