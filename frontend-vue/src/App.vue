<template>
  <ThemeProvider default-theme="dark" storage-key="vite-ui-theme">
    <RouterView />
    <Toaster rich-colors close-button />
  </ThemeProvider>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router"
import ThemeProvider from "./components/theme-provider.vue"
import { Toaster } from "./components/ui/sonner"
</script>
