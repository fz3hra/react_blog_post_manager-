import React from 'react';
import { Link } from 'react-router-dom';
import { Pencil } from 'lucide-react';
import { Post } from './types';
import MainLayout from '../../layouts/MainLayout';

interface PostListProps {
  posts: Post[];
  onDelete?: (id: number) => void;
}

const PostList: React.FC<PostListProps> = ({ posts, onDelete }) => {
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

        <div className="flex gap-4 mb-8">
          <select className="bg-gray-800 px-4 py-2 rounded-md">
            <option>All posts</option>
          </select>
          <select className="bg-gray-800 px-4 py-2 rounded-md">
            <option>All access</option>
          </select>
          <select className="bg-gray-800 px-4 py-2 rounded-md">
            <option>All authors</option>
          </select>
          <select className="bg-gray-800 px-4 py-2 rounded-md">
            <option>All tags</option>
          </select>
          <select className="bg-gray-800 px-4 py-2 rounded-md">
            <option>Newest first</option>
          </select>
        </div>

        <div className="space-y-6">
          {posts.map((post) => (
            <div 
              key={post.id}
              className="flex justify-between items-center border-b border-gray-700 pb-6"
            >
              <div className="space-y-1">
                <h2 className="text-xl font-medium">{post.title}</h2>
                <div className="text-gray-400 text-sm">
                  By {post.author} - {post.createdAt}
                </div>
                {post.status && (
                  <div className="text-pink-500 text-sm">{post.status}</div>
                )}
              </div>
              <div className="flex space-x-2">
                <Link 
                  to={`/edit/${post.id}`}
                  className="p-2 hover:bg-gray-800 rounded-md"
                >
                  <Pencil className="w-5 h-5 text-gray-400" />
                </Link>
                {onDelete && (
                  <button 
                    onClick={() => onDelete(post.id!)}
                    className="p-2 hover:bg-gray-800 rounded-md text-red-400"
                  >
                    ×
                  </button>
                )}
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