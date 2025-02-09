export interface Post {
  id?: number;
  title: string;
  content: string;
  featuredImage: string | null;
  author?: string;
  createdAt?: string;
  status?: 'Draft' | 'Published';  
}

export interface PostEditorProps {
  onSubmit: (post: Post) => void;
  initialPost?: Post;
}

export interface PostListProps {
  posts: Post[];
  onDelete: (id: number) => void;
}