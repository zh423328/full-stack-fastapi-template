<template>
  <div class="relative inline-block text-left" ref="containerRef" @click="() => console.log('Container clicked')">
    <div @click="handleTriggerClick">
      <slot name="trigger" />
    </div>
    
    <Teleport to="body">
      <Transition name="dropdown">
        <div
          v-if="isOpen"
          v-click-outside="close"
          class="absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md"
          :style="contentStyle"
          @click.stop
        >
          <slot name="content" :close="close" />
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"

interface Props {
  align?: "start" | "center" | "end"
}

const props = withDefaults(defineProps<Props>(), {
  align: "start",
})

const isOpen = ref(false)
const containerRef = ref<HTMLElement | null>(null)
const triggerRect = ref<DOMRect | null>(null)

const handleTriggerClick = (event: MouseEvent) => {
  console.log('Trigger clicked!', event)
  event.stopPropagation()
  toggle()
}

const toggle = () => {
  console.log('Toggle called, current isOpen:', isOpen.value)
  if (containerRef.value) {
    triggerRect.value = containerRef.value.getBoundingClientRect()
    console.log('Trigger rect:', triggerRect.value)
  }
  isOpen.value = !isOpen.value
  console.log('New isOpen:', isOpen.value)
}

const close = () => {
  console.log('Close called')
  isOpen.value = false
}

const contentStyle = computed(() => {
  if (!triggerRect.value) {
    return { top: "0px", left: "0px" }
  }

  const rect = triggerRect.value
  let left = rect.left + window.scrollX
  const top = rect.bottom + window.scrollY + 4

  if (props.align === "end") {
    left = rect.right + window.scrollX - 128
  } else if (props.align === "center") {
    left = rect.left + window.scrollX + rect.width / 2 - 64
  }

  return {
    top: `${top}px`,
    left: `${left}px`,
  }
})

defineExpose({ close })
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.15s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
}
</style>
