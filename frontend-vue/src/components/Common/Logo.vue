<template>
  <div class="flex items-center gap-2">
    <img
      :src="logoSrc"
      alt="FastAPI Logo"
      class="h-8 w-8"
    />
    <span class="text-xl font-bold">FastAPI</span>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from "vue"

const theme = inject<any>("theme")
const resolvedTheme = computed(() => theme?.resolvedTheme?.value || "light")

const logoSrc = computed(() => {
  return resolvedTheme.value === "dark"
    ? "/assets/images/fastapi-logo-light.svg"
    : "/assets/images/fastapi-logo.svg"
})
</script>
