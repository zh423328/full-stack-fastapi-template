<template>
  <div v-if="currentUser" class="flex flex-col gap-6">
    <div>
      <h1 class="text-2xl font-bold tracking-tight">User Settings</h1>
      <p class="text-muted-foreground">
        Manage your account settings and preferences
      </p>
    </div>

    <Tabs default-value="my-profile">
      <TabsList>
        <TabsTrigger
          v-for="tab in finalTabs"
          :key="tab.value"
          :value="tab.value"
        >
          {{ tab.title }}
        </TabsTrigger>
      </TabsList>
      <TabsContent
        v-for="tab in finalTabs"
        :key="tab.value"
        :value="tab.value"
      >
        <component :is="tab.component" />
      </TabsContent>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import Tabs from "@/components/ui/tabs.vue"
import TabsList from "@/components/ui/tabs-list.vue"
import TabsTrigger from "@/components/ui/tabs-trigger.vue"
import TabsContent from "@/components/ui/tabs-content.vue"
import ChangePassword from "@/components/UserSettings/ChangePassword.vue"
import DeleteAccount from "@/components/UserSettings/DeleteAccount.vue"
import UserInformation from "@/components/UserSettings/UserInformation.vue"
import useAuth from "@/hooks/useAuth"

const { user: currentUser } = useAuth()

const tabsConfig = [
  { value: "my-profile", title: "My profile", component: UserInformation },
  { value: "password", title: "Password", component: ChangePassword },
  { value: "danger-zone", title: "Danger zone", component: DeleteAccount },
]

const finalTabs = computed(() => {
  return currentUser.value?.is_superuser
    ? tabsConfig.slice(0, 3)
    : tabsConfig
})
</script>
