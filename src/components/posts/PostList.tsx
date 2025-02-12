import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Pencil, Trash2, X, Loader2 } from 'lucide-react';
import MainLayout from '../../layouts/MainLayout';
import usePosts from '../../hooks/usePosts';
import { usePostDelete } from '../../hooks/usePostDelete';

const Modal = ({ isOpen, onClose, onConfirm, title, description, isLoading }: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  isLoading?: boolean;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white" disabled={isLoading}>
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-gray-300 mb-6">{description}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 disabled:opacity-50"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 flex items-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Deleting...
              </>
            ) : (
              'Delete'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const PostList: React.FC = () => {
  const { posts, isLoading, error, refetch } = usePosts();
  const { deletePost } = usePostDelete();
  const [selectedPosts, setSelectedPosts] = useState<number[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<number | null>(null);
  const [isBatchDeleteModalOpen, setIsBatchDeleteModalOpen] = useState(false);
  const [deletingPosts, setDeletingPosts] = useState<number[]>([]);

  const handleDelete = (postId: number) => {
    setPostToDelete(postId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (postToDelete) {
      setDeletingPosts(prev => [...prev, postToDelete]);
      try {
        await deletePost(postToDelete);
        await refetch();
        setSelectedPosts(prev => prev.filter(id => id !== postToDelete));
      } finally {
        setDeletingPosts(prev => prev.filter(id => id !== postToDelete));
        setIsDeleteModalOpen(false);
      }
    }
  };

  const handleBatchDelete = () => {
    setIsBatchDeleteModalOpen(true);
  };

  const confirmBatchDelete = async () => {
    setDeletingPosts(selectedPosts);
    try {
      await Promise.all(selectedPosts.map(id => deletePost(id)));
      await refetch();
      setSelectedPosts([]);
    } finally {
      setDeletingPosts([]);
      setIsBatchDeleteModalOpen(false);
    }
  };

  const toggleSelection = (postId: number) => {
    setSelectedPosts((prevSelected) =>
      prevSelected.includes(postId)
        ? prevSelected.filter((id) => id !== postId)
        : [...prevSelected, postId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedPosts.length === posts.length) {
      setSelectedPosts([]);
    } else {
      setSelectedPosts(posts.map(post => post.id));
    }
  };

  if (isLoading) return <div className="text-white text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-5xl mx-auto">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-semibold">Posts</h1>
            {posts.length > 0 && (
              <div className="flex space-x-2">
                <button
                  onClick={toggleSelectAll}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  {selectedPosts.length === posts.length ? 'Deselect All' : 'Select All'}
                </button>
                <Link
                  to="/editor"
                  className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200"
                >
                  New post
                </Link>
                {selectedPosts.length > 0 && (
                  <button
                    onClick={handleBatchDelete}
                    disabled={deletingPosts.length > 0}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:opacity-50 flex items-center"
                  >
                    {deletingPosts.length > 0 ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      'Delete Selected'
                    )}
                  </button>
                )}
              </div>
            )}
          </header>

          <div className="space-y-6">
            {posts.length === 0 ? (
              <div className="flex flex-col items-center justify-center space-y-4 py-16 bg-gray-800 rounded-lg">
                <p className="text-gray-400 text-lg">No posts yet</p>
                <Link
                  to="/editor"
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Create your first post
                </Link>
              </div>
            ) : (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-start justify-between border-b border-gray-700 pb-6"
                >
                  <div className="flex items-center space-x-4 w-full">
                    <input
                      type="checkbox"
                      checked={selectedPosts.includes(post.id)}
                      onChange={() => toggleSelection(post.id)}
                      disabled={deletingPosts.includes(post.id)}
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
                      disabled={deletingPosts.includes(post.id)}
                      className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                      title="Delete post"
                    >
                      {deletingPosts.includes(post.id) ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Trash2 className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <Modal
            isOpen={isDeleteModalOpen}
            onClose={() => deletingPosts.length === 0 && setIsDeleteModalOpen(false)}
            onConfirm={confirmDelete}
            title="Delete Post"
            description="Are you sure you want to delete this post? This action cannot be undone."
            isLoading={deletingPosts.includes(postToDelete || -1)}
          />

          <Modal
            isOpen={isBatchDeleteModalOpen}
            onClose={() => deletingPosts.length === 0 && setIsBatchDeleteModalOpen(false)}
            onConfirm={confirmBatchDelete}
            title="Delete Multiple Posts"
            description={`Are you sure you want to delete ${selectedPosts.length} selected posts? This action cannot be undone.`}
            isLoading={deletingPosts.length > 0}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default PostList;