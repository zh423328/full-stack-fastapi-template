<template>
  <AuthLayout>
    <form @submit.prevent="onSubmit" class="flex flex-col gap-6">
      <div class="flex flex-col items-center gap-2 text-center">
        <h1 class="text-2xl font-bold">Recover Password</h1>
        <p class="text-sm text-muted-foreground">
          Enter your email and we'll send you a link to reset your password
        </p>
      </div>

      <div class="grid gap-4">
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input
            id="email"
            v-model="email"
            placeholder="user@example.com"
            type="email"
            required
          />
        </div>

        <LoadingButton type="submit" :loading="isLoading">
          Send Reset Link
        </LoadingButton>
      </div>

      <div class="text-center text-sm">
        Remember your password?{" "}
        <router-link to="/login" class="underline underline-offset-4">
          Log in
        </router-link>
      </div>
    </form>
  </AuthLayout>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { RouterLink } from "vue-router"
import AuthLayout from "@/components/Common/AuthLayout.vue"
import Input from "@/components/ui/input.vue"
import Label from "@/components/ui/label.vue"
import LoadingButton from "@/components/ui/loading-button.vue"
import useCustomToast from "@/hooks/useCustomToast"

const email = ref("")
const isLoading = ref(false)
const { showSuccessToast } = useCustomToast()

const onSubmit = async () => {
  isLoading.value = true
  // TODO: Implement password recovery API call
  setTimeout(() => {
    showSuccessToast("Password reset link sent to your email")
    isLoading.value = false
  }, 1000)
}
</script>
