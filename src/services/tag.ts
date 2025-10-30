import type { KLogClient } from '../client';
import type { Tag, TagCreateRequest, TagUpdateRequest } from '../types';

/**
 * 标签服务
 */
export class TagService {
  constructor(private client: KLogClient) {}

  /**
   * 获取所有标签
   */
  async getTags(): Promise<Tag[]> {
    return this.client.get<Tag[]>('/api/v1/tags');
  }

  /**
   * 创建标签
   */
  async createTag(data: TagCreateRequest): Promise<Tag> {
    return this.client.post<Tag>('/api/v1/tags', data);
  }

  /**
   * 更新标签
   */
  async updateTag(id: number, data: TagUpdateRequest): Promise<Tag> {
    return this.client.put<Tag>(`/api/v1/tags/${id}`, data);
  }

  /**
   * 删除标签
   */
  async deleteTag(id: number): Promise<void> {
    await this.client.delete(`/api/v1/tags/${id}`);
  }
}

