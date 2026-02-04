<template>
  <div class="flex min-h-screen flex-col items-center justify-center">
    <h1 class="text-4xl font-bold">Oops!</h1>
    <p class="mt-4 text-lg text-muted-foreground">Something went wrong</p>
    <button
      @click="() => window.location.reload()"
      class="mt-6 text-primary underline-offset-4 hover:underline"
    >
      Reload page
    </button>
  </div>
</template>

<script setup lang="ts">
</script>
