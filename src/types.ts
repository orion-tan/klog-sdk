/**
 * API 统一响应结构
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
}

/**
 * API 错误结构
 */
export interface ApiError {
  code: string;
  message: string;
}

/**
 * 分页响应结构
 */
export interface PaginatedResponse<T> {
  total: number;
  page: number;
  limit: number;
  data: T[];
}

/**
 * 用户模型
 */
export interface User {
  id: number;
  username: string;
  email: string;
  nickname: string;
  bio?: string | null;
  avatar_url?: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * 文章模型
 */
export interface Post {
  id: number;
  category_id?: number | null;
  author_id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  cover_image_url: string;
  status: 'draft' | 'published' | 'archived';
  view_count: number;
  published_at?: string | null;
  created_at: string;
  updated_at: string;
  category?: Category;
  author?: User;
  tags?: Tag[];
  comments?: Comment[];
}

/**
 * 分类模型
 */
export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
}

/**
 * 标签模型
 */
export interface Tag {
  id: number;
  name: string;
  slug: string;
}

/**
 * 评论模型
 */
export interface Comment {
  id: number;
  post_id: number;
  user_id?: number | null;
  name: string;
  email: string;
  content: string;
  ip: string;
  status: 'pending' | 'approved' | 'spam';
  parent_id?: number | null;
  created_at: string;
  post?: Post;
  user?: User;
  parent?: Comment;
  replies?: Comment[];
}

/**
 * 媒体文件模型
 */
export interface Media {
  id: number;
  file_name: string;
  file_path: string;
  file_hash: string;
  mime_type: string;
  size: number;
  created_at: string;
  updated_at: string;
}

/**
 * 用户注册请求
 */
export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  nickname: string;
}

/**
 * 用户登录请求
 */
export interface LoginRequest {
  login: string;
  password: string;
}

/**
 * 用户更新请求
 */
export interface UserUpdateRequest {
  nickname?: string;
  username?: string;
  avatar_url?: string;
  bio?: string;
  email?: string;
  old_password?: string;
  new_password?: string;
}

/**
 * 文章创建请求
 */
export interface PostCreateRequest {
  category_id?: number;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  cover_image_url?: string;
  status: 'draft' | 'published' | 'archived';
  tags?: string[];
}

/**
 * 文章更新请求
 */
export interface PostUpdateRequest {
  category_id?: number | null;
  title?: string;
  slug?: string;
  content?: string;
  excerpt?: string;
  cover_image_url?: string;
  status?: 'draft' | 'published' | 'archived';
  tags?: string[];
}

/**
 * 文章查询参数
 */
export interface PostQueryParams {
  page?: number;
  limit?: number;
  status?: 'draft' | 'published' | 'archived';
  category?: string;
  tag?: string;
  sortBy?: string;
  order?: 'asc' | 'desc';
  detail?: 0 | 1;
}

/**
 * 分类创建请求
 */
export interface CategoryCreateRequest {
  name: string;
  slug: string;
  description?: string;
}

/**
 * 分类更新请求
 */
export interface CategoryUpdateRequest {
  name?: string;
  slug?: string;
  description?: string;
}

/**
 * 标签创建请求
 */
export interface TagCreateRequest {
  name: string;
  slug: string;
}

/**
 * 标签更新请求
 */
export interface TagUpdateRequest {
  name?: string;
  slug?: string;
}

/**
 * 评论创建请求
 */
export interface CommentCreateRequest {
  content: string;
  parent_id?: number;
  name?: string;
  email?: string;
}

/**
 * 评论更新请求
 */
export interface CommentUpdateRequest {
  status: 'pending' | 'approved' | 'spam';
}

/**
 * 媒体上传请求（Base64）
 */
export interface MediaUploadRequest {
  file_name: string;
  data: string;
  mime_type: string;
}

/**
 * 媒体上传响应
 */
export interface MediaUploadResponse {
  id: number;
  file_name: string;
  file_path: string;
  file_hash: string;
  url: string;
  mime_type: string;
  size: number;
  created_at: string;
}

/**
 * 登录响应
 */
export interface LoginResponse {
  token: string;
}

/**
 * 用户信息响应
 */
export interface UserInfoResponse {
  id: number;
  username: string;
  email: string;
  nickname: string;
  bio?: string | null;
  avatar_url?: string | null;
}

/**
 * 注册响应
 */
export interface RegisterResponse {
  id: number;
  username: string;
  email: string;
  nickname: string;
}

