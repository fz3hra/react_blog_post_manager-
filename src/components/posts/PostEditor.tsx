import React, { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Upload, ArrowLeft, HelpCircle } from 'lucide-react';
import PostSettings from './PostSettings';
import { usePostEditor } from '../../hooks/usePostEditor';

const PostEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [authors, setAuthors] = useState<string[]>(['Default Author']);

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
    deletePost,
  } = usePostEditor({ postId: id });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await publishPost();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto p-6">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={saveDraft}
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
                type="submit"
                form="post-editor-form"
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
              Open Settings
            </button>
          </div>
        </header>

        {errorMessage && (
          <div className="bg-red-500 text-white p-3 rounded mb-4">
            {errorMessage}
          </div>
        )}

        <form id="post-editor-form" onSubmit={handleSubmit} className="space-y-8">
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

      {showSettings && (
        <div className="fixed top-0 right-0 w-80 h-full bg-gray-900 text-white shadow-lg z-50">
          <PostSettings
            tags={post.tags}
            authors={authors}
            excerpt={post.excerpt}
            onUpdateTags={handleTagsChange}
            onUpdateAuthors={setAuthors}
            onUpdateExcerpt={handleExcerptChange}
            onDelete={deletePost}
          />
        </div>
      )}
    </div>
  );
};

export default PostEditor;