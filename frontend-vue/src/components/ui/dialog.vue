<template>
  <Teleport to="body">
    <Transition name="dialog">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center"
        @click.self="handleClose"
      >
        <div class="fixed inset-0 bg-black/50" @click="handleClose" />
        <div
          :class="cn(
            'relative z-50 w-full max-w-lg rounded-lg border bg-background p-6 shadow-lg',
            props.class
          )"
          @click.stop
        >
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { type HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

interface DialogProps {
  modelValue: boolean
  class?: HTMLAttributes["class"]
}

const props = defineProps<DialogProps>()
const emit = defineEmits<{
  "update:modelValue": [value: boolean]
}>()

const handleClose = () => {
  emit("update:modelValue", false)
}
</script>

<style scoped>
.dialog-enter-active,
.dialog-leave-active {
  transition: opacity 0.2s ease;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
}
</style>
