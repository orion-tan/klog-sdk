import type { KLogClient } from '../client';
import type { Comment, CommentCreateRequest, CommentUpdateRequest } from '../types';

/**
 * 评论服务
 */
export class CommentService {
  constructor(private client: KLogClient) {}

  /**
   * 获取文章的评论列表
   */
  async getCommentsByPostId(postId: number): Promise<Comment[]> {
    return this.client.get<Comment[]>(`/api/v1/posts/${postId}/comments`);
  }

  /**
   * 创建评论
   */
  async createComment(postId: number, data: CommentCreateRequest): Promise<Comment> {
    return this.client.post<Comment>(`/api/v1/posts/${postId}/comments`, data);
  }

  /**
   * 更新评论状态
   */
  async updateCommentStatus(id: number, data: CommentUpdateRequest): Promise<Comment> {
    return this.client.put<Comment>(`/api/v1/comments/${id}`, data);
  }

  /**
   * 删除评论
   */
  async deleteComment(id: number): Promise<void> {
    await this.client.delete(`/api/v1/comments/${id}`);
  }
}

