import type { ApiError } from './types';

/**
 * KLog API 错误类
 */
export class KLogError extends Error {
  public code: string;
  public statusCode?: number;

  constructor(error: ApiError, statusCode?: number) {
    super(error.message);
    this.name = 'KLogError';
    this.code = error.code;
    this.statusCode = statusCode;
    
    // 维护正确的堆栈跟踪
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, KLogError);
    }
  }

  /**
   * 判断是否为认证错误
   */
  isAuthError(): boolean {
    return this.code === 'UNAUTHORIZED' || this.statusCode === 401;
  }

  /**
   * 判断是否为权限错误
   */
  isForbiddenError(): boolean {
    return this.code === 'FORBIDDEN' || this.statusCode === 403;
  }

  /**
   * 判断是否为未找到错误
   */
  isNotFoundError(): boolean {
    return this.statusCode === 404;
  }

  /**
   * 判断是否为验证错误
   */
  isValidationError(): boolean {
    return this.code === 'INVALID_PARAMS' || this.statusCode === 400;
  }
}

/**
 * 网络错误类
 */
export class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NetworkError';
    
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NetworkError);
    }
  }
}

