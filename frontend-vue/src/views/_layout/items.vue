<template>
  <div class="flex flex-col gap-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold tracking-tight">Items</h1>
        <p class="text-muted-foreground">Create and manage your items</p>
      </div>
      <AddItem />
    </div>
    <ItemsTable />
  </div>
</template>

<script setup lang="ts">
import { Suspense } from "vue"
import AddItem from "@/components/Items/AddItem.vue"
import ItemsTable from "@/components/Items/ItemsTable.vue"
</script>
