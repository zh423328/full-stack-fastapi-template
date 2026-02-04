<template>
  <div class="relative">
    <button
      type="button"
      :class="cn(
        'flex h-9 w-full items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        !modelValue && 'text-muted-foreground',
        props.class
      )"
      @click="toggleOpen"
      :disabled="disabled"
    >
      <span class="truncate">{{ displayValue || placeholder }}</span>
      <ChevronDown class="h-4 w-4 opacity-50" />
    </button>

    <Teleport to="body">
      <Transition name="select">
        <div
          v-if="isOpen"
          v-click-outside="close"
          class="absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md"
          :style="{ top: `${position.top}px`, left: `${position.left}px`, minWidth: `${position.width}px` }"
        >
          <slot />
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, provide, ref, type HTMLAttributes } from "vue"
import { ChevronDown } from "lucide-vue-next"
import { onClickOutside } from "@vueuse/core"
import { cn } from "@/lib/utils"

interface SelectProps {
  modelValue?: string | number
  placeholder?: string
  disabled?: boolean
  class?: HTMLAttributes["class"]
}

const props = defineProps<SelectProps>()
const emit = defineEmits<{
  "update:modelValue": [value: string | number]
}>()

const isOpen = ref(false)
const position = ref({ top: 0, left: 0, width: 0 })
const displayValue = ref("")

const toggleOpen = (event: MouseEvent) => {
  if (props.disabled) return
  
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
  position.value = {
    top: rect.bottom + window.scrollY + 4,
    left: rect.left + window.scrollX,
    width: rect.width,
  }
  
  isOpen.value = !isOpen.value
}

const close = () => {
  isOpen.value = false
}

const selectValue = (value: string | number, label: string) => {
  emit("update:modelValue", value)
  displayValue.value = label
  close()
}

provide("select", {
  isOpen,
  modelValue: computed(() => props.modelValue),
  selectValue,
  close,
})
</script>

<style scoped>
.select-enter-active,
.select-leave-active {
  transition: opacity 0.15s ease;
}

.select-enter-from,
.select-leave-to {
  opacity: 0;
}
</style>
