<template>
  <div class="space-y-6 py-6">
    <div class="rounded-lg border border-destructive/50 bg-destructive/10 p-6">
      <h3 class="text-lg font-semibold text-destructive">Danger Zone</h3>
      <p class="mt-2 text-sm text-muted-foreground">
        Once you delete your account, there is no going back. Please be certain.
      </p>
      <Button
        variant="destructive"
        @click="showConfirmation = true"
        class="mt-4"
      >
        Delete Account
      </Button>
    </div>

    <DeleteConfirmation v-model="showConfirmation" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import Button from "@/components/ui/button.vue"
import DeleteConfirmation from "./DeleteConfirmation.vue"

const showConfirmation = ref(false)
</script>
