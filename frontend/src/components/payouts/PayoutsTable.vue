<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { useStorage } from '@vueuse/core'
import Calendar from 'primevue/calendar'
import InputText from 'primevue/inputtext'
import SelectButton from 'primevue/selectbutton'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import ConfirmDialog from 'primevue/confirmdialog'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import { FilterMatchMode } from 'primevue/api'

import RecordTypeTag from '@components/common/RecordTypeTag.vue'

import { deletePayout, getPayouts } from '@api/payouts/payouts'
import type { PayoutsList } from '@api/payouts/payouts'

const props = defineProps<{
  category?: number | string
}>()

const month = useStorage('month', new Date())
const recordsType = [
  {
    label: 'Все',
    value: null,
  }, {
    label: 'Расход',
    value: true,
  },
  {
    label: 'Доход',
    value: false,
  },
]
const selectedType = ref(null)

const payouts = ref<PayoutsList>([])
const isPayoutsListLoading = ref(false)
const fetchPayouts = async() => {
  isPayoutsListLoading.value = true
  const fetchedPayouts = await getPayouts({
    month: month.value,
    category: props.category,
    isExpense: selectedType.value ?? undefined,
  })

  if (fetchedPayouts.isRight())
    payouts.value = fetchedPayouts.value

  isPayoutsListLoading.value = false
}
await fetchPayouts()
watch([month, props.category, selectedType], fetchPayouts)

const filters = reactive({ categoryTitle: { value: undefined, matchMode: FilterMatchMode.CONTAINS } })
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

  <DataTable
    v-model:expandedRows="expandedRows"
    v-model:filters="filters"
    :value="payouts"
    :paginator="true" class="p-datatable-customers" :rows="7"
    :loading="isPayoutsListLoading"
    data-key="id"
    row-hover
  >
    <template #header>
      <div class="flex flex-column md:flex-row justify-content-between md:align-items-center">
        <div v-if="category === undefined" class="p-input-icon-left mb-2 md:mb-0">
          <i class="pi pi-search" />
          <InputText v-model="filters['categoryTitle'].value" placeholder="Поиск по категории" />
        </div>
        <SelectButton v-model="selectedType" :options="recordsType" option-label="label" option-value="value" class="mb-2 md:mb-0" />
        <div class="p-input-icon-left">
          <i class="pi pi-search" />
          <Calendar id="month" v-model="month" view="month" date-format="MM yy" :manual-input="false" show-icon />
        </div>
      </div>
    </template>
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
