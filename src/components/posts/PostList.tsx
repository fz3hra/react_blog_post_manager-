import React from 'react';
import { Link } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react';
import MainLayout from '../../layouts/MainLayout';
import usePosts from '../../hooks/usePosts';
import { usePostDelete } from '../../hooks/usePostDelete';

const PostList: React.FC = () => {
  const { posts, isLoading, error } = usePosts();
  const { deletePost } = usePostDelete();

  const handleDelete = async (postId: number) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      const success = await deletePost(postId);
      if (success) window.location.reload();
    }
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
            <Link
              to="/editor"
              className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200"
            >
              New post
            </Link>
          </header>

          <div className="space-y-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex justify-between items-center border-b border-gray-700 pb-6"
              >
                <div className="space-y-1">
                  <h2 className="text-xl font-medium">{post.title}</h2>
                  <div className="text-gray-400 text-sm">
                    By {post.createdBy} - {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                  {!post.isPublished && (
                    <div className="text-pink-500 text-sm">Draft</div>
                  )}
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
