import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import usePosts from '../../hooks/usePosts';

const PublishedPage: React.FC = () => {
  const { posts, isLoading, error } = usePosts();

  if (isLoading) {
    return <div className="text-white text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  const publishedPosts = posts.filter(post => post.isPublished);

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-5xl mx-auto">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-semibold">Published Posts</h1>
            <Link
              to="/editor"
              className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200"
            >
              New post
            </Link>
          </header>

          <div className="space-y-6">
            {publishedPosts.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                No published posts yet. Start by publishing a draft!
              </div>
            ) : (
              publishedPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex justify-between items-center border-b border-gray-700 pb-6"
                >
                  <div className="space-y-1">
                    <h2 className="text-xl font-medium">{post.title}</h2>
                    <div className="text-gray-400 text-sm">
                      By {post.createdBy} - {new Date(post.createdAt).toLocaleDateString()}
                    </div>
                    <div className="text-green-500 text-sm">Published</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PublishedPage;