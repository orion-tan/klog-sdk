/**
 * Token 存储接口
 */
export interface TokenStorage {
  getToken(): string | null;
  setToken(token: string | null): void;
  clearToken(): void;
}

/**
 * LocalStorage 实现
 */
export class LocalStorageTokenStorage implements TokenStorage {
  private readonly key: string;

  constructor(key = 'klog_token') {
    this.key = key;
  }

  getToken(): string | null {
    try {
      return localStorage.getItem(this.key);
    } catch {
      return null;
    }
  }

  setToken(token: string | null): void {
    try {
      if (token) {
        localStorage.setItem(this.key, token);
      } else {
        this.clearToken();
      }
    } catch {
      // 忽略存储错误
    }
  }

  clearToken(): void {
    try {
      localStorage.removeItem(this.key);
    } catch {
      // 忽略存储错误
    }
  }
}

/**
 * 内存存储实现（用于 Node.js 环境）
 */
export class MemoryTokenStorage implements TokenStorage {
  private token: string | null = null;

  getToken(): string | null {
    return this.token;
  }

  setToken(token: string | null): void {
    this.token = token;
  }

  clearToken(): void {
    this.token = null;
  }
}

