<template>
  <Teleport to="body">
    <Transition name="dropdown">
      <div
        v-if="isOpen"
        v-click-outside="close"
        class="absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md"
        :style="{ top: `${position.top}px`, left: `${position.left}px` }"
      >
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { inject, ref, watch } from "vue"
import { onClickOutside } from "@vueuse/core"

const dropdownMenu = inject<any>("dropdownMenu")
const isOpen = dropdownMenu?.isOpen
const close = () => dropdownMenu?.close()

const position = ref({ top: 0, left: 0 })

// 简化版本，实际应该计算触发器位置
watch(isOpen, (newValue) => {
  if (newValue) {
    // TODO: 计算正确的位置
    position.value = { top: 100, left: 100 }
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
