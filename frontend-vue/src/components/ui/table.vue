<template>
  <div class="relative w-full overflow-x-auto rounded-lg border">
    <table :class="cn('w-full caption-bottom text-sm', props.class)">
      <slot />
    </table>
  </div>
</template>

<script setup lang="ts">
import { type HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

interface TableProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<TableProps>()
</script>
