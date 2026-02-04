<template>
  <div class="flex flex-col gap-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold tracking-tight">Admin</h1>
        <p class="text-muted-foreground">Manage users and system settings</p>
      </div>
      <AddUser />
    </div>
    <UsersTable />
  </div>
</template>

<script setup lang="ts">
import AddUser from "@/components/Admin/AddUser.vue"
import UsersTable from "@/components/Admin/UsersTable.vue"
</script>
