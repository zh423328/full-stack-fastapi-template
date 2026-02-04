<template>
  <DropdownMenu align="end">
    <template #trigger>
      <button class="inline-flex items-center justify-center h-9 w-9 rounded-md hover:bg-accent transition-colors">
        <EllipsisVertical class="h-4 w-4" />
      </button>
    </template>
    
    <template #content="{ close }">
      <EditItem :item="item" @success="() => { handleSuccess(); close(); }" />
      <DeleteItem :id="item.id" @success="() => { handleSuccess(); close(); }" />
    </template>
  </DropdownMenu>
</template>

<script setup lang="ts">
import { EllipsisVertical } from "lucide-vue-next"
import type { ItemPublic } from "@/client"
import DropdownMenu from "@/components/ui/dropdown-menu.vue"
import EditItem from "./EditItem.vue"
import DeleteItem from "./DeleteItem.vue"

interface Props {
  item: ItemPublic
}

defineProps<Props>()

const handleSuccess = () => {
  console.log('Action success')
}
</script>
