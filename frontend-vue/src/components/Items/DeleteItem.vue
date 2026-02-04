<template>
  <DropdownMenuItem variant="destructive" @click="openDialog">
    <Trash2 class="h-4 w-4" />
    Delete Item
  </DropdownMenuItem>

  <Dialog v-model="isOpen">
    <form @submit.prevent="onSubmit">
      <DialogHeader>
        <DialogTitle>Delete Item</DialogTitle>
        <DialogDescription>
          This item will be permanently deleted. Are you sure? You will not
          be able to undo this action.
        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <Button variant="outline" @click="isOpen = false" :disabled="isLoading">
          Cancel
        </Button>
        <LoadingButton
          variant="destructive"
          type="submit"
          :loading="isLoading"
        >
          Delete
        </LoadingButton>
      </DialogFooter>
    </form>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useMutation, useQueryClient } from "@tanstack/vue-query"
import { Trash2 } from "lucide-vue-next"
import { ItemsService } from "@/client"
import Button from "@/components/ui/button.vue"
import Dialog from "@/components/ui/dialog.vue"
import DialogHeader from "@/components/ui/dialog-header.vue"
import DialogTitle from "@/components/ui/dialog-title.vue"
import DialogDescription from "@/components/ui/dialog-description.vue"
import DialogFooter from "@/components/ui/dialog-footer.vue"
import DropdownMenuItem from "@/components/ui/dropdown-menu-item.vue"
import LoadingButton from "@/components/ui/loading-button.vue"
import useCustomToast from "@/hooks/useCustomToast"
import { handleError } from "@/utils"

interface Props {
  id: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  success: []
}>()

const isOpen = ref(false)
const queryClient = useQueryClient()
const { showSuccessToast, showErrorToast } = useCustomToast()

const mutation = useMutation({
  mutationFn: () => ItemsService.deleteItem({ id: props.id }),
  onSuccess: () => {
    showSuccessToast("The item was deleted successfully")
    isOpen.value = false
    emit("success")
    queryClient.invalidateQueries({ queryKey: ["items"] })
  },
  onError: handleError.bind(showErrorToast),
})

const isLoading = mutation.isPending

const openDialog = () => {
  isOpen.value = true
}

const onSubmit = () => {
  if (!isLoading.value) {
    mutation.mutate()
  }
}
</script>
