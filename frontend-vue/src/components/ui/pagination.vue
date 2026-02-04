<template>
  <nav
    role="navigation"
    aria-label="pagination"
    :class="cn('mx-auto flex w-full justify-center', props.class)"
  >
    <div class="flex flex-row items-center gap-1">
      <Button
        variant="outline"
        size="icon"
        :disabled="currentPage === 1"
        @click="goToPage(currentPage - 1)"
      >
        <ChevronLeft class="h-4 w-4" />
        <span class="sr-only">Previous page</span>
      </Button>

      <div class="flex items-center gap-1">
        <Button
          v-for="page in visiblePages"
          :key="page"
          :variant="page === currentPage ? 'default' : 'outline'"
          size="icon"
          @click="goToPage(page)"
        >
          {{ page }}
        </Button>
      </div>

      <Button
        variant="outline"
        size="icon"
        :disabled="currentPage === totalPages"
        @click="goToPage(currentPage + 1)"
      >
        <ChevronRight class="h-4 w-4" />
        <span class="sr-only">Next page</span>
      </Button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { ChevronLeft, ChevronRight } from "lucide-vue-next"
import Button from "./button.vue"
import { cn } from "@/lib/utils"

interface PaginationProps {
  currentPage: number
  totalPages: number
  maxVisible?: number
  class?: HTMLAttributes["class"]
}

const props = withDefaults(defineProps<PaginationProps>(), {
  maxVisible: 5,
})

const emit = defineEmits<{
  "update:currentPage": [page: number]
}>()

const visiblePages = computed(() => {
  const pages: number[] = []
  const half = Math.floor(props.maxVisible / 2)
  let start = Math.max(1, props.currentPage - half)
  let end = Math.min(props.totalPages, start + props.maxVisible - 1)

  if (end - start + 1 < props.maxVisible) {
    start = Math.max(1, end - props.maxVisible + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})

const goToPage = (page: number) => {
  if (page >= 1 && page <= props.totalPages) {
    emit("update:currentPage", page)
  }
}
</script>
