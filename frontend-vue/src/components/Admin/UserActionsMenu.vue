<template>
  <DropdownMenu v-if="user.id !== currentUser?.id">
    <DropdownMenuTrigger>
      <Button variant="ghost" size="icon">
        <EllipsisVertical class="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <EditUser :user="user" @success="handleSuccess" />
      <DeleteUser :id="user.id" @success="handleSuccess" />
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
import { EllipsisVertical } from "lucide-vue-next"
import type { UserPublic } from "@/client"
import Button from "@/components/ui/button.vue"
import DropdownMenu from "@/components/ui/dropdown-menu.vue"
import DropdownMenuTrigger from "@/components/ui/dropdown-menu-trigger.vue"
import DropdownMenuContent from "@/components/ui/dropdown-menu-content.vue"
import EditUser from "./EditUser.vue"
import DeleteUser from "./DeleteUser.vue"
import useAuth from "@/hooks/useAuth"

interface Props {
  user: UserPublic
}

defineProps<Props>()

const { user: currentUser } = useAuth()

const handleSuccess = () => {
  // 关闭下拉菜单
}
</script>
