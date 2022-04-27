<script setup lang="ts">
import { computed } from 'vue'
import Tag from 'primevue/tag'
const props = defineProps<{
  isExpense: boolean
}>()

const tagValue = computed(() => props.isExpense ? 'Расход' : 'Доход')
const tagColor = computed(() => props.isExpense ? 'bg-primary' : 'bg-green-500')
</script>
<template>
  <Tag :value="tagValue" class="w-5rem text-base" :class="[tagColor]" />
</template>
