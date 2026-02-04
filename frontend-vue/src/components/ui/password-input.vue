<template>
  <div class="relative">
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :type="showPassword ? 'text' : 'password'"
      :class="cn(
        'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 pr-10 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        props.class
      )"
      v-bind="$attrs"
    />
    <button
      type="button"
      class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
      @click="showPassword = !showPassword"
    >
      <component :is="showPassword ? EyeOff : Eye" class="h-4 w-4" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, type HTMLAttributes } from "vue"
import { Eye, EyeOff } from "lucide-vue-next"
import { cn } from "@/lib/utils"

interface PasswordInputProps {
  class?: HTMLAttributes["class"]
  modelValue?: string
}

const props = defineProps<PasswordInputProps>()
defineEmits<{
  'update:modelValue': [value: string]
}>()
const showPassword = ref(false)
</script>
