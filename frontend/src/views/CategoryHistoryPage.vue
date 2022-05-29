<script setup lang="ts">
import { useRoute } from 'vue-router'
import PayoutsTable from '@components/payouts/PayoutsTable.vue'
import ArrowLeftIcon from 'vue-material-design-icons/ArrowLeft.vue'
const route = useRoute()
</script>
<template>
  <ConfirmDialog />
  <div class="flex align-items-center mb-2">
    <router-link :to="{path: '/planning'}">
      <ArrowLeftIcon class="text-4xl text-primary-dark" />
    </router-link>
    <h1 class="text-primary-semi-dark ml-2">
      {{ route.query.categoryTitle }}
    </h1>
  </div>
  <PayoutsTable :category="(route.params.id as string)" :is-expense="Boolean(+route.query.isExpense!)" />
</template>
