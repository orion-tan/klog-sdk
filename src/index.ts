import { KLogClient } from './client';
import { AuthService } from './services/auth';
import { PostService } from './services/post';
import { CategoryService } from './services/category';
import { TagService } from './services/tag';
import { CommentService } from './services/comment';
import { MediaService } from './services/media';
import { UserService } from './services/user';
import { SettingService } from './services/setting';
import { LocalStorageTokenStorage, TokenStorage } from './utils/storage';

/**
 * KLog SDK 配置
 */
export interface KLogSDKConfig {
  baseURL: string;
  timeout?: number;
  tokenStorage?: TokenStorage;
  onTokenExpired?: () => void;
}

/**
 * KLog SDK 主类
 */
export class KLogSDK {
  private client: KLogClient;
  private tokenStorage?: TokenStorage;

  // 各个服务实例
  public auth: AuthService;
  public posts: PostService;
  public categories: CategoryService;
  public tags: TagService;
  public comments: CommentService;
  public media: MediaService;
  public users: UserService;
  public settings: SettingService;

  constructor(config: KLogSDKConfig) {
    this.tokenStorage = config.tokenStorage || new LocalStorageTokenStorage();

    // 创建客户端
    this.client = new KLogClient({
      baseURL: config.baseURL,
      timeout: config.timeout,
      getToken: () => this.tokenStorage?.getToken() ?? null,
      setToken: (token) => this.tokenStorage?.setToken(token ?? null),
      onTokenExpired: config.onTokenExpired,
    });

    // 初始化各个服务
    this.auth = new AuthService(this.client);
    this.posts = new PostService(this.client);
    this.categories = new CategoryService(this.client);
    this.tags = new TagService(this.client);
    this.comments = new CommentService(this.client);
    this.media = new MediaService(this.client);
    this.users = new UserService(this.client);
    this.settings = new SettingService(this.client);
  }

  /**
   * 获取当前 token
   */
  getToken(): string | null {
    return this.client.getToken();
  }

  /**
   * 设置 token
   */
  setToken(token: string | null): void {
    this.client.setToken(token);
  }

  /**
   * 清除 token
   */
  clearToken(): void {
    this.tokenStorage?.clearToken();
  }

  /**
   * 检查是否已认证
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

// 导出所有类型和类
export * from './types';
export * from './errors';
export * from './client';
export * from './utils/storage';

