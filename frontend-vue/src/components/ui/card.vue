<template>
  <div
    :class="cn(
      'rounded-xl border bg-card text-card-foreground shadow-sm',
      props.class
    )"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { type HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

interface CardProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<CardProps>()
</script>
