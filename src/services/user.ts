import type { KLogClient } from '../client';
import type { UserInfoResponse, UserUpdateRequest } from '../types';

/**
 * 用户服务
 */
export class UserService {
  constructor(private client: KLogClient) {}

  /**
   * 获取用户信息
   */
  async getUser(id: number): Promise<UserInfoResponse> {
    return this.client.get<UserInfoResponse>(`/api/v1/users/${id}`);
  }

  /**
   * 更新用户信息
   */
  async updateUser(id: number, data: UserUpdateRequest): Promise<UserInfoResponse> {
    return this.client.put<UserInfoResponse>(`/api/v1/users/${id}`, data);
  }
}

