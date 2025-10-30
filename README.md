# KLog TypeScript SDK

KLog API 的官方 TypeScript SDK，提供完整的类型安全和良好的开发体验。

## 特性

- ✅ 完整的 TypeScript 类型定义
- ✅ 基于 Axios 的 HTTP 客户端
- ✅ 自动 Token 管理
- ✅ 统一的错误处理
- ✅ 支持浏览器和 Node.js 环境
- ✅ 模块化的服务设计

## 安装

使用 pnpm:

```bash
pnpm install @klog/sdk
```

使用 npm:

```bash
npm install @klog/sdk
```

使用 yarn:

```bash
yarn add @klog/sdk
```

## 快速开始

```typescript
import { KLogSDK } from '@klog/sdk';

// 初始化 SDK
const klog = new KLogSDK({
  baseURL: 'http://localhost:8080',
  onTokenExpired: () => {
    console.log('Token 已过期，请重新登录');
  },
});

// 用户登录
const { token } = await klog.auth.login({
  login: 'admin',
  password: 'password123',
});

// 获取文章列表
const posts = await klog.posts.getPosts({
  page: 1,
  limit: 10,
  status: 'published',
});

console.log('文章总数:', posts.total);
console.log('文章列表:', posts.data);
```

## API 文档

### 初始化

```typescript
const klog = new KLogSDK({
  baseURL: 'http://localhost:8080',  // API 基础 URL
  timeout: 30000,                     // 请求超时时间（可选）
  tokenStorage: customStorage,        // 自定义 Token 存储（可选）
  onTokenExpired: () => {             // Token 过期回调（可选）
    // 处理 Token 过期逻辑
  },
});
```

### 认证服务 (auth)

```typescript
// 用户注册
await klog.auth.register({
  username: 'user',
  email: 'user@example.com',
  password: 'password123',
  nickname: '用户昵称',
});

// 用户登录
const { token } = await klog.auth.login({
  login: 'admin',
  password: 'password123',
});

// 获取当前用户信息
const user = await klog.auth.getMe();

// 登出
await klog.auth.logout();
```

### 文章服务 (posts)

```typescript
// 获取文章列表
const posts = await klog.posts.getPosts({
  page: 1,
  limit: 10,
  status: 'published',
  sortBy: 'published_at',
  order: 'desc',
});

// 获取文章详情
const post = await klog.posts.getPost(1);

// 创建文章
const newPost = await klog.posts.createPost({
  title: '文章标题',
  slug: 'post-slug',
  content: '文章内容',
  excerpt: '文章摘要',
  status: 'published',
  category_id: 1,
  tags: ['tag1', 'tag2'],
});

// 更新文章
const updatedPost = await klog.posts.updatePost(1, {
  title: '新标题',
});

// 删除文章
await klog.posts.deletePost(1);
```

### 分类服务 (categories)

```typescript
// 获取所有分类
const categories = await klog.categories.getCategories();

// 创建分类
const category = await klog.categories.createCategory({
  name: '技术',
  slug: 'tech',
  description: '技术文章',
});

// 更新分类
await klog.categories.updateCategory(1, { name: '新名称' });

// 删除分类
await klog.categories.deleteCategory(1);
```

### 标签服务 (tags)

```typescript
// 获取所有标签
const tags = await klog.tags.getTags();

// 创建标签
const tag = await klog.tags.createTag({
  name: 'TypeScript',
  slug: 'typescript',
});

// 更新标签
await klog.tags.updateTag(1, { name: '新名称' });

// 删除标签
await klog.tags.deleteTag(1);
```

### 评论服务 (comments)

```typescript
// 获取文章评论
const comments = await klog.comments.getCommentsByPostId(1);

// 创建评论（游客）
await klog.comments.createComment(1, {
  content: '这是一条评论',
  name: '访客',
  email: 'guest@example.com',
});

// 创建评论（已登录用户）
await klog.comments.createComment(1, {
  content: '这是一条评论',
});

// 更新评论状态
await klog.comments.updateCommentStatus(1, {
  status: 'approved',
});

// 删除评论
await klog.comments.deleteComment(1);
```

### 媒体服务 (media)

```typescript
// 上传文件
const file = document.querySelector('input[type="file"]').files[0];
const result = await klog.media.uploadFile(file, (progress) => {
  console.log(`上传进度: ${progress}%`);
});

// 上传 Base64 图片
const result = await klog.media.uploadBase64({
  file_name: 'image.png',
  data: 'base64data...',
  mime_type: 'image/png',
});

// 获取媒体列表
const mediaList = await klog.media.getMediaList(1, 20);

// 删除媒体文件
await klog.media.deleteMedia(1);

// 获取媒体文件 URL
const url = klog.media.getMediaUrl('path/to/file.jpg');
```

### 用户服务 (users)

```typescript
// 获取用户信息
const user = await klog.users.getUser(1);

// 更新用户信息
const updatedUser = await klog.users.updateUser(1, {
  nickname: '新昵称',
  bio: '个人简介',
});
```

## 错误处理

SDK 提供了两种错误类型：

```typescript
import { KLogError, NetworkError } from '@klog/sdk';

try {
  await klog.posts.getPost(999);
} catch (error) {
  if (error instanceof KLogError) {
    // API 错误
    console.error('错误代码:', error.code);
    console.error('错误信息:', error.message);
    console.error('状态码:', error.statusCode);
    
    // 判断错误类型
    if (error.isAuthError()) {
      console.log('需要登录');
    } else if (error.isNotFoundError()) {
      console.log('资源不存在');
    } else if (error.isValidationError()) {
      console.log('参数验证失败');
    }
  } else if (error instanceof NetworkError) {
    // 网络错误
    console.error('网络错误:', error.message);
  }
}
```

## Token 管理

SDK 提供了两种 Token 存储方式：

### LocalStorage（默认，浏览器环境）

```typescript
import { LocalStorageTokenStorage } from '@klog/sdk';

const klog = new KLogSDK({
  baseURL: 'http://localhost:8080',
  tokenStorage: new LocalStorageTokenStorage('my_token_key'),
});
```

### MemoryStorage（Node.js 环境）

```typescript
import { MemoryTokenStorage } from '@klog/sdk';

const klog = new KLogSDK({
  baseURL: 'http://localhost:8080',
  tokenStorage: new MemoryTokenStorage(),
});
```

### 自定义存储

```typescript
import { TokenStorage } from '@klog/sdk';

class CustomTokenStorage implements TokenStorage {
  getToken(): string | null {
    // 自定义获取逻辑
  }
  
  setToken(token: string | null): void {
    // 自定义保存逻辑
  }
  
  clearToken(): void {
    // 自定义清除逻辑
  }
}

const klog = new KLogSDK({
  baseURL: 'http://localhost:8080',
  tokenStorage: new CustomTokenStorage(),
});
```

## 开发

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建
pnpm build

# 代码检查
pnpm lint

# 运行测试
pnpm test
```

## 许可证

MIT

