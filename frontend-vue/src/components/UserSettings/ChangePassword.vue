<template>
  <div class="space-y-6 py-6">
    <div class="space-y-4">
      <div class="grid gap-2">
        <Label for="current-password">Current Password</Label>
        <PasswordInput
          id="current-password"
          v-model="formData.currentPassword"
          placeholder="Current Password"
        />
      </div>

      <div class="grid gap-2">
        <Label for="new-password">New Password</Label>
        <PasswordInput
          id="new-password"
          v-model="formData.newPassword"
          placeholder="New Password"
        />
      </div>

      <div class="grid gap-2">
        <Label for="confirm-password">Confirm New Password</Label>
        <PasswordInput
          id="confirm-password"
          v-model="formData.confirmPassword"
          placeholder="Confirm New Password"
        />
        <p v-if="passwordMismatch" class="text-xs text-destructive">
          Passwords do not match
        </p>
      </div>

      <LoadingButton @click="onSubmit" :loading="isLoading">
        Change Password
      </LoadingButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue"
import Label from "@/components/ui/label.vue"
import LoadingButton from "@/components/ui/loading-button.vue"
import PasswordInput from "@/components/ui/password-input.vue"
import useCustomToast from "@/hooks/useCustomToast"

const { showSuccessToast } = useCustomToast()
const isLoading = ref(false)

const formData = reactive({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
})

const passwordMismatch = computed(() => {
  return formData.confirmPassword && formData.newPassword !== formData.confirmPassword
})

const onSubmit = async () => {
  if (!passwordMismatch.value) {
    isLoading.value = true
    // TODO: Implement change password API call
    setTimeout(() => {
      showSuccessToast("Password changed successfully")
      isLoading.value = false
      formData.currentPassword = ""
      formData.newPassword = ""
      formData.confirmPassword = ""
    }, 1000)
  }
}
</script>
