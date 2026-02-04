<template>
  <div class="space-y-6 py-6">
    <div class="space-y-4">
      <div class="grid gap-2">
        <Label for="email">Email</Label>
        <Input
          id="email"
          v-model="formData.email"
          type="email"
          disabled
        />
      </div>

      <div class="grid gap-2">
        <Label for="full-name">Full Name</Label>
        <Input
          id="full-name"
          v-model="formData.full_name"
          placeholder="Full Name"
        />
      </div>

      <LoadingButton @click="onSubmit" :loading="isLoading">
        Save Changes
      </LoadingButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue"
import Input from "@/components/ui/input.vue"
import Label from "@/components/ui/label.vue"
import LoadingButton from "@/components/ui/loading-button.vue"
import useAuth from "@/hooks/useAuth"
import useCustomToast from "@/hooks/useCustomToast"

const { user } = useAuth()
const { showSuccessToast } = useCustomToast()
const isLoading = ref(false)

const formData = reactive({
  email: "",
  full_name: "",
})

watch(user, (newUser) => {
  if (newUser) {
    formData.email = newUser.email
    formData.full_name = newUser.full_name || ""
  }
}, { immediate: true })

const onSubmit = async () => {
  isLoading.value = true
  // TODO: Implement update user API call
  setTimeout(() => {
    showSuccessToast("Profile updated successfully")
    isLoading.value = false
  }, 1000)
}
</script>
