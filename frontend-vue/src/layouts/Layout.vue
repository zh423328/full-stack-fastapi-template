<template>
  <div class="flex min-h-screen">
    <AppSidebar />
    <div class="flex flex-1 flex-col">
      <header class="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <button
          @click="toggleSidebar"
          class="-ml-1 text-muted-foreground hover:text-foreground"
        >
          <Menu class="h-5 w-5" />
        </button>
      </header>
      <main class="flex-1 p-6 md:p-8">
        <div class="mx-auto max-w-7xl">
          <RouterView />
        </div>
      </main>
      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { RouterView } from "vue-router"
import { Menu } from "lucide-vue-next"
import AppSidebar from "@/components/Sidebar/AppSidebar.vue"
import Footer from "@/components/Common/Footer.vue"

const sidebarOpen = ref(true)

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}
</script>
