import type { KLogClient } from '../client';
import type {
  Setting,
  SettingUpsertRequest,
  SettingBatchRequest,
  SettingBatchResponse,
  SettingsResponse,
} from '../types';

/**
 * 设置服务
 */
export class SettingService {
  constructor(private client: KLogClient) {}

  /**
   * 获取所有设置
   */
  async getSettings(): Promise<SettingsResponse> {
    return this.client.get<SettingsResponse>('/api/v1/settings');
  }

  /**
   * 获取单个设置
   */
  async getSetting(key: string): Promise<Setting> {
    return this.client.get<Setting>(`/api/v1/settings/${key}`);
  }

  /**
   * 创建/更新单个设置
   */
  async upsertSetting(data: SettingUpsertRequest): Promise<Setting> {
    return this.client.put<Setting>('/api/v1/settings', data);
  }

  /**
   * 批量创建/更新设置
   */
  async batchUpsertSettings(data: SettingBatchRequest): Promise<SettingBatchResponse> {
    return this.client.put<SettingBatchResponse>('/api/v1/settings/batch', data);
  }

  /**
   * 删除设置
   */
  async deleteSetting(key: string): Promise<void> {
    await this.client.delete(`/api/v1/settings/${key}`);
  }
}
