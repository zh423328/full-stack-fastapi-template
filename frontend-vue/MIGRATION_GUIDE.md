# React 到 Vue 3 迁移指南

本文档详细说明了如何从 React + TypeScript 项目迁移到 Vue 3 + TypeScript 项目。

## 目录结构对比

### React 项目结构
```
frontend/
├── src/
│   ├── routes/          # 路由文件
│   │   ├── __root.tsx
│   │   ├── _layout.tsx
│   │   ├── login.tsx
│   │   └── _layout/
│   ├── components/
│   └── hooks/
```

### Vue 项目结构
```
frontend-vue/
├── src/
│   ├── views/           # 页面视图（对应 React 的 routes）
│   │   ├── login.vue
│   │   └── _layout/
│   ├── layouts/         # 布局组件
│   ├── router/          # 路由配置
│   ├── components/
│   └── hooks/           # 组合式函数
```

## 核心概念对比

### 1. 组件定义

**React (TSX)**
```tsx
import { useState } from "react"

interface Props {
  title: string
}

function MyComponent({ title }: Props) {
  const [count, setCount] = useState(0)
  
  return (
    <div>
      <h1>{title}</h1>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
    </div>
  )
}
```

**Vue 3 (SFC with script setup)**
```vue
<template>
  <div>
    <h1>{{ title }}</h1>
    <button @click="count++">
      Count: {{ count }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

interface Props {
  title: string
}

defineProps<Props>()

const count = ref(0)
</script>
```

### 2. 状态管理

**React**
```tsx
const [user, setUser] = useState<User | null>(null)
const [loading, setLoading] = useState(false)

useEffect(() => {
  fetchUser()
}, [])
```

**Vue 3**
```vue
<script setup lang="ts">
import { ref, onMounted } from "vue"

const user = ref<User | null>(null)
const loading = ref(false)

onMounted(() => {
  fetchUser()
})
</script>
```

### 3. 计算属性

**React**
```tsx
const fullName = useMemo(() => {
  return `${firstName} ${lastName}`
}, [firstName, lastName])
```

**Vue 3**
```vue
<script setup lang="ts">
import { computed } from "vue"

const fullName = computed(() => {
  return `${firstName.value} ${lastName.value}`
})
</script>
```

### 4. 副作用

**React**
```tsx
useEffect(() => {
  console.log("User changed:", user)
}, [user])
```

**Vue 3**
```vue
<script setup lang="ts">
import { watch } from "vue"

watch(user, (newUser) => {
  console.log("User changed:", newUser)
})
</script>
```

### 5. 表单处理

**React (React Hook Form)**
```tsx
const form = useForm<FormData>({
  resolver: zodResolver(formSchema),
  defaultValues: { email: "" }
})

<form onSubmit={form.handleSubmit(onSubmit)}>
  <input {...form.register("email")} />
</form>
```

**Vue 3 (v-model)**
```vue
<template>
  <form @submit.prevent="onSubmit">
    <input v-model="formData.email" />
  </form>
</template>

<script setup lang="ts">
import { reactive } from "vue"

const formData = reactive({
  email: ""
})
</script>
```

### 6. 条件渲染

**React**
```tsx
{isLoading && <Spinner />}
{error && <ErrorMessage />}
{data && <DataDisplay data={data} />}
```

**Vue 3**
```vue
<Spinner v-if="isLoading" />
<ErrorMessage v-else-if="error" />
<DataDisplay v-else-if="data" :data="data" />
```

### 7. 列表渲染

**React**
```tsx
{items.map((item) => (
  <div key={item.id}>{item.name}</div>
))}
```

**Vue 3**
```vue
<div v-for="item in items" :key="item.id">
  {{ item.name }}
</div>
```

### 8. 事件处理

**React**
```tsx
<button onClick={handleClick}>Click</button>
<input onChange={(e) => setValue(e.target.value)} />
```

**Vue 3**
```vue
<button @click="handleClick">Click</button>
<input @input="value = $event.target.value" />
<!-- 或使用 v-model -->
<input v-model="value" />
```

### 9. Props 传递

**React**
```tsx
<MyComponent 
  title="Hello" 
  count={42} 
  onUpdate={handleUpdate} 
/>
```

**Vue 3**
```vue
<MyComponent 
  title="Hello" 
  :count="42" 
  @update="handleUpdate" 
/>
```

### 10. 路由

**React (TanStack Router)**
```tsx
import { createFileRoute, Link } from "@tanstack/react-router"

export const Route = createFileRoute("/login")({
  component: Login,
})

<Link to="/dashboard">Dashboard</Link>
```

**Vue 3 (Vue Router)**
```vue
<script setup lang="ts">
import { RouterLink } from "vue-router"
</script>

<template>
  <RouterLink to="/dashboard">Dashboard</RouterLink>
</template>
```

路由配置：
```ts
// router/index.ts
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login.vue"),
    },
  ],
})
```

### 11. 数据获取 (TanStack Query)

**React**
```tsx
const { data, isLoading } = useQuery({
  queryKey: ["users"],
  queryFn: fetchUsers,
})
```

**Vue 3**
```vue
<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query"

const { data, isLoading } = useQuery({
  queryKey: ["users"],
  queryFn: fetchUsers,
})
</script>
```

### 12. 自定义 Hooks/组合式函数

**React**
```tsx
function useAuth() {
  const [user, setUser] = useState(null)
  
  const login = async (credentials) => {
    const user = await api.login(credentials)
    setUser(user)
  }
  
  return { user, login }
}
```

**Vue 3**
```ts
export function useAuth() {
  const user = ref(null)
  
  const login = async (credentials) => {
    const userData = await api.login(credentials)
    user.value = userData
  }
  
  return { user, login }
}
```

## 组件库对比

| 功能 | React | Vue 3 |
|------|-------|-------|
| UI 组件 | Radix UI | Radix Vue |
| 图标 | lucide-react | lucide-vue-next |
| 表单 | React Hook Form | v-model + 自定义验证 |
| 路由 | TanStack Router | Vue Router |
| 状态管理 | TanStack Query | TanStack Vue Query |
| 工具库 | - | VueUse |

## 迁移步骤

### 1. 设置项目

```bash
cd frontend-vue
npm install
```

### 2. 生成 API 客户端

```bash
# 确保后端运行在 http://localhost:8000
npm run generate-client
```

### 3. 复制静态资源

```bash
cp -r ../frontend/public ./
```

### 4. 启动开发服务器

```bash
npm run dev
```

## 常见问题

### Q: 如何访问 ref 的值？
A: 在 `<script setup>` 中使用 `.value`，在 `<template>` 中直接使用变量名。

```vue
<script setup lang="ts">
const count = ref(0)
console.log(count.value) // 需要 .value
</script>

<template>
  <div>{{ count }}</div> <!-- 不需要 .value -->
</template>
```

### Q: reactive vs ref 应该用哪个？
A: 
- 基本类型使用 `ref`
- 对象使用 `reactive` 或 `ref`
- 需要重新赋值整个对象时使用 `ref`

### Q: 如何实现类似 React 的 useEffect？
A: 使用 `watch` 或 `watchEffect`

```ts
// 类似 useEffect(() => {}, [dep])
watch(dep, () => {
  // 副作用
})

// 类似 useEffect(() => {}, [])
onMounted(() => {
  // 副作用
})

// 自动追踪依赖
watchEffect(() => {
  // 使用的响应式数据会被自动追踪
})
```

### Q: 如何在 Vue 中使用 TypeScript？
A: Vue 3 对 TypeScript 有完整支持：

```vue
<script setup lang="ts">
import type { Ref } from "vue"

interface User {
  id: number
  name: string
}

const user: Ref<User | null> = ref(null)
// 或
const user = ref<User | null>(null)
</script>
```

### Q: 如何处理表单验证？
A: 可以使用 Zod + 自定义验证逻辑，或集成 VeeValidate：

```vue
<script setup lang="ts">
import { z } from "zod"

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

const validate = () => {
  try {
    schema.parse(formData)
    return true
  } catch (error) {
    // 处理错误
    return false
  }
}
</script>
```

## 性能优化

### React
```tsx
const MemoizedComponent = memo(MyComponent)
const memoizedValue = useMemo(() => compute(), [dep])
const memoizedCallback = useCallback(() => {}, [dep])
```

### Vue 3
```vue
<script setup lang="ts">
// computed 自动缓存
const memoizedValue = computed(() => compute())

// 函数不需要特殊处理，Vue 的响应式系统会优化
const handleClick = () => {}
</script>

<template>
  <!-- v-memo 用于列表优化 -->
  <div v-for="item in list" :key="item.id" v-memo="[item.id]">
    {{ item.name }}
  </div>
</template>
```

## 调试技巧

### React DevTools
- 使用 React DevTools 浏览器扩展

### Vue DevTools
- 使用 Vue DevTools 浏览器扩展
- 在开发模式下自动启用

## 总结

Vue 3 的 Composition API 与 React Hooks 非常相似，使得迁移相对平滑。主要差异在于：

1. **模板语法**: Vue 使用模板而不是 JSX
2. **响应式系统**: Vue 的 ref/reactive vs React 的 useState
3. **双向绑定**: Vue 的 v-model 简化了表单处理
4. **生命周期**: 略有不同但概念相似

两个框架都很优秀，选择取决于团队偏好和项目需求。
