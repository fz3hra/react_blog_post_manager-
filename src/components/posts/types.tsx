export interface Post {
  id: number;
  content: string;
  createdAt: string;
  createdBy: string;
  status: number;
  viewCount: number;
  isPublished: boolean;
  title: string;
  description: string;
  tags: string[];
  featuredImageUrl: string | null;
  excerpt: string;
  featuredImage: string | null;
}

export interface PostEditorProps {
  onSubmit: (post: Post) => void;
  initialPost?: Post;
}

export interface PostListProps {
  posts: Post[];
  onDelete: (id: number) => void;
}