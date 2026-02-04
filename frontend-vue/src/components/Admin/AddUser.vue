<template>
  <Button @click="openDialog">
    <Plus class="h-4 w-4 mr-2" />
    Add User
  </Button>

  <Dialog v-model="isOpen">
    <DialogHeader>
      <DialogTitle>Add User</DialogTitle>
      <DialogDescription>
        Fill in the form below to add a new user to the system.
      </DialogDescription>
    </DialogHeader>

    <form @submit.prevent="onSubmit" class="space-y-4 py-4">
      <div class="grid gap-2">
        <Label for="email">
          Email <span class="text-destructive">*</span>
        </Label>
        <Input
          id="email"
          v-model="formData.email"
          type="email"
          placeholder="Email"
          required
        />
      </div>

      <div class="grid gap-2">
        <Label for="full_name">Full Name</Label>
        <Input
          id="full_name"
          v-model="formData.full_name"
          placeholder="Full name"
        />
      </div>

      <div class="grid gap-2">
        <Label for="password">
          Set Password <span class="text-destructive">*</span>
        </Label>
        <PasswordInput
          id="password"
          v-model="formData.password"
          placeholder="Password"
          required
        />
      </div>

      <div class="grid gap-2">
        <Label for="confirm_password">
          Confirm Password <span class="text-destructive">*</span>
        </Label>
        <PasswordInput
          id="confirm_password"
          v-model="confirmPassword"
          placeholder="Password"
          required
        />
        <p v-if="passwordMismatch" class="text-xs text-destructive">
          The passwords don't match
        </p>
      </div>

      <div class="flex items-center gap-3">
        <Checkbox v-model:checked="formData.is_superuser" />
        <Label class="font-normal">Is superuser?</Label>
      </div>

      <div class="flex items-center gap-3">
        <Checkbox v-model:checked="formData.is_active" />
        <Label class="font-normal">Is active?</Label>
      </div>

      <DialogFooter>
        <Button variant="outline" @click="isOpen = false" :disabled="isLoading">
          Cancel
        </Button>
        <LoadingButton type="submit" :loading="isLoading">
          Save
        </LoadingButton>
      </DialogFooter>
    </form>
  </Dialog>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue"
import { useMutation, useQueryClient } from "@tanstack/vue-query"
import { Plus } from "lucide-vue-next"
import { type UserCreate, UsersService } from "@/client"
import Button from "@/components/ui/button.vue"
import Checkbox from "@/components/ui/checkbox.vue"
import Dialog from "@/components/ui/dialog.vue"
import DialogHeader from "@/components/ui/dialog-header.vue"
import DialogTitle from "@/components/ui/dialog-title.vue"
import DialogDescription from "@/components/ui/dialog-description.vue"
import DialogFooter from "@/components/ui/dialog-footer.vue"
import Input from "@/components/ui/input.vue"
import Label from "@/components/ui/label.vue"
import LoadingButton from "@/components/ui/loading-button.vue"
import PasswordInput from "@/components/ui/password-input.vue"
import useCustomToast from "@/hooks/useCustomToast"
import { handleError } from "@/utils"

const isOpen = ref(false)
const confirmPassword = ref("")
const queryClient = useQueryClient()
const { showSuccessToast, showErrorToast } = useCustomToast()

const formData = reactive<UserCreate>({
  email: "",
  full_name: "",
  password: "",
  is_superuser: false,
  is_active: false,
})

const passwordMismatch = computed(() => {
  return confirmPassword.value && formData.password !== confirmPassword.value
})

const mutation = useMutation({
  mutationFn: (data: UserCreate) =>
    UsersService.createUser({ requestBody: data }),
  onSuccess: () => {
    showSuccessToast("User created successfully")
    isOpen.value = false
    // Reset form
    formData.email = ""
    formData.full_name = ""
    formData.password = ""
    formData.is_superuser = false
    formData.is_active = false
    confirmPassword.value = ""
    queryClient.invalidateQueries({ queryKey: ["users"] })
  },
  onError: handleError.bind(showErrorToast),
})

const isLoading = mutation.isPending

const openDialog = () => {
  isOpen.value = true
}

const onSubmit = () => {
  if (passwordMismatch.value || isLoading.value) return
  mutation.mutate(formData)
}
</script>
