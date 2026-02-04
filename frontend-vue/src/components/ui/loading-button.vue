<template>
  <Button :disabled="loading || disabled" v-bind="$attrs">
    <span v-if="loading" class="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
    <slot />
  </Button>
</template>

<script setup lang="ts">
import Button from "./button.vue"

interface LoadingButtonProps {
  loading?: boolean
  disabled?: boolean
}

defineProps<LoadingButtonProps>()
</script>
