<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Dropdown from 'primevue/dropdown'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { FilterMatchMode } from 'primevue/api'

const mockCurrencies = [
  {
    id: 1,
    label: 'USD',
    value: 70.00,
    date: new Date(),
  },
  {
    id: 2,
    label: 'EUR',
    value: 80.00,
    date: new Date(),
  },
  {
    id: 3,
    label: 'CHN',
    value: 50.00,
    date: new Date(),
  },
]

const filters = reactive({ label: { value: undefined, matchMode: FilterMatchMode.CONTAINS } })

const conversionFrom = ref(null)
const conversionTo = ref(null)
const conversionAmount = ref(null)

const conversionResult = computed(() => {
  const fromCurrency = mockCurrencies.find(c => c.id === conversionFrom.value)
  const toCurrency = mockCurrencies.find(c => c.id === conversionTo.value)

  if (conversionAmount.value && fromCurrency && toCurrency)
    return conversionAmount.value * (fromCurrency.value / toCurrency.value)

  return 0
})
const conversionResultLabel = computed(() => mockCurrencies.find(c => c.id === conversionTo.value)?.label ?? '')
</script>
<template>
  <h1 class="text-primary-semi-dark mb-4">
    Курс валют
  </h1>
  <div class="flex flex-column-reverse md:flex-row">
    <div class="md:col-6">
      <div class="mb-5">
        <div class="mb-5">
          Выберите исходную валюту
        </div>
        <Dropdown id="category" v-model="conversionFrom" class="w-full" :options="mockCurrencies" option-label="label" option-value="id" name="category" placeholder="Исходная валюта" filter />
      </div>
      <div class="mb-5">
        <div class="mb-5">
          Введите сумму
        </div>
        <InputNumber v-model="conversionAmount" class="w-full" placeholder="Сумма" />
      </div>
      <div class="mb-5">
        <div class="mb-5">
          Выберите конечную валюту
        </div>
        <Dropdown id="category" v-model="conversionTo" class="w-full" :options="mockCurrencies" option-label="label" option-value="id" name="category" placeholder="Конечная валюта" filter />
      </div>
      <div class="mb-6">
        Результат: {{ conversionResult }} {{ conversionResultLabel }}
      </div>
    </div>
    <hr class="md:hidden my-5 w-full">
    <div class="md:col-6">
      <DataTable
        v-model:filters="filters"
        :value="mockCurrencies"
        :paginator="true" class="p-datatable-customers" :rows="9"
        data-key="id"
        row-hover
      >
        <template #header>
          <div class="flex justify-content-start align-items-center">
            <div class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText v-model="filters['label'].value" placeholder="Поиск по названию валюты" />
            </div>
          </div>
        </template>
        <Column field="label" header="Категория" />
        <Column field="value" header="Курс" />
        <Column field="date" header="Дата обновления">
          <template #body="{data}">
            {{ data.date.toLocaleDateString() }}
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>
<style lang="scss">
@import 'primeflex/primeflex.scss';

.p-datatable {
  @include styleclass('overflow-hidden border-1 border-round border-gray-400')
}
</style>
