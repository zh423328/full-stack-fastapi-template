# Frontend Vue - 中文文档

这是从 React + TypeScript 转换为 Vue 3 + TypeScript + Vite 的前端项目。

## 📚 文档导航

- [English README](./README.md)
- [快速开始](./QUICKSTART.md)
- [迁移指南](./MIGRATION_GUIDE.md)
- [项目对比](./PROJECT_COMPARISON.md)
- [转换总结](./CONVERSION_SUMMARY.md)

## 🚀 技术栈

- **Vue 3.5** - 渐进式 JavaScript 框架
- **TypeScript 5.9** - 类型安全的 JavaScript 超集
- **Vite 7** - 下一代前端构建工具
- **Vue Router 4** - Vue.js 官方路由
- **TanStack Query** - 强大的异步状态管理
- **Tailwind CSS 4** - 实用优先的 CSS 框架
- **Radix Vue** - 无样式、可访问的 UI 组件
- **Lucide Vue** - 美观的图标库
- **Axios** - HTTP 客户端
- **Zod** - TypeScript 优先的模式验证
- **VueUse** - Vue 组合式 API 工具集

## 📁 项目结构

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
│   ├── hooks/           # 组合式函数（Composables）
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
├── Dockerfile           # Docker 配置
├── nginx.conf           # Nginx 配置
└── .env                 # 环境变量
```

## 🎯 主要功能

### 认证系统
- ✅ 用户登录
- ✅ 用户注册
- ✅ 密码恢复
- ✅ 密码重置
- ✅ 自动令牌管理
- ✅ 路由守卫

### 用户管理
- ✅ 用户个人资料编辑
- ✅ 修改密码
- ✅ 删除账户
- ✅ 管理员用户管理

### 项目管理
- ✅ 项目列表展示
- ✅ 添加新项目
- ✅ 编辑项目
- ✅ 删除项目
- ✅ 项目搜索和筛选

### UI/UX 特性
- ✅ 响应式设计（移动端适配）
- ✅ 深色/浅色主题切换
- ✅ 系统主题自动跟随
- ✅ 侧边栏导航
- ✅ Toast 通知提示
- ✅ 加载状态骨架屏
- ✅ 错误处理和展示
- ✅ 404 页面

## 🛠️ 开始使用

### 前置要求

- Node.js 18+ 
- npm/yarn/pnpm
- 后端服务运行在 http://localhost:8000

### 安装步骤

1. **安装依赖**

```bash
npm install
```

2. **配置环境变量**

复制 `.env.example` 到 `.env`：

```bash
cp .env.example .env
```

编辑 `.env` 文件：

```env
VITE_API_URL=http://localhost:8000
```

3. **生成 API 客户端**

确保后端服务正在运行，然后执行：

```bash
npm run generate-client
```

4. **启动开发服务器**

```bash
npm run dev
```

应用将在 http://localhost:5173 启动

## 📜 可用命令

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

## 🎨 主题系统

项目支持三种主题模式：

- **浅色主题** (Light)
- **深色主题** (Dark)
- **系统主题** (System) - 自动跟随系统设置

主题设置会自动保存到 localStorage，下次访问时自动恢复。

## 🔐 默认账户

如果后端已初始化，可以使用以下账户登录：

**管理员账户**
- Email: `admin@example.com`
- Password: `changethis`

**普通用户**
- Email: `user@example.com`
- Password: `changethis`

## 🏗️ 与 React 版本的主要差异

### 组件语法
- **React**: JSX/TSX 函数组件
- **Vue**: SFC (Single File Components) 使用 `<template>`, `<script setup>`, `<style>`

### 状态管理
- **React**: `useState`, `useEffect`
- **Vue**: `ref`, `reactive`, `computed`, `watch`

### 路由
- **React**: TanStack Router（文件系统路由）
- **Vue**: Vue Router（配置式路由）

### 表单处理
- **React**: React Hook Form
- **Vue**: 原生 v-model 双向绑定

### UI 组件库
- **React**: Radix UI
- **Vue**: Radix Vue

## 📝 开发建议

1. **组件命名**: 使用 PascalCase 命名组件文件（如 `MyComponent.vue`）
2. **组合式函数**: 使用 `use` 前缀命名（如 `useAuth`, `useCustomToast`）
3. **类型安全**: 充分利用 TypeScript 类型系统
4. **代码复用**: 使用组合式函数提取可复用逻辑
5. **性能优化**: 
   - 使用 `computed` 缓存计算结果
   - 使用 `v-memo` 优化列表渲染
   - 路由懒加载

## 🐳 Docker 部署

### 构建镜像

```bash
docker build -t frontend-vue .
```

### 运行容器

```bash
docker run -p 80:80 frontend-vue
```

### Docker Compose

如果与后端一起部署，可以使用 Docker Compose：

```yaml
version: '3.8'
services:
  frontend:
    build: ./frontend-vue
    ports:
      - "80:80"
    depends_on:
      - backend
```

## 🔧 故障排除

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

### 端口冲突

如果 5173 端口被占用，Vite 会自动使用下一个可用端口。你也可以在 `vite.config.ts` 中指定端口：

```ts
export default defineConfig({
  server: {
    port: 3000
  }
})
```

## 📦 待完成功能

以下功能需要进一步实现：

- [ ] 完整的表格组件（排序、筛选、分页）
- [ ] 对话框组件（Dialog）
- [ ] 下拉菜单组件（DropdownMenu）
- [ ] 表单验证集成（VeeValidate）
- [ ] 更多 UI 组件（Select, Checkbox, Radio 等）
- [ ] 单元测试（Vitest）
- [ ] E2E 测试（Playwright）
- [ ] 国际化支持（i18n）
- [ ] PWA 支持

## 🤝 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

与原项目保持一致

## 🙏 致谢

- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [TanStack Query](https://tanstack.com/query) - 强大的异步状态管理
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
- [Radix Vue](https://www.radix-vue.com/) - 无样式 UI 组件
- [VueUse](https://vueuse.org/) - Vue 组合式 API 工具集

## 📞 联系方式

如有问题或建议，请提交 Issue 或 Pull Request。

---

**最后更新**: 2026-02-04  
**版本**: 1.0.0
