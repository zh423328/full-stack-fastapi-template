<template>
  <AuthLayout>
    <form @submit.prevent="onSubmit" class="flex flex-col gap-6">
      <div class="flex flex-col items-center gap-2 text-center">
        <h1 class="text-2xl font-bold">Create an account</h1>
      </div>

      <div class="grid gap-4">
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input
            id="email"
            v-model="formData.email"
            placeholder="user@example.com"
            type="email"
            required
          />
        </div>

        <div class="grid gap-2">
          <Label for="full-name">Full Name</Label>
          <Input
            id="full-name"
            v-model="formData.full_name"
            placeholder="John Doe"
            required
          />
        </div>

        <div class="grid gap-2">
          <Label for="password">Password</Label>
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

        <LoadingButton type="submit" :loading="signUpMutation.isPending.value">
          Sign Up
        </LoadingButton>
      </div>

      <div class="text-center text-sm">
        Already have an account?{" "}
        <router-link to="/login" class="underline underline-offset-4">
          Log in
        </router-link>
      </div>
    </form>
  </AuthLayout>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue"
import { RouterLink } from "vue-router"
import type { UserRegister } from "@/client"
import AuthLayout from "@/components/Common/AuthLayout.vue"
import Input from "@/components/ui/input.vue"
import Label from "@/components/ui/label.vue"
import LoadingButton from "@/components/ui/loading-button.vue"
import PasswordInput from "@/components/ui/password-input.vue"
import useAuth from "@/hooks/useAuth"

const { signUpMutation } = useAuth()

const formData = reactive<UserRegister>({
  email: "",
  full_name: "",
  password: "",
})

const confirmPassword = ref("")

const passwordMismatch = computed(() => {
  return confirmPassword.value && formData.password !== confirmPassword.value
})

const onSubmit = () => {
  if (!passwordMismatch.value && !signUpMutation.isPending.value) {
    signUpMutation.mutate(formData)
  }
}
</script>
