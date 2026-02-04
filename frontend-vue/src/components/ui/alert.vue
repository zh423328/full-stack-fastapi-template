<template>
  <div
    role="alert"
    :class="cn(alertVariants({ variant }), props.class)"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { type HTMLAttributes } from "vue"
import { type VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive: "border-destructive/50 text-destructive bg-destructive/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface AlertProps {
  variant?: VariantProps<typeof alertVariants>["variant"]
  class?: HTMLAttributes["class"]
}

const props = defineProps<AlertProps>()
</script>
