<script setup lang="ts">
import { ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

import RecordTypeTag from '@components/common/RecordTypeTag.vue'

const mockFastRecords = [
  {
    id: 1,
    date: new Date(),
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    category: 1,
    categoryLabel: 'Еда',
    amount: 1000,
    isExpense: true,
  },
  {
    id: 2,
    date: new Date(),
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    category: 2,
    categoryLabel: 'Одежда',
    amount: 2000,
    isExpense: true,
  },
  {
    id: 3,
    date: new Date(),
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    category: 3,
    categoryLabel: 'Техника',
    amount: 30000,
    isExpense: false,
  },
  {
    id: 4,
    date: new Date(),
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    category: 4,
    categoryLabel: 'Здоровье',
    amount: 760,
    isExpense: true,
  },
  {
    id: 5,
    date: new Date(),
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    category: 1,
    categoryLabel: 'Еда',
    amount: 1000,
    isExpense: true,
  },
  {
    id: 6,
    date: new Date(),
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    category: 2,
    categoryLabel: 'Одежда',
    amount: 2000,
    isExpense: true,
  },
  {
    id: 7,
    date: new Date(),
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    category: 3,
    categoryLabel: 'Техника',
    amount: 30000,
    isExpense: false,
  },
  {
    id: 8,
    date: new Date(),
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    category: 4,
    categoryLabel: 'Здоровье',
    amount: 760,
    isExpense: true,
  },
  {
    id: 9,
    date: new Date(),
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    category: 1,
    categoryLabel: 'Еда',
    amount: 1000,
    isExpense: true,
  },
  {
    id: 10,
    date: new Date(),
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    category: 2,
    categoryLabel: 'Одежда',
    amount: 2000,
    isExpense: true,
  },
  {
    id: 11,
    date: new Date(),
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    category: 3,
    categoryLabel: 'Техника',
    amount: 30000,
    isExpense: false,
  },
  {
    id: 12,
    date: new Date(),
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    category: 4,
    categoryLabel: 'Здоровье',
    amount: 760,
    isExpense: true,
  },
]

const expandedRows = ref([])
</script>
<template>
  <h1 class="text-primary-semi-dark mb-4">
    История
  </h1>
  <DataTable
    v-model:expandedRows="expandedRows"
    :value="mockFastRecords"
    :paginator="true" class="p-datatable-customers" :rows="9"

    data-key="id"
    row-hover
  >
    <Column style="flex-shrink: 0; flex-grow: 0; flex-basis: 3em;" expander />
    <Column field="amount" header="Сумма">
      <template #body="{data}">
        {{ data.amount }}
      </template>
    </Column>
    <Column field="category" header="Категория">
      <template #body="{data}">
        {{ data.categoryLabel }}
      </template>
    </Column>
    <Column field="category" header="Дата">
      <template #body="{data}">
        {{ data.date.toLocaleDateString() }}
      </template>
    </Column>
    <Column field="isExpense" header="Тип">
      <template
        #body="{data}"
      >
        <RecordTypeTag :is-expense="data.isExpense" />
      </template>
    </Column>

    <template #expansion="{ data }">
      <div>{{ data.description }}</div>
    </template>
  </DataTable>
</template>
<style lang="scss">
@import 'primeflex/primeflex.scss';

.p-datatable {
  @include styleclass('overflow-hidden border-1 border-round border-gray-400')
}
</style>
