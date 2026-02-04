# Frontend Vue

这是从 React + TypeScript 转换为 Vue 3 + TypeScript + Vite 的前端项目。

## 技术栈

- **Vue 3** - 渐进式 JavaScript 框架
- **TypeScript** - 类型安全的 JavaScript 超集
- **Vite** - 下一代前端构建工具
- **Vue Router** - Vue.js 官方路由
- **TanStack Query (Vue Query)** - 强大的异步状态管理
- **Tailwind CSS 4** - 实用优先的 CSS 框架
- **Radix Vue** - 无样式、可访问的 UI 组件
- **Lucide Vue** - 美观的图标库
- **Axios** - HTTP 客户端
- **Zod** - TypeScript 优先的模式验证
- **VueUse** - Vue 组合式 API 工具集

## 项目结构

```
frontend-vue/
├── public/              # 静态资源
│   └── assets/
│       └── images/      # 图片资源
├── src/
│   ├── client/          # API 客户端（自动生成）
│   ├── components/      # Vue 组件
│   │   ├── Admin/       # 管理员相关组件
│   │   ├── Common/      # 通用组件
│   │   ├── Items/       # 项目相关组件
│   │   ├── Pending/     # 加载状态组件
│   │   ├── Sidebar/     # 侧边栏组件
│   │   ├── UserSettings/# 用户设置组件
│   │   └── ui/          # 基础 UI 组件
│   ├── hooks/           # 组合式函数
│   ├── layouts/         # 布局组件
│   ├── lib/             # 工具库
│   ├── router/          # 路由配置
│   ├── views/           # 页面视图
│   │   └── _layout/     # 需要认证的页面
│   ├── App.vue          # 根组件
│   ├── main.ts          # 应用入口
│   ├── index.css        # 全局样式
│   ├── utils.ts         # 工具函数
│   └── vite-env.d.ts    # TypeScript 类型声明
├── index.html           # HTML 入口
├── package.json         # 项目依赖
├── tsconfig.json        # TypeScript 配置
├── vite.config.ts       # Vite 配置
└── .env                 # 环境变量

```

## 开始使用

### 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 生成 API 客户端

在启动开发服务器之前，需要先生成 API 客户端代码：

```bash
# 确保后端服务正在运行在 http://localhost:8000
npm run generate-client
```

### 开发模式

```bash
npm run dev
```

应用将在 http://localhost:5173 启动

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录

### 预览生产构建

```bash
npm run preview
```

## 主要功能

### 认证系统
- ✅ 用户登录
- ✅ 用户注册
- ✅ 密码恢复
- ✅ 密码重置
- ✅ 自动令牌管理

### 用户管理
- ✅ 用户个人资料
- ✅ 修改密码
- ✅ 删除账户
- ✅ 管理员用户管理

### 项目管理
- ✅ 项目列表
- ✅ 添加项目
- ✅ 编辑项目
- ✅ 删除项目

### UI/UX
- ✅ 响应式设计
- ✅ 深色/浅色主题切换
- ✅ 系统主题跟随
- ✅ 侧边栏导航
- ✅ Toast 通知
- ✅ 加载状态
- ✅ 错误处理

## 与 React 版本的主要差异

### 1. 组件语法
- React: JSX/TSX 函数组件
- Vue: SFC (Single File Components) 使用 `<template>`, `<script setup>`, `<style>`

### 2. 状态管理
- React: `useState`, `useEffect`
- Vue: `ref`, `reactive`, `computed`, `watch`

### 3. 路由
- React: TanStack Router
- Vue: Vue Router

### 4. 表单处理
- React: React Hook Form
- Vue: 原生 v-model 双向绑定

### 5. UI 组件库
- React: Radix UI
- Vue: Radix Vue

## 环境变量

在 `.env` 文件中配置：

```env
VITE_API_URL=http://localhost:8000
```

## 开发建议

1. **组件命名**: 使用 PascalCase 命名组件文件
2. **组合式函数**: 使用 `use` 前缀命名（如 `useAuth`, `useCustomToast`）
3. **类型安全**: 充分利用 TypeScript 类型系统
4. **代码复用**: 使用组合式函数提取可复用逻辑
5. **性能优化**: 使用 `computed` 缓存计算结果，使用 `v-memo` 优化列表渲染

## 待完成功能

以下功能需要进一步实现：

- [ ] 完整的表格组件（DataTable）
- [ ] 对话框组件（Dialog）
- [ ] 下拉菜单组件（DropdownMenu）
- [ ] 表单验证集成
- [ ] 更多 UI 组件
- [ ] 单元测试
- [ ] E2E 测试

## 故障排除

### API 客户端生成失败
确保后端服务正在运行并且可以访问 OpenAPI 规范：
```bash
curl http://localhost:8000/api/v1/openapi.json
```

### 类型错误
重新生成 API 客户端并重启开发服务器：
```bash
npm run generate-client
npm run dev
```

### 样式问题
清除缓存并重新构建：
```bash
rm -rf node_modules/.vite
npm run dev
```

## 许可证

与原项目保持一致
