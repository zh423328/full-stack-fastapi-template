<template>
  <div>
    <div>
      <h1 class="text-2xl truncate max-w-sm">
        Hi, {{ currentUser?.full_name || currentUser?.email }} 👋
      </h1>
      <p class="text-muted-foreground">
        Welcome back, nice to see you again!!!
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import useAuth from "@/hooks/useAuth"

const { user: currentUser } = useAuth()
</script>
