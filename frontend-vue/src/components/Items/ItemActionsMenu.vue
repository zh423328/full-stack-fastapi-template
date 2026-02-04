<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Button variant="ghost" size="icon">
        <EllipsisVertical class="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <EditItem :item="item" @success="handleSuccess" />
      <DeleteItem :id="item.id" @success="handleSuccess" />
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
import { EllipsisVertical } from "lucide-vue-next"
import type { ItemPublic } from "@/client"
import Button from "@/components/ui/button.vue"
import DropdownMenu from "@/components/ui/dropdown-menu.vue"
import DropdownMenuTrigger from "@/components/ui/dropdown-menu-trigger.vue"
import DropdownMenuContent from "@/components/ui/dropdown-menu-content.vue"
import EditItem from "./EditItem.vue"
import DeleteItem from "./DeleteItem.vue"

interface Props {
  item: ItemPublic
}

defineProps<Props>()

const handleSuccess = () => {
  // 关闭下拉菜单
}
</script>
