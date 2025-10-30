import type { KLogClient } from '../client';
import type {
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
  UserInfoResponse,
} from '../types';

/**
 * 认证服务
 */
export class AuthService {
  constructor(private client: KLogClient) {}

  /**
   * 用户注册
   */
  async register(data: RegisterRequest): Promise<RegisterResponse> {
    return this.client.post<RegisterResponse>('/api/v1/auth/register', data);
  }

  /**
   * 用户登录
   */
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await this.client.post<LoginResponse>('/api/v1/auth/login', data);
    // 自动保存 token
    this.client.setToken(response.token);
    return response;
  }

  /**
   * 获取当前用户信息
   */
  async getMe(): Promise<UserInfoResponse> {
    return this.client.get<UserInfoResponse>('/api/v1/auth/me');
  }

  /**
   * 登出
   */
  async logout(): Promise<void> {
    await this.client.post('/api/v1/auth/logout');
    // 清除 token
    this.client.setToken(null);
  }
}

