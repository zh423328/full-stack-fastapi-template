<template>
  <div class="relative inline-block">
    <div
      @mouseenter="show"
      @mouseleave="hide"
      @focus="show"
      @blur="hide"
    >
      <slot />
    </div>

    <Teleport to="body">
      <Transition name="tooltip">
        <div
          v-if="isVisible"
          :class="cn(
            'absolute z-50 rounded-md bg-foreground px-3 py-1.5 text-xs text-background shadow-md',
            props.class
          )"
          :style="{ top: `${position.top}px`, left: `${position.left}px` }"
          role="tooltip"
        >
          <slot name="content">{{ content }}</slot>
          <div class="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-foreground" />
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, type HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

interface TooltipProps {
  content?: string
  class?: HTMLAttributes["class"]
}

const props = defineProps<TooltipProps>()

const isVisible = ref(false)
const position = ref({ top: 0, left: 0 })
let timeoutId: ReturnType<typeof setTimeout> | null = null

const show = (event: MouseEvent) => {
  if (timeoutId) clearTimeout(timeoutId)
  
  timeoutId = setTimeout(() => {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
    position.value = {
      top: rect.top + window.scrollY - 40,
      left: rect.left + window.scrollX + rect.width / 2,
    }
    isVisible.value = true
  }, 200)
}

const hide = () => {
  if (timeoutId) {
    clearTimeout(timeoutId)
    timeoutId = null
  }
  isVisible.value = false
}
</script>

<style scoped>
.tooltip-enter-active,
.tooltip-leave-active {
  transition: opacity 0.15s ease;
}

.tooltip-enter-from,
.tooltip-leave-to {
  opacity: 0;
}
</style>
