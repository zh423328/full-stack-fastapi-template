<template>
  <div class="tabs">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide, ref } from "vue"

interface Props {
  defaultValue?: string
}

const props = defineProps<Props>()

const activeTab = ref(props.defaultValue || "")

provide("activeTab", activeTab)
</script>
