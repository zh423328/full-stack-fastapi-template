<template>
  <button
    type="button"
    role="checkbox"
    :aria-checked="checked"
    :class="cn(
      'peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
      checked && 'bg-primary text-primary-foreground',
      props.class
    )"
    @click="toggle"
  >
    <Check v-if="checked" class="h-3 w-3" />
  </button>
</template>

<script setup lang="ts">
import { type HTMLAttributes } from "vue"
import { Check } from "lucide-vue-next"
import { cn } from "@/lib/utils"

interface CheckboxProps {
  checked?: boolean
  class?: HTMLAttributes["class"]
}

const props = defineProps<CheckboxProps>()
const emit = defineEmits<{
  "update:checked": [value: boolean]
}>()

const toggle = () => {
  emit("update:checked", !props.checked)
}
</script>
