<template>
  <aside
    :class="cn(
      'flex h-screen w-64 flex-col border-r bg-sidebar transition-all duration-300',
      collapsed && 'w-16'
    )"
  >
    <div :class="cn('px-4 py-6', collapsed && 'px-0 items-center flex justify-center')">
      <Logo :variant="collapsed ? 'icon' : 'full'" />
    </div>

    <div class="flex-1 overflow-y-auto">
      <Main :items="items" :collapsed="collapsed" />
    </div>

    <div class="border-t">
      <Appearance v-if="!collapsed" />
      <User :user="user" :collapsed="collapsed" />
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { Home, Briefcase, Users } from "lucide-vue-next"
import Logo from "@/components/Common/Logo.vue"
import Appearance from "@/components/Common/Appearance.vue"
import Main from "./Main.vue"
import User from "./User.vue"
import useAuth from "@/hooks/useAuth"
import { cn } from "@/lib/utils"

interface Props {
  collapsed?: boolean
}

defineProps<Props>()

const { user } = useAuth()

const baseItems = [
  { icon: Home, title: "Dashboard", path: "/" },
  { icon: Briefcase, title: "Items", path: "/items" },
]

const items = computed(() => {
  return user.value?.is_superuser
    ? [...baseItems, { icon: Users, title: "Admin", path: "/admin" }]
    : baseItems
})
</script>
