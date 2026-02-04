# 快速开始指南

## 前置要求

- Node.js 18+ 
- npm/yarn/pnpm
- 后端服务运行在 http://localhost:8000

## 安装步骤

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.example` 到 `.env`：

```bash
cp .env.example .env
```

编辑 `.env` 文件：

```env
VITE_API_URL=http://localhost:8000
```

### 3. 生成 API 客户端

确保后端服务正在运行，然后执行：

```bash
npm run generate-client
```

这将从后端的 OpenAPI 规范生成 TypeScript 客户端代码。

### 4. 启动开发服务器

```bash
npm run dev
```

应用将在 http://localhost:5173 启动

## 可用命令

```bash
# 开发模式
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview

# 生成 API 客户端
npm run generate-client
```

## 默认账户

如果后端已初始化，可以使用以下账户登录：

- **管理员账户**
  - Email: admin@example.com
  - Password: changethis

- **普通用户**
  - Email: user@example.com  
  - Password: changethis

## 项目结构

```
frontend-vue/
├── public/              # 静态资源
├── src/
│   ├── client/          # API 客户端（自动生成）
│   ├── components/      # Vue 组件
│   ├── hooks/           # 组合式函数
│   ├── layouts/         # 布局组件
│   ├── lib/             # 工具库
│   ├── router/          # 路由配置
│   ├── views/           # 页面视图
│   ├── App.vue          # 根组件
│   ├── main.ts          # 应用入口
│   └── index.css        # 全局样式
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 主要功能

### 认证
- ✅ 登录/注册
- ✅ 密码恢复
- ✅ 自动令牌管理

### 用户管理
- ✅ 个人资料编辑
- ✅ 修改密码
- ✅ 账户删除

### 管理员功能
- ✅ 用户管理
- ✅ 系统设置

### UI/UX
- ✅ 响应式设计
- ✅ 深色/浅色主题
- ✅ Toast 通知
- ✅ 加载状态

## 开发建议

1. **使用 TypeScript**: 充分利用类型系统
2. **组合式函数**: 提取可复用逻辑到 `hooks/` 目录
3. **组件拆分**: 保持组件小而专注
4. **样式管理**: 使用 Tailwind CSS 工具类
5. **状态管理**: 使用 TanStack Query 处理服务器状态

## 常见问题

### API 客户端生成失败

确保后端服务正在运行：

```bash
curl http://localhost:8000/api/v1/openapi.json
```

### 端口冲突

如果 5173 端口被占用，Vite 会自动使用下一个可用端口。

### 类型错误

重新生成 API 客户端：

```bash
npm run generate-client
```

## 下一步

- 阅读 [README.md](./README.md) 了解详细信息
- 查看 [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) 了解从 React 迁移的详情
- 浏览 `src/` 目录了解代码结构

## 获取帮助

如果遇到问题：

1. 检查控制台错误信息
2. 确认后端服务正常运行
3. 查看浏览器开发者工具的网络标签
4. 使用 Vue DevTools 调试组件状态

祝你开发愉快！🚀
