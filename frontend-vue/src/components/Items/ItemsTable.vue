<template>
  <div v-if="isLoading" class="py-12">
    <PendingItems />
  </div>
  <div v-else-if="items && items.data.length === 0" class="flex flex-col items-center justify-center text-center py-12">
    <div class="rounded-full bg-muted p-4 mb-4">
      <Search class="h-8 w-8 text-muted-foreground" />
    </div>
    <h3 class="text-lg font-semibold">You don't have any items yet</h3>
    <p class="text-muted-foreground">Add a new item to get started</p>
  </div>
  <DataTable v-else-if="items" :columns="columns" :data="items.data">
    <template #cell-id="{ row }">
      <div class="flex items-center gap-1.5 group">
        <span class="font-mono text-xs text-muted-foreground">{{ row.id }}</span>
        <Button
          variant="ghost"
          size="icon"
          class="size-6 opacity-0 group-hover:opacity-100 transition-opacity"
          @click="copyId(row.id)"
        >
          <Check v-if="copiedId === row.id" class="size-3 text-green-500" />
          <Copy v-else class="size-3" />
        </Button>
      </div>
    </template>

    <template #cell-title="{ row }">
      <span class="font-medium">{{ row.title }}</span>
    </template>

    <template #cell-description="{ row }">
      <span
        :class="cn(
          'max-w-xs truncate block text-muted-foreground',
          !row.description && 'italic'
        )"
      >
        {{ row.description || "No description" }}
      </span>
    </template>

    <template #cell-actions="{ row }">
      <div class="flex justify-end">
        <ItemActionsMenu :item="row" />
      </div>
    </template>
  </DataTable>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useQuery } from "@tanstack/vue-query"
import { Search, Copy, Check } from "lucide-vue-next"
import { ItemsService } from "@/client"
import Button from "@/components/ui/button.vue"
import DataTable from "@/components/Common/DataTable.vue"
import PendingItems from "@/components/Pending/PendingItems.vue"
import ItemActionsMenu from "./ItemActionsMenu.vue"
import { columns } from "./columns"
import { cn } from "@/lib/utils"
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard"

const { data: items, isLoading } = useQuery({
  queryKey: ["items"],
  queryFn: () => ItemsService.readItems({ skip: 0, limit: 100 }),
})

const { copiedText, copyToClipboard } = useCopyToClipboard()
const copiedId = ref<string | null>(null)

const copyId = async (id: string) => {
  const success = await copyToClipboard(id)
  if (success) {
    copiedId.value = id
    setTimeout(() => {
      copiedId.value = null
    }, 2000)
  }
}
</script>
