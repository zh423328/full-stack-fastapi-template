<template>
  <div v-if="isActive" class="mt-6">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, inject, type Ref } from "vue"

interface Props {
  value: string
}

const props = defineProps<Props>()

const activeTab = inject<Ref<string>>("activeTab")

const isActive = computed(() => activeTab?.value === props.value)
</script>
