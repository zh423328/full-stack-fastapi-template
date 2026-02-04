<template>
  <div class="flex min-h-screen flex-col items-center justify-center">
    <h1 class="text-4xl font-bold">404</h1>
    <p class="mt-4 text-lg text-muted-foreground">Page not found</p>
    <router-link
      to="/"
      class="mt-6 text-primary underline-offset-4 hover:underline"
    >
      Go back home
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
</script>
