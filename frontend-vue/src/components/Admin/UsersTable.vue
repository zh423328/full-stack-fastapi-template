<template>
  <div v-if="isLoading" class="py-12">
    <PendingUsers />
  </div>
  <div v-else-if="users && users.data.length === 0" class="flex flex-col items-center justify-center text-center py-12">
    <div class="rounded-full bg-muted p-4 mb-4">
      <Users class="h-8 w-8 text-muted-foreground" />
    </div>
    <h3 class="text-lg font-semibold">No users found</h3>
    <p class="text-muted-foreground">Add a new user to get started</p>
  </div>
  <DataTable v-else-if="users" :columns="columns" :data="users.data">
    <template #cell-full_name="{ row }">
      <div class="flex items-center gap-2">
        <span :class="cn('font-medium', !row.full_name && 'text-muted-foreground')">
          {{ row.full_name || "N/A" }}
        </span>
        <Badge v-if="row.id === currentUser?.id" variant="outline" class="text-xs">
          You
        </Badge>
      </div>
    </template>

    <template #cell-email="{ row }">
      <span class="text-muted-foreground">{{ row.email }}</span>
    </template>

    <template #cell-is_superuser="{ row }">
      <Badge :variant="row.is_superuser ? 'default' : 'secondary'">
        {{ row.is_superuser ? "Superuser" : "User" }}
      </Badge>
    </template>

    <template #cell-is_active="{ row }">
      <div class="flex items-center gap-2">
        <span
          :class="cn(
            'size-2 rounded-full',
            row.is_active ? 'bg-green-500' : 'bg-gray-400'
          )"
        />
        <span :class="row.is_active ? '' : 'text-muted-foreground'">
          {{ row.is_active ? "Active" : "Inactive" }}
        </span>
      </div>
    </template>

    <template #cell-actions="{ row }">
      <div class="flex justify-end">
        <UserActionsMenu :user="row" />
      </div>
    </template>
  </DataTable>
</template>

<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query"
import { Users } from "lucide-vue-next"
import { UsersService } from "@/client"
import Badge from "@/components/ui/badge.vue"
import DataTable from "@/components/Common/DataTable.vue"
import PendingUsers from "@/components/Pending/PendingUsers.vue"
import UserActionsMenu from "./UserActionsMenu.vue"
import { columns } from "./columns"
import { cn } from "@/lib/utils"
import useAuth from "@/hooks/useAuth"

const { user: currentUser } = useAuth()

const { data: users, isLoading } = useQuery({
  queryKey: ["users"],
  queryFn: () => UsersService.readUsers({ skip: 0, limit: 100 }),
})
</script>
