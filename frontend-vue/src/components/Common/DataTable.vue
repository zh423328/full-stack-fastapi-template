<template>
  <div class="rounded-md border">
    <table class="w-full">
      <thead>
        <tr class="border-b bg-muted/50">
          <th
            v-for="column in columns"
            :key="column.key"
            class="px-4 py-3 text-left text-sm font-medium"
          >
            {{ column.header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in data"
          :key="index"
          class="border-b last:border-0 hover:bg-muted/50"
        >
          <td
            v-for="column in columns"
            :key="column.key"
            class="px-4 py-3 text-sm"
          >
            <slot :name="`cell-${String(column.key)}`" :row="row">
              {{ row[column.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
interface Column {
  key: string
  header: string
}

interface Props {
  columns: Column[]
  data: any[]
}

defineProps<Props>()
</script>
