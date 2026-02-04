<template>
  <slot />
</template>

<script setup lang="ts">
import { computed, onMounted, provide, ref, watch } from "vue"

export type Theme = "dark" | "light" | "system"

interface ThemeProviderProps {
  defaultTheme?: Theme
  storageKey?: string
}

const props = withDefaults(defineProps<ThemeProviderProps>(), {
  defaultTheme: "system",
  storageKey: "vite-ui-theme",
})

const theme = ref<Theme>(
  (localStorage.getItem(props.storageKey) as Theme) || props.defaultTheme
)

const getResolvedTheme = (theme: Theme): "dark" | "light" => {
  if (theme === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  }
  return theme
}

const resolvedTheme = computed(() => getResolvedTheme(theme.value))

const updateTheme = (newTheme: Theme) => {
  const root = window.document.documentElement

  root.classList.remove("light", "dark")

  if (newTheme === "system") {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light"

    root.classList.add(systemTheme)
    return
  }

  root.classList.add(newTheme)
}

const setTheme = (newTheme: Theme) => {
  localStorage.setItem(props.storageKey, newTheme)
  theme.value = newTheme
}

watch(theme, (newTheme) => {
  updateTheme(newTheme)
})

onMounted(() => {
  updateTheme(theme.value)

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

  const handleChange = () => {
    if (theme.value === "system") {
      updateTheme("system")
    }
  }

  mediaQuery.addEventListener("change", handleChange)

  return () => {
    mediaQuery.removeEventListener("change", handleChange)
  }
})

provide("theme", {
  theme,
  resolvedTheme,
  setTheme,
})
</script>
