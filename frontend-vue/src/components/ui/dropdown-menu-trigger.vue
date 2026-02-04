<template>
  <div @click="toggle">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue"

const dropdownMenu = inject<any>("dropdownMenu")
const toggle = () => dropdownMenu?.toggle()
</script>
