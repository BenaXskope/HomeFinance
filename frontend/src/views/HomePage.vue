<script setup lang="ts">
import Button from 'primevue/button'
import { useCounterStore } from '../stores/counter'

const counter = useCounterStore()
</script>

<template>
  <Button type="button" @click="counter.incrementCount">
    count is: {{ counter.count }}
  </Button>
  <div>
    asdasdasd
  </div>
</template>
