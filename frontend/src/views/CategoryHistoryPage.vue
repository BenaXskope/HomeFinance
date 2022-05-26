<script setup lang="ts">
import { useRoute } from 'vue-router'
import PayoutsTable from '@components/payouts/PayoutsTable.vue'
import ArrowLeftIcon from 'vue-material-design-icons/ArrowLeft.vue'
const route = useRoute()
</script>
<template>
  <ConfirmDialog />
  <router-link :to="{path: '/planning'}">
    <ArrowLeftIcon class="text-3xl text-primary-dark" />
  </router-link>
  <h1 class="text-primary-semi-dark mb-4">
    {{ route.query.categoryTitle }}
  </h1>
  <PayoutsTable :category="(route.params.id as string)" :is-expense="Boolean(+route.query.isExpense!)" />
</template>
