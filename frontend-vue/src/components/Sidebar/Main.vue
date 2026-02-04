<template>
  <nav class="space-y-1 px-2">
    <router-link
      v-for="item in items"
      :key="item.path"
      :to="item.path"
      :class="cn(
        'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
        'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        isActive(item.path) && 'bg-sidebar-accent text-sidebar-accent-foreground',
        collapsed && 'justify-center px-2'
      )"
    >
      <component :is="item.icon" class="h-5 w-5 shrink-0" />
      <span v-if="!collapsed">{{ item.title }}</span>
    </router-link>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router"
import type { Component } from "vue"
import { cn } from "@/lib/utils"

export interface Item {
  icon: Component
  title: string
  path: string
}

interface Props {
  items: Item[]
  collapsed?: boolean
}

defineProps<Props>()

const route = useRoute()

const isActive = (path: string) => {
  return route.path === path
}
</script>
