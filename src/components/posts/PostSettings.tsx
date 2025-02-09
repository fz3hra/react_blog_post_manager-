import React, { useState } from 'react';

interface PostSettingsProps {
  tags: string[];
  excerpt: string;
  onUpdateTags: (tags: string[]) => void;
  onUpdateExcerpt: (excerpt: string) => void;
  onDelete: () => void;
}

const PostSettings: React.FC<PostSettingsProps> = ({
  tags,
  excerpt,
  onUpdateTags,
  onUpdateExcerpt,
  onDelete,
}) => {
  const [newTag, setNewTag] = useState('');

  const handleAddTag = () => {
    if (newTag.trim()) {
      onUpdateTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    onUpdateTags(tags.filter((t) => t !== tag));
  };

  return (
    <div className="p-6 bg-gray-800 text-white rounded-md shadow-lg space-y-6">
      <h2 className="text-xl font-semibold">Post Settings</h2>

      <div>
        <h3 className="text-lg font-medium mb-2">Tags</h3>
        <div className="space-y-2">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-700 px-3 py-2 rounded-md"
            >
              <span>{tag}</span>
              <button
                onClick={() => handleRemoveTag(tag)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className="flex mt-4">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Add a new tag"
            className="flex-grow p-2 bg-gray-800 border border-gray-700 rounded-l-md focus:outline-none"
          />
          <button
            onClick={handleAddTag}
            className="px-4 bg-green-600 text-white rounded-r-md hover:bg-green-500"
          >
            Add
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Excerpt</h3>
        <textarea
          value={excerpt}
          onChange={(e) => onUpdateExcerpt(e.target.value)}
          placeholder="Write a brief excerpt for the post"
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none resize-none"
          rows={4}
        ></textarea>
      </div>

      <div>
        <button
          onClick={onDelete}
          className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-500"
        >
          Delete Post
        </button>
      </div>
    </div>
  );
};

export default PostSettings;


