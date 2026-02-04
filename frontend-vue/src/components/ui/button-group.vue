<template>
  <div :class="cn('inline-flex rounded-md shadow-sm', props.class)" role="group">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { type HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

interface ButtonGroupProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<ButtonGroupProps>()
</script>
