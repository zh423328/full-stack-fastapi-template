<template>
  <div class="flex min-h-screen">
    <div class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div class="mb-8">
          <Logo />
        </div>
        <slot />
      </div>
    </div>
    <div class="relative hidden flex-1 lg:block">
      <img
        class="absolute inset-0 h-full w-full object-cover"
        :src="resolvedTheme === 'dark' ? '/assets/images/dashboard-dark.png' : '/assets/images/dashboard.png'"
        alt="Dashboard preview"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from "vue"
import Logo from "./Logo.vue"

const theme = inject<any>("theme")
const resolvedTheme = computed(() => theme?.resolvedTheme?.value || "light")
</script>
