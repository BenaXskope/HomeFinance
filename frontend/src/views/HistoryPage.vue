<script setup lang="ts">
import { ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import ConfirmDialog from 'primevue/confirmdialog'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'

import RecordTypeTag from '@components/common/RecordTypeTag.vue'

import { deletePayout, getPayouts } from '@api/payouts/payouts'
import type { PayoutsList } from '@api/payouts/payouts'

const payouts = ref<PayoutsList>([])
const isPayoutsListLoading = ref(false)
const fetchPayouts = async() => {
  isPayoutsListLoading.value = true
  const fetchedPayouts = await getPayouts()

  if (fetchedPayouts.isRight())
    payouts.value = fetchedPayouts.value

  isPayoutsListLoading.value = false
}
await fetchPayouts()

const expandedRows = ref([])

const toast = useToast()
const confirm = useConfirm()
const handleDelete = (id: number) => {
  confirm.require({
    message: 'Вы действительно хотите удалить запись?',
    header: 'Подтвердите удаление',
    icon: 'pi pi-exclamation-triangle',
    accept: async() => {
      const result = await deletePayout({ id })
      if (result.isRight()) {
        toast.add({ severity: 'success', summary: 'Успешно', detail: 'Запись удалена', life: 3000 })
        fetchPayouts()
        return
      }
      toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Ошибка при удалении записи', life: 3000 })
    },
  })
}
</script>
<template>
  <ConfirmDialog />

  <h1 class="text-primary-semi-dark mb-4">
    История
  </h1>
  <DataTable
    v-model:expandedRows="expandedRows"
    :value="payouts"
    :paginator="true" class="p-datatable-customers" :rows="9"
    :loading="isPayoutsListLoading"
    data-key="id"
    row-hover
  >
    <Column style="flex-shrink: 0; flex-grow: 0; flex-basis: 3em;" expander />
    <Column field="amount" header="Сумма">
      <template #body="{data}">
        {{ data.amount }} ₽
      </template>
    </Column>
    <Column field="categoryTitle" header="Категория" />
    <Column field="date" header="Дата" />
    <Column field="isExpense" header="Тип">
      <template
        #body="{data}"
      >
        <RecordTypeTag :is-expense="data.isExpense" />
      </template>
    </Column>
    <Column header-style="width: 2rem; text-align: center" body-style="text-align: center; overflow: visible">
      <template #body="{data}">
        <Button type="button" class="p-button-raised p-button-danger" icon="pi pi-trash" @click="handleDelete(data.id)" />
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
