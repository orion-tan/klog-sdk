import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { ApiResponse } from './types';
import { KLogError, NetworkError } from './errors';

/**
 * API 客户端配置
 */
export interface KLogClientConfig {
  baseURL: string;
  timeout?: number;
  onTokenExpired?: () => void;
  getToken?: () => string | null;
  setToken?: (token: string | null) => void;
}

/**
 * KLog API 客户端基类
 */
export class KLogClient {
  private axios: AxiosInstance;
  private config: KLogClientConfig;
  private token: string | null = null;

  constructor(config: KLogClientConfig) {
    this.config = {
      timeout: 30000,
      ...config,
    };

    // 创建 axios 实例
    this.axios = axios.create({
      baseURL: this.config.baseURL,
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // 设置请求拦截器
    this.axios.interceptors.request.use(
      (config) => {
        // 自动添加 token
        const token = this.getToken();
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // 设置响应拦截器
    this.axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        // 处理网络错误
        if (!error.response) {
          throw new NetworkError('网络请求失败，请检查网络连接');
        }

        const response = error.response as AxiosResponse<ApiResponse>;
        const data = response.data;

        // 处理 token 过期
        if (response.status === 401 && this.config.onTokenExpired) {
          this.config.onTokenExpired();
        }

        // 抛出 KLog 错误
        if (data && data.error) {
          throw new KLogError(data.error, response.status);
        }

        throw new NetworkError(`请求失败: ${response.status}`);
      }
    );
  }

  /**
   * 获取 token
   */
  getToken(): string | null {
    if (this.config.getToken) {
      return this.config.getToken();
    }
    return this.token;
  }

  /**
   * 设置 token
   */
  setToken(token: string | null): void {
    this.token = token;
    if (this.config.setToken) {
      this.config.setToken(token);
    }
  }

  /**
   * 发起 GET 请求
   */
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axios.get<ApiResponse<T>>(url, config);
    return response.data.data as T;
  }

  /**
   * 发起 POST 请求
   */
  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axios.post<ApiResponse<T>>(url, data, config);
    return response.data.data as T;
  }

  /**
   * 发起 PUT 请求
   */
  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axios.put<ApiResponse<T>>(url, data, config);
    return response.data.data as T;
  }

  /**
   * 发起 DELETE 请求
   */
  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axios.delete<ApiResponse<T>>(url, config);
    // DELETE 请求可能返回 204 No Content
    return response.data?.data as T;
  }

  /**
   * 上传文件（multipart/form-data）
   */
  async upload<T = any>(url: string, formData: FormData, onProgress?: (progress: number) => void): Promise<T> {
    const response = await this.axios.post<ApiResponse<T>>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(progress);
        }
      },
    });
    return response.data.data as T;
  }
}

