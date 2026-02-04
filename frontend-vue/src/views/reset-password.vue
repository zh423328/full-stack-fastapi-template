<template>
  <AuthLayout>
    <form @submit.prevent="onSubmit" class="flex flex-col gap-6">
      <div class="flex flex-col items-center gap-2 text-center">
        <h1 class="text-2xl font-bold">Reset Password</h1>
        <p class="text-sm text-muted-foreground">
          Enter your new password
        </p>
      </div>

      <div class="grid gap-4">
        <div class="grid gap-2">
          <Label for="password">New Password</Label>
          <PasswordInput
            id="password"
            v-model="formData.password"
            placeholder="Password"
            required
          />
        </div>

        <div class="grid gap-2">
          <Label for="confirm-password">Confirm Password</Label>
          <PasswordInput
            id="confirm-password"
            v-model="confirmPassword"
            placeholder="Confirm Password"
            required
          />
          <p v-if="passwordMismatch" class="text-xs text-destructive">
            Passwords do not match
          </p>
        </div>

        <LoadingButton type="submit" :loading="isLoading">
          Reset Password
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
import { computed, reactive, ref } from "vue"
import { RouterLink, useRouter } from "vue-router"
import AuthLayout from "@/components/Common/AuthLayout.vue"
import Label from "@/components/ui/label.vue"
import LoadingButton from "@/components/ui/loading-button.vue"
import PasswordInput from "@/components/ui/password-input.vue"
import useCustomToast from "@/hooks/useCustomToast"

const router = useRouter()
const { showSuccessToast } = useCustomToast()

const formData = reactive({
  password: "",
})

const confirmPassword = ref("")
const isLoading = ref(false)

const passwordMismatch = computed(() => {
  return confirmPassword.value && formData.password !== confirmPassword.value
})

const onSubmit = async () => {
  if (!passwordMismatch.value) {
    isLoading.value = true
    // TODO: Implement password reset API call
    setTimeout(() => {
      showSuccessToast("Password reset successfully")
      isLoading.value = false
      router.push("/login")
    }, 1000)
  }
}
</script>
