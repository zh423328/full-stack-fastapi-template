<template>
  <div class="border-t p-4">
    <div v-if="!collapsed" class="flex items-center gap-3">
      <div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
        {{ getInitials(user?.full_name || user?.email || "User") }}
      </div>
      <div class="flex-1 overflow-hidden">
        <p class="truncate text-sm font-medium">{{ user?.full_name || user?.email }}</p>
        <p class="truncate text-xs text-muted-foreground">{{ user?.email }}</p>
      </div>
      <button
        @click="handleLogout"
        class="text-muted-foreground hover:text-foreground"
        title="Logout"
      >
        <LogOut class="h-5 w-5" />
      </button>
    </div>
    <div v-else class="flex justify-center">
      <button
        @click="handleLogout"
        class="text-muted-foreground hover:text-foreground"
        title="Logout"
      >
        <LogOut class="h-5 w-5" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LogOut } from "lucide-vue-next"
import type { UserPublic } from "@/client"
import { getInitials } from "@/utils"
import useAuth from "@/hooks/useAuth"

interface Props {
  user?: UserPublic | null
  collapsed?: boolean
}

defineProps<Props>()

const { logout } = useAuth()

const handleLogout = () => {
  logout()
}
</script>
