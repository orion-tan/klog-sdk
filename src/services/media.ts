import type { KLogClient } from '../client';
import type {
  Media,
  MediaUploadRequest,
  MediaUploadResponse,
  PaginatedResponse,
} from '../types';

/**
 * 媒体服务
 */
export class MediaService {
  constructor(private client: KLogClient) {}

  /**
   * 上传文件（multipart）
   */
  async uploadFile(
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<MediaUploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    return this.client.upload<MediaUploadResponse>(
      '/api/v1/media/upload',
      formData,
      onProgress
    );
  }

  /**
   * 上传文件（Base64）
   */
  async uploadBase64(data: MediaUploadRequest): Promise<MediaUploadResponse> {
    return this.client.post<MediaUploadResponse>('/api/v1/media/upload', data);
  }

  /**
   * 获取媒体列表
   */
  async getMediaList(page = 1, limit = 20): Promise<PaginatedResponse<Media>> {
    return this.client.get<PaginatedResponse<Media>>('/api/v1/media', {
      params: { page, limit },
    });
  }

  /**
   * 删除媒体文件
   */
  async deleteMedia(id: number): Promise<void> {
    await this.client.delete(`/api/v1/media/${id}`);
  }

  /**
   * 获取媒体文件 URL
   */
  getMediaUrl(filePath: string): string {
    return `${this.client.getBaseURL()}/api/v1/media/i/${filePath}`;
  }
}

