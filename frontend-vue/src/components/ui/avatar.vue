<template>
  <div
    :class="cn(
      'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
      props.class
    )"
  >
    <img
      v-if="src && !imageError"
      :src="src"
      :alt="alt"
      class="aspect-square h-full w-full object-cover"
      @error="handleImageError"
    />
    <div
      v-else
      class="flex h-full w-full items-center justify-center rounded-full bg-muted"
    >
      <slot name="fallback">
        <span class="text-sm font-medium">{{ fallbackText }}</span>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, type HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

interface AvatarProps {
  src?: string
  alt?: string
  fallback?: string
  class?: HTMLAttributes["class"]
}

const props = defineProps<AvatarProps>()

const imageError = ref(false)

const fallbackText = computed(() => {
  if (props.fallback) return props.fallback
  if (props.alt) {
    return props.alt
      .split(" ")
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase()
  }
  return "?"
})

const handleImageError = () => {
  imageError.value = true
}
</script>
