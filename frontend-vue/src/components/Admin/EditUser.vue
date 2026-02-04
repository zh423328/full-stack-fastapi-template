<template>
  <DropdownMenuItem @click="openDialog">
    <Pencil class="h-4 w-4" />
    Edit User
  </DropdownMenuItem>

  <Dialog v-model="isOpen">
    <DialogHeader>
      <DialogTitle>Edit User</DialogTitle>
      <DialogDescription>
        Update the user details below.
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
        <Label for="password">Set Password</Label>
        <PasswordInput
          id="password"
          v-model="formData.password"
          placeholder="Password"
        />
      </div>

      <div class="grid gap-2">
        <Label for="confirm_password">Confirm Password</Label>
        <PasswordInput
          id="confirm_password"
          v-model="confirmPassword"
          placeholder="Password"
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
import { Pencil } from "lucide-vue-next"
import { type UserPublic, UsersService } from "@/client"
import Button from "@/components/ui/button.vue"
import Checkbox from "@/components/ui/checkbox.vue"
import Dialog from "@/components/ui/dialog.vue"
import DialogHeader from "@/components/ui/dialog-header.vue"
import DialogTitle from "@/components/ui/dialog-title.vue"
import DialogDescription from "@/components/ui/dialog-description.vue"
import DialogFooter from "@/components/ui/dialog-footer.vue"
import DropdownMenuItem from "@/components/ui/dropdown-menu-item.vue"
import Input from "@/components/ui/input.vue"
import Label from "@/components/ui/label.vue"
import LoadingButton from "@/components/ui/loading-button.vue"
import PasswordInput from "@/components/ui/password-input.vue"
import useCustomToast from "@/hooks/useCustomToast"
import { handleError } from "@/utils"

interface Props {
  user: UserPublic
}

const props = defineProps<Props>()
const emit = defineEmits<{
  success: []
}>()

const isOpen = ref(false)
const confirmPassword = ref("")
const queryClient = useQueryClient()
const { showSuccessToast, showErrorToast } = useCustomToast()

const formData = reactive({
  email: props.user.email,
  full_name: props.user.full_name || "",
  password: "",
  is_superuser: props.user.is_superuser,
  is_active: props.user.is_active,
})

const passwordMismatch = computed(() => {
  return confirmPassword.value && formData.password !== confirmPassword.value
})

const mutation = useMutation({
  mutationFn: (data: any) =>
    UsersService.updateUser({ userId: props.user.id, requestBody: data }),
  onSuccess: () => {
    showSuccessToast("User updated successfully")
    isOpen.value = false
    emit("success")
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

  const submitData: any = {
    email: formData.email,
    full_name: formData.full_name || undefined,
    is_superuser: formData.is_superuser,
    is_active: formData.is_active,
  }

  if (formData.password) {
    submitData.password = formData.password
  }

  mutation.mutate(submitData)
}
</script>
