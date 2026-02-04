<template>
  <div class="space-y-4">
    <h3 class="text-lg font-medium">Appearance</h3>
    <p class="text-sm text-muted-foreground">
      Customize the appearance of the app. Automatically switch between day and night themes.
    </p>
    <div class="grid grid-cols-3 gap-4">
      <button
        v-for="option in themeOptions"
        :key="option.value"
        @click="setTheme(option.value)"
        :class="cn(
          'flex flex-col items-center gap-2 rounded-md border-2 p-4 hover:border-primary',
          theme === option.value ? 'border-primary' : 'border-muted'
        )"
      >
        <component :is="option.icon" class="h-6 w-6" />
        <span class="text-sm">{{ option.label }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue"
import { Sun, Moon, Monitor } from "lucide-vue-next"
import { cn } from "@/lib/utils"
import type { Theme } from "../theme-provider.vue"

const themeContext = inject<any>("theme")
const theme = themeContext?.theme
const setTheme = themeContext?.setTheme

const themeOptions = [
  { value: "light" as Theme, label: "Light", icon: Sun },
  { value: "dark" as Theme, label: "Dark", icon: Moon },
  { value: "system" as Theme, label: "System", icon: Monitor },
]
</script>
