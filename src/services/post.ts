import type { KLogClient } from '../client';
import type {
  Post,
  PostCreateRequest,
  PostUpdateRequest,
  PostQueryParams,
  PaginatedResponse,
} from '../types';

/**
 * 文章服务
 */
export class PostService {
  constructor(private client: KLogClient) {}

  /**
   * 获取文章列表
   */
  async getPosts(params?: PostQueryParams): Promise<PaginatedResponse<Post>> {
    return this.client.get<PaginatedResponse<Post>>('/api/v1/posts', { params });
  }

  /**
   * 获取文章详情
   */
  async getPost(id: number): Promise<Post> {
    return this.client.get<Post>(`/api/v1/posts/${id}`);
  }

  /**
   * 创建文章
   */
  async createPost(data: PostCreateRequest): Promise<Post> {
    return this.client.post<Post>('/api/v1/posts', data);
  }

  /**
   * 更新文章
   */
  async updatePost(id: number, data: PostUpdateRequest): Promise<Post> {
    return this.client.put<Post>(`/api/v1/posts/${id}`, data);
  }

  /**
   * 删除文章
   */
  async deletePost(id: number): Promise<void> {
    await this.client.delete(`/api/v1/posts/${id}`);
  }
}

