export interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  published: boolean;
  tags?: string[];
}

export interface PostCreateInput {
  title: string;
  content: string;
  published?: boolean;
  tags?: string[];
}

export interface PostUpdateInput {
  title?: string;
  content?: string;
  published?: boolean;
  tags?: string[];
}

export interface PostListResponse {
  posts: Post[];
  total: number;
  page: number;
  pageSize: number;
}

export interface PostSearchParams {
  query?: string;
  authorId?: number;
  tags?: string[];
  published?: boolean;
  page?: number;
  pageSize?: number;
}