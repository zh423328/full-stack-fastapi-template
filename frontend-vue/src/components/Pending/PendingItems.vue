<template>
  <div class="space-y-4">
    <div v-for="i in 5" :key="i" class="flex items-center space-x-4">
      <div class="h-12 w-12 animate-pulse rounded-md bg-muted" />
      <div class="flex-1 space-y-2">
        <div class="h-4 w-3/4 animate-pulse rounded bg-muted" />
        <div class="h-3 w-1/2 animate-pulse rounded bg-muted" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
