# React vs Vue 3 项目对比

本文档对比了原 React 项目和新 Vue 3 项目的技术栈、特性和实现方式。

## 技术栈对比

| 类别 | React 项目 | Vue 3 项目 |
|------|-----------|-----------|
| **框架** | React 19 | Vue 3.5 |
| **语言** | TypeScript | TypeScript |
| **构建工具** | Vite 7 | Vite 7 |
| **路由** | TanStack Router | Vue Router 4 |
| **状态管理** | TanStack Query | TanStack Vue Query |
| **UI 组件** | Radix UI | Radix Vue |
| **图标** | lucide-react | lucide-vue-next |
| **样式** | Tailwind CSS 4 | Tailwind CSS 4 |
| **表单** | React Hook Form | v-model + 自定义验证 |
| **HTTP 客户端** | Axios | Axios |
| **验证** | Zod | Zod |
| **工具库** | - | VueUse |
| **通知** | Sonner | Vue Sonner |
| **代码检查** | Biome | - |

## 文件结构对比

### React 项目
```
frontend/
├── src/
│   ├── routes/              # 路由文件（文件系统路由）
│   │   ├── __root.tsx
│   │   ├── _layout.tsx
│   │   ├── login.tsx
│   │   └── _layout/
│   │       ├── index.tsx
│   │       ├── items.tsx
│   │       ├── admin.tsx
│   │       └── settings.tsx
│   ├── components/
│   │   ├── Admin/
│   │   ├── Common/
│   │   ├── Items/
│   │   ├── Sidebar/
│   │   ├── UserSettings/
│   │   └── ui/
│   ├── hooks/
│   ├── client/
│   └── main.tsx
```

### Vue 3 项目
```
frontend-vue/
├── src/
│   ├── views/               # 页面视图
│   │   ├── login.vue
│   │   ├── signup.vue
│   │   ├── recover-password.vue
│   │   ├── reset-password.vue
│   │   └── _layout/
│   │       ├── index.vue
│   │       ├── items.vue
│   │       ├── admin.vue
│   │       └── settings.vue
│   ├── layouts/             # 布局组件
│   │   └── Layout.vue
│   ├── router/              # 路由配置
│   │   └── index.ts
│   ├── components/
│   │   ├── Admin/
│   │   ├── Common/
│   │   ├── Items/
│   │   ├── Sidebar/
│   │   ├── UserSettings/
│   │   └── ui/
│   ├── hooks/
│   ├── client/
│   └── main.ts
```

## 组件语法对比

### 登录页面

**React (login.tsx)**
```tsx
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  username: z.email(),
  password: z.string().min(8),
})

type FormData = z.infer<typeof formSchema>

function Login() {
  const { loginMutation } = useAuth()
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { username: "", password: "" },
  })

  const onSubmit = (data: FormData) => {
    loginMutation.mutate(data)
  }

  return (
    <AuthLayout>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoadingButton type="submit" loading={loginMutation.isPending}>
            Log In
          </LoadingButton>
        </form>
      </Form>
    </AuthLayout>
  )
}
```

**Vue 3 (login.vue)**
```vue
<template>
  <AuthLayout>
    <form @submit.prevent="onSubmit" class="flex flex-col gap-6">
      <div class="grid gap-2">
        <Label for="email">Email</Label>
        <Input
          id="email"
          v-model="formData.username"
          type="email"
          required
          @blur="validateEmail"
        />
        <p v-if="errors.username" class="text-xs text-destructive">
          {{ errors.username }}
        </p>
      </div>

      <div class="grid gap-2">
        <Label for="password">Password</Label>
        <PasswordInput
          id="password"
          v-model="formData.password"
          required
          @blur="validatePassword"
        />
        <p v-if="errors.password" class="text-xs text-destructive">
          {{ errors.password }}
        </p>
      </div>

      <LoadingButton type="submit" :loading="loginMutation.isPending.value">
        Log In
      </LoadingButton>
    </form>
  </AuthLayout>
</template>

<script setup lang="ts">
import { reactive } from "vue"
import type { Body_login_login_access_token as AccessToken } from "@/client"
import useAuth from "@/hooks/useAuth"

const { loginMutation } = useAuth()

const formData = reactive<AccessToken>({
  username: "",
  password: "",
})

const errors = reactive({
  username: "",
  password: "",
})

const validateEmail = () => {
  if (!formData.username) {
    errors.username = "Email is required"
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.username)) {
    errors.username = "Invalid email format"
  } else {
    errors.username = ""
  }
}

const validatePassword = () => {
  if (!formData.password) {
    errors.password = "Password is required"
  } else if (formData.password.length < 8) {
    errors.password = "Password must be at least 8 characters"
  } else {
    errors.password = ""
  }
}

const onSubmit = () => {
  validateEmail()
  validatePassword()
  if (!errors.username && !errors.password) {
    loginMutation.mutate(formData)
  }
}
</script>
```

## 路由对比

### React (TanStack Router)
```tsx
// routes/login.tsx
export const Route = createFileRoute("/login")({
  component: Login,
  beforeLoad: async () => {
    if (isLoggedIn()) {
      throw redirect({ to: "/" })
    }
  },
})

// 使用
<Link to="/dashboard">Dashboard</Link>
```

### Vue 3 (Vue Router)
```ts
// router/index.ts
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login.vue"),
      meta: { requiresGuest: true },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const loggedIn = isLoggedIn()
  if (to.meta.requiresAuth && !loggedIn) {
    next("/login")
  } else if (to.meta.requiresGuest && loggedIn) {
    next("/")
  } else {
    next()
  }
})
```

```vue
<!-- 使用 -->
<router-link to="/dashboard">Dashboard</router-link>
```

## Hooks/组合式函数对比

### React
```tsx
// hooks/useAuth.ts
const useAuth = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { showErrorToast } = useCustomToast()

  const { data: user } = useQuery<UserPublic | null, Error>({
    queryKey: ["currentUser"],
    queryFn: UsersService.readUserMe,
    enabled: isLoggedIn(),
  })

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate({ to: "/" })
    },
    onError: handleError.bind(showErrorToast),
  })

  return { user, loginMutation }
}
```

### Vue 3
```ts
// hooks/useAuth.ts
export const useAuth = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { showErrorToast } = useCustomToast()

  const { data: user } = useQuery<UserPublic | null, Error>({
    queryKey: ["currentUser"],
    queryFn: UsersService.readUserMe,
    enabled: isLoggedIn(),
  })

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      router.push("/")
    },
    onError: handleError.bind(showErrorToast),
  })

  return { user, loginMutation }
}
```

## 优缺点对比

### React 项目

**优点:**
- ✅ 文件系统路由（TanStack Router）更直观
- ✅ React Hook Form 提供强大的表单处理
- ✅ Biome 提供快速的代码检查和格式化
- ✅ 更大的生态系统和社区
- ✅ JSX 提供更灵活的模板语法

**缺点:**
- ❌ 需要更多样板代码（表单处理）
- ❌ 状态更新需要显式调用 setter
- ❌ useEffect 依赖管理可能复杂
- ❌ 没有内置的双向绑定

### Vue 3 项目

**优点:**
- ✅ v-model 简化表单处理
- ✅ 模板语法更接近 HTML
- ✅ 响应式系统更直观
- ✅ 更少的样板代码
- ✅ VueUse 提供丰富的组合式函数
- ✅ 更好的 TypeScript 集成（Vue 3.3+）

**缺点:**
- ❌ 需要手动配置路由
- ❌ 学习曲线（ref vs reactive）
- ❌ 模板语法限制（相比 JSX）
- ❌ 生态系统相对较小

## 性能对比

两个项目的性能都很优秀，但有一些差异：

| 指标 | React | Vue 3 |
|------|-------|-------|
| **初始加载** | 快 | 快 |
| **运行时性能** | 优秀 | 优秀 |
| **包大小** | 中等 | 较小 |
| **编译时优化** | 有限 | 更多 |
| **响应式更新** | 虚拟 DOM diff | 编译时优化 + 虚拟 DOM |

## 开发体验对比

### React
- 更灵活的组件组合
- JSX 提供完整的 JavaScript 能力
- 需要更多的手动优化（memo, useCallback）
- 丰富的开发工具和扩展

### Vue 3
- 更简洁的模板语法
- 自动的响应式追踪
- 更少的性能优化需求
- 优秀的 Vue DevTools

## 迁移建议

### 何时选择 React
- 团队已熟悉 React
- 需要更灵活的组件组合
- 项目需要大量的第三方库
- 偏好 JSX 语法

### 何时选择 Vue 3
- 团队偏好模板语法
- 需要快速开发
- 项目规模中小型
- 需要更简单的学习曲线

## 总结

两个项目都实现了相同的功能，主要差异在于：

1. **语法风格**: JSX vs 模板
2. **状态管理**: useState vs ref/reactive
3. **表单处理**: React Hook Form vs v-model
4. **路由**: 文件系统路由 vs 配置式路由

选择取决于团队偏好、项目需求和现有技术栈。两者都是优秀的现代前端解决方案。
