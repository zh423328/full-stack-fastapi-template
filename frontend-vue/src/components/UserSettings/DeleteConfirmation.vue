<template>
  <Dialog v-model="isOpen">
    <DialogHeader>
      <DialogTitle>Delete Account</DialogTitle>
      <DialogDescription>
        Are you absolutely sure you want to delete your account? This action cannot be undone.
        All your data will be permanently deleted.
      </DialogDescription>
    </DialogHeader>

    <form @submit.prevent="onSubmit" class="space-y-4 py-4">
      <Alert variant="destructive">
        <AlertCircle class="h-4 w-4" />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>
          This action is irreversible. Please type <strong>DELETE</strong> to confirm.
        </AlertDescription>
      </Alert>

      <div class="grid gap-2">
        <Label for="confirmation">Type DELETE to confirm</Label>
        <Input
          id="confirmation"
          v-model="confirmation"
          placeholder="DELETE"
          required
        />
      </div>

      <DialogFooter>
        <Button variant="outline" @click="isOpen = false" :disabled="isLoading">
          Cancel
        </Button>
        <LoadingButton
          variant="destructive"
          type="submit"
          :loading="isLoading"
          :disabled="confirmation !== 'DELETE'"
        >
          Delete Account
        </LoadingButton>
      </DialogFooter>
    </form>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useMutation } from "@tanstack/vue-query"
import { AlertCircle } from "lucide-vue-next"
import { UsersService } from "@/client"
import Alert from "@/components/ui/alert.vue"
import AlertTitle from "@/components/ui/alert-title.vue"
import AlertDescription from "@/components/ui/alert-description.vue"
import Button from "@/components/ui/button.vue"
import Dialog from "@/components/ui/dialog.vue"
import DialogHeader from "@/components/ui/dialog-header.vue"
import DialogTitle from "@/components/ui/dialog-title.vue"
import DialogDescription from "@/components/ui/dialog-description.vue"
import DialogFooter from "@/components/ui/dialog-footer.vue"
import Input from "@/components/ui/input.vue"
import Label from "@/components/ui/label.vue"
import LoadingButton from "@/components/ui/loading-button.vue"
import useAuth from "@/hooks/useAuth"
import useCustomToast from "@/hooks/useCustomToast"
import { handleError } from "@/utils"

const isOpen = defineModel<boolean>({ required: true })

const confirmation = ref("")
const { user, logout } = useAuth()
const { showSuccessToast, showErrorToast } = useCustomToast()

const mutation = useMutation({
  mutationFn: () => UsersService.deleteUserMe(),
  onSuccess: () => {
    showSuccessToast("Account deleted successfully")
    logout()
  },
  onError: handleError.bind(showErrorToast),
})

const isLoading = mutation.isPending

const onSubmit = () => {
  if (confirmation.value === "DELETE" && !isLoading.value) {
    mutation.mutate()
  }
}
</script>
