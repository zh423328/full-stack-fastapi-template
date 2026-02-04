<template>
  <div ref="triggerRef" @click="handleClick">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { inject, ref } from "vue"

const dropdownMenu = inject<any>("dropdownMenu")
const triggerRef = ref<HTMLElement | null>(null)

const handleClick = (event: MouseEvent) => {
  event.stopPropagation()
  console.log('Trigger clicked', triggerRef.value)
  if (triggerRef.value) {
    const rect = triggerRef.value.getBoundingClientRect()
    console.log('Trigger rect:', rect)
    dropdownMenu?.toggle(rect)
  }
}
</script>
