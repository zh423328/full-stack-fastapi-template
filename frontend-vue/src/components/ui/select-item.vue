<template>
  <button
    type="button"
    :class="cn(
      'relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50',
      isSelected && 'bg-accent',
      props.class
    )"
    @click="handleClick"
  >
    <slot />
    <Check v-if="isSelected" class="absolute right-2 h-4 w-4" />
  </button>
</template>

<script setup lang="ts">
import { computed, inject, type HTMLAttributes } from "vue"
import { Check } from "lucide-vue-next"
import { cn } from "@/lib/utils"

interface SelectItemProps {
  value: string | number
  class?: HTMLAttributes["class"]
}

const props = defineProps<SelectItemProps>()

const select = inject<any>("select")
const isSelected = computed(() => select?.modelValue.value === props.value)

const handleClick = () => {
  const label = (event?.currentTarget as HTMLElement)?.textContent || String(props.value)
  select?.selectValue(props.value, label)
}
</script>
