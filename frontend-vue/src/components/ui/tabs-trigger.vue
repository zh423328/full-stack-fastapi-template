<template>
  <button
    :class="cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      isActive && 'bg-background text-foreground shadow'
    )"
    @click="setActive"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed, inject, type Ref } from "vue"
import { cn } from "@/lib/utils"

interface Props {
  value: string
}

const props = defineProps<Props>()

const activeTab = inject<Ref<string>>("activeTab")

const isActive = computed(() => activeTab?.value === props.value)

const setActive = () => {
  if (activeTab) {
    activeTab.value = props.value
  }
}
</script>
