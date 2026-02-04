<template>
  <Teleport to="body">
    <Transition name="dropdown">
      <div
        v-if="isOpen"
        ref="contentRef"
        v-click-outside="close"
        class="absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md"
        :style="contentStyle"
        @click.stop
      >
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, inject, ref, watch, nextTick } from "vue"

interface Props {
  align?: "start" | "center" | "end"
}

const props = withDefaults(defineProps<Props>(), {
  align: "start",
})

const dropdownMenu = inject<any>("dropdownMenu")
const isOpen = dropdownMenu?.isOpen
const triggerRect = dropdownMenu?.triggerRect
const close = () => dropdownMenu?.close()

const contentRef = ref<HTMLElement | null>(null)

const contentStyle = computed(() => {
  console.log('Computing content style', { triggerRect: triggerRect?.value, isOpen: isOpen?.value })
  if (!triggerRect?.value) {
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

  console.log('Computed position:', { top, left })
  return {
    top: `${top}px`,
    left: `${left}px`,
  }
})

watch(isOpen, async (newValue) => {
  console.log('isOpen changed:', newValue)
  if (newValue) {
    await nextTick()
    if (contentRef.value) {
      const rect = contentRef.value.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      if (rect.right > viewportWidth) {
        const currentLeft = parseFloat(contentRef.value.style.left)
        contentRef.value.style.left = `${currentLeft - (rect.right - viewportWidth) - 8}px`
      }

      if (rect.bottom > viewportHeight && triggerRect?.value) {
        const triggerTop = triggerRect.value.top + window.scrollY
        contentRef.value.style.top = `${triggerTop - rect.height - 4}px`
      }
    }
  }
})
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
