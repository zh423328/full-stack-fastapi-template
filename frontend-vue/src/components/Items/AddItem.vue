<template>
  <Button @click="openDialog">
    <Plus class="h-4 w-4 mr-2" />
    Add Item
  </Button>

  <Dialog v-model="isOpen">
    <DialogHeader>
      <DialogTitle>Add Item</DialogTitle>
      <DialogDescription>
        Fill in the form below to add a new item.
      </DialogDescription>
    </DialogHeader>

    <form @submit.prevent="onSubmit" class="space-y-4 py-4">
      <div class="grid gap-2">
        <Label for="title">
          Title <span class="text-destructive">*</span>
        </Label>
        <Input
          id="title"
          v-model="formData.title"
          placeholder="Title"
          required
        />
      </div>

      <div class="grid gap-2">
        <Label for="description">Description</Label>
        <Input
          id="description"
          v-model="formData.description"
          placeholder="Description"
        />
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
import { reactive, ref } from "vue"
import { useMutation, useQueryClient } from "@tanstack/vue-query"
import { Plus } from "lucide-vue-next"
import { type ItemCreate, ItemsService } from "@/client"
import Button from "@/components/ui/button.vue"
import Dialog from "@/components/ui/dialog.vue"
import DialogHeader from "@/components/ui/dialog-header.vue"
import DialogTitle from "@/components/ui/dialog-title.vue"
import DialogDescription from "@/components/ui/dialog-description.vue"
import DialogFooter from "@/components/ui/dialog-footer.vue"
import Input from "@/components/ui/input.vue"
import Label from "@/components/ui/label.vue"
import LoadingButton from "@/components/ui/loading-button.vue"
import useCustomToast from "@/hooks/useCustomToast"
import { handleError } from "@/utils"

const isOpen = ref(false)
const queryClient = useQueryClient()
const { showSuccessToast, showErrorToast } = useCustomToast()

const formData = reactive<ItemCreate>({
  title: "",
  description: "",
})

const mutation = useMutation({
  mutationFn: (data: ItemCreate) =>
    ItemsService.createItem({ requestBody: data }),
  onSuccess: () => {
    showSuccessToast("Item created successfully")
    isOpen.value = false
    // Reset form
    formData.title = ""
    formData.description = ""
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
    mutation.mutate(formData)
  }
}
</script>
