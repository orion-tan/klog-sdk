import type { KLogClient } from '../client';
import type { Category, CategoryCreateRequest, CategoryUpdateRequest } from '../types';

/**
 * 分类服务
 */
export class CategoryService {
  constructor(private client: KLogClient) {}

  /**
   * 获取所有分类
   */
  async getCategories(): Promise<Category[]> {
    return this.client.get<Category[]>('/api/v1/categories');
  }

  /**
   * 创建分类
   */
  async createCategory(data: CategoryCreateRequest): Promise<Category> {
    return this.client.post<Category>('/api/v1/categories', data);
  }

  /**
   * 更新分类
   */
  async updateCategory(id: number, data: CategoryUpdateRequest): Promise<Category> {
    return this.client.put<Category>(`/api/v1/categories/${id}`, data);
  }

  /**
   * 删除分类
   */
  async deleteCategory(id: number): Promise<void> {
    await this.client.delete(`/api/v1/categories/${id}`);
  }
}

