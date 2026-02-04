<template>
  <button
    :class="cn(
      'relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50',
      variant === 'destructive' && 'text-destructive hover:bg-destructive/10 focus:bg-destructive/10',
      props.class
    )"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { type HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

interface DropdownMenuItemProps {
  variant?: "default" | "destructive"
  class?: HTMLAttributes["class"]
}

const props = withDefaults(defineProps<DropdownMenuItemProps>(), {
  variant: "default",
})

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>
