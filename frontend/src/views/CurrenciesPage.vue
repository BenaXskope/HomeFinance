<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Dropdown from 'primevue/dropdown'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { FilterMatchMode } from 'primevue/api'

import { getCurrencies } from '@api/currencies/currencies'
import type { CurrenciesList, Currency } from '@api/currencies/currencies'

const currencies = ref<CurrenciesList>([])
const fetchCurrencies = async() => {
  const fetchedCurrencies = await getCurrencies()
  if (fetchedCurrencies.isRight())
    currencies.value = fetchedCurrencies.value
}
await fetchCurrencies()

const currenciesWithRub = computed<CurrenciesList>(() => [...currencies.value, { id: -1, code: 'RUB', rate: 1 }])

const filters = reactive({ code: { value: undefined, matchMode: FilterMatchMode.CONTAINS } })

const conversionFrom = ref<null |Currency>(null)
const conversionTo = ref<null |Currency>(null)
const conversionAmount = ref<number | null>(null)

const conversionResult = computed(() => {
  if (conversionAmount.value && conversionFrom.value && conversionTo.value)
    return (conversionAmount.value * (conversionFrom.value.rate / conversionTo.value.rate)).toFixed(2)

  return '0'
})
const conversionResultLabel = computed(() => conversionTo.value?.code ?? '')
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
        <Dropdown id="category" v-model="conversionFrom" class="w-full" :options="currenciesWithRub" option-label="code" name="category" placeholder="Исходная валюта" filter />
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
        <Dropdown id="category" v-model="conversionTo" class="w-full" :options="currenciesWithRub" option-label="code" name="category" placeholder="Конечная валюта" filter />
      </div>
      <div class="mb-6">
        Результат: {{ conversionResult }} {{ conversionResultLabel }}
      </div>
    </div>
    <hr class="md:hidden my-5 w-full">
    <div class="md:col-6">
      <DataTable
        v-model:filters="filters"
        :value="currencies"
        :paginator="true" class="p-datatable-customers" :rows="9"
        data-key="id"
        row-hover
      >
        <template #header>
          <div class="flex justify-content-start align-items-center">
            <div class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText v-model="filters['code'].value" placeholder="Поиск по названию валюты" />
            </div>
          </div>
        </template>
        <Column field="code" header="Валюта" />
        <Column field="rate" header="Курс">
          <template #body="{data}">
            {{ data.rate }} ₽
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
