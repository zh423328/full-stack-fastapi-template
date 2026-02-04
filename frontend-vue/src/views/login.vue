<template>
  <AuthLayout>
    <form @submit.prevent="onSubmit" class="flex flex-col gap-6">
      <div class="flex flex-col items-center gap-2 text-center">
        <h1 class="text-2xl font-bold">Login to your account</h1>
      </div>

      <div class="grid gap-4">
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input
            id="email"
            v-model="formData.username"
            data-testid="email-input"
            placeholder="user@example.com"
            type="email"
            required
            @blur="validateEmail"
          />
          <p v-if="errors.username" class="text-xs text-destructive">
            {{ errors.username }}
          </p>
        </div>

        <div class="grid gap-2">
          <div class="flex items-center">
            <Label for="password">Password</Label>
            <router-link
              to="/recover-password"
              class="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </router-link>
          </div>
          <PasswordInput
            id="password"
            v-model="formData.password"
            data-testid="password-input"
            placeholder="Password"
            required
            @blur="validatePassword"
          />
          <p v-if="errors.password" class="text-xs text-destructive">
            {{ errors.password }}
          </p>
        </div>

        <LoadingButton type="submit" :loading="loginMutation.isPending.value">
          Log In
        </LoadingButton>
      </div>

      <div class="text-center text-sm">
        Don't have an account yet?{" "}
        <router-link to="/signup" class="underline underline-offset-4">
          Sign up
        </router-link>
      </div>
    </form>
  </AuthLayout>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue"
import { RouterLink } from "vue-router"
import type { Body_login_login_access_token as AccessToken } from "@/client"
import AuthLayout from "@/components/Common/AuthLayout.vue"
import Input from "@/components/ui/input.vue"
import Label from "@/components/ui/label.vue"
import LoadingButton from "@/components/ui/loading-button.vue"
import PasswordInput from "@/components/ui/password-input.vue"
import useAuth from "@/hooks/useAuth"

const { loginMutation } = useAuth()

const formData = reactive<AccessToken>({
  username: "",
  password: "",
})

const errors = reactive({
  username: "",
  password: "",
})

const validateEmail = () => {
  if (!formData.username) {
    errors.username = "Email is required"
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.username)) {
    errors.username = "Invalid email format"
  } else {
    errors.username = ""
  }
}

const validatePassword = () => {
  if (!formData.password) {
    errors.password = "Password is required"
  } else if (formData.password.length < 8) {
    errors.password = "Password must be at least 8 characters"
  } else {
    errors.password = ""
  }
}

const onSubmit = () => {
  validateEmail()
  validatePassword()

  if (!errors.username && !errors.password && !loginMutation.isPending.value) {
    loginMutation.mutate(formData)
  }
}
</script>
