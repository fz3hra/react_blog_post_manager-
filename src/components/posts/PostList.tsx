import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react';
import MainLayout from '../../layouts/MainLayout';
import usePosts from '../../hooks/usePosts';
import { usePostDelete } from '../../hooks/usePostDelete';

const PostList: React.FC = () => {
  const { posts, isLoading, error } = usePosts();
  const { deletePost } = usePostDelete();
  const [selectedPosts, setSelectedPosts] = useState<number[]>([]);

  const handleDelete = async (postId: number) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      const success = await deletePost(postId);
      if (success) window.location.reload();
    }
  };

  const handleBatchDelete = async () => {
    if (window.confirm('Are you sure you want to delete the selected posts?')) {
      for (const postId of selectedPosts) {
        await deletePost(postId);
      }
      window.location.reload();
    }
  };

  const toggleSelection = (postId: number) => {
    setSelectedPosts((prevSelected) =>
      prevSelected.includes(postId)
        ? prevSelected.filter((id) => id !== postId)
        : [...prevSelected, postId]
    );
  };

  if (isLoading) {
    return <div className="text-white text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-5xl mx-auto">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-semibold">Posts</h1>
            <div className="flex space-x-2">
              <Link
                to="/editor"
                className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200"
              >
                New post
              </Link>
              {selectedPosts.length > 0 && (
                <button
                  onClick={handleBatchDelete}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                >
                  Delete Selected
                </button>
              )}
            </div>
          </header>

          <div className="space-y-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex items-start justify-between border-b border-gray-700 pb-6"
              >
                <div className="flex items-center space-x-4 w-full">
                  <input
                    type="checkbox"
                    checked={selectedPosts.includes(post.id)}
                    onChange={() => toggleSelection(post.id)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <div className="flex-1">
                    <h2 className="text-xl font-medium">{post.title}</h2>
                    <div className="text-gray-400 text-sm">
                      By {post.createdBy} - {new Date(post.createdAt).toLocaleDateString()}
                    </div>
                    {!post.isPublished && (
                      <div className="text-pink-500 text-sm">Draft</div>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  {!post.isPublished && (
                    <Link
                      to={`/editor/${post.id}`}
                      className="p-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
                    >
                      <Pencil className="w-5 h-5" />
                    </Link>
                  )}
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    title="Delete post"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PostList;
