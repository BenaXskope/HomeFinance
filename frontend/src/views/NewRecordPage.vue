<script setup lang="ts">
import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import { boolean, number, object, string } from 'yup'
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import RadioButton from 'primevue/radiobutton'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useToast } from 'primevue/usetoast'

import RecordTypeTag from '@components/common/RecordTypeTag.vue'
import CreateFastRecordModal from '@components/new-record/CreateFastRecordModal.vue'

import { createPayout } from '@api/payouts/payouts'
import { getFastPayouts } from '@/api/payouts/fast-payouts'
import { getCategories } from '@/api/categories/categories'
import type { CategoriesList } from '@/api/categories/categories'

const categories = ref<CategoriesList>([])
await getCategories().then((cat) => {
  if (cat.isRight())
    categories.value = cat.value
})

const fastRecords = ref([])
await getFastPayouts().then(r => console.log(r))

const schema = object({
  category: number().required('Обязательное поле'),
  amount: number().min(1, 'Сумма должна быть положительной').required('Обязательное поле'),
  isExpense: boolean().required('Обязательное поле'),
  description: string(),
})

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    category: undefined,
    amount: undefined,
    isExpense: false,
    description: undefined,
  },
})

const { value: category, errorMessage: categoryError } = useField<number>('category')
const { value: amount, errorMessage: amountError } = useField<number>('amount')
const { value: isExpense } = useField<boolean>('isExpense')
const { value: description } = useField<string>('description')

const toast = useToast()
const onSubmit = handleSubmit(async(values, { resetForm }) => {
  if (!schema.isValidSync(values)) return

  const result = await createPayout(values)
  if (result.isRight()) {
    toast.add({ severity: 'success', summary: 'Успешно', detail: 'Запись создана', life: 3000 })
    resetForm()
  }

  toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Ошибка при создании записи', life: 3000 })
})

const mockFastRecords = [
  {
    id: 1,
    category: 1,
    categoryLabel: 'Еда',
    amount: 1000,
    isExpense: true,
  },
  {
    id: 2,
    category: 2,
    categoryLabel: 'Одежда',
    amount: 2000,
    isExpense: true,
  },
  {
    id: 3,
    category: 3,
    categoryLabel: 'Техника',
    amount: 30000,
    isExpense: false,
  },
  {
    id: 4,
    category: 4,
    categoryLabel: 'Здоровье',
    amount: 760,
    isExpense: true,
  },
  {
    id: 5,
    category: 1,
    categoryLabel: 'Еда',
    amount: 1000,
    isExpense: true,
  },
  {
    id: 6,
    category: 2,
    categoryLabel: 'Одежда',
    amount: 2000,
    isExpense: true,
  },
  {
    id: 7,
    category: 3,
    categoryLabel: 'Техника',
    amount: 30000,
    isExpense: false,
  },
  {
    id: 8,
    category: 4,
    categoryLabel: 'Здоровье',
    amount: 760,
    isExpense: true,
  },
  {
    id: 9,
    category: 1,
    categoryLabel: 'Еда',
    amount: 1000,
    isExpense: true,
  },
  {
    id: 10,
    category: 2,
    categoryLabel: 'Одежда',
    amount: 2000,
    isExpense: true,
  },
  {
    id: 11,
    category: 3,
    categoryLabel: 'Техника',
    amount: 30000,
    isExpense: false,
  },
  {
    id: 12,
    category: 4,
    categoryLabel: 'Здоровье',
    amount: 760,
    isExpense: true,
  },
]

const handleFastRecordSelected = (selectedRecord: Pick<typeof mockFastRecords[number], 'amount' | 'category' | 'isExpense'>) => {
  category.value = selectedRecord.category
  amount.value = selectedRecord.amount
  isExpense.value = selectedRecord.isExpense
}

const isNewFastRecordDialogOpen = ref(false)
</script>
<template>
  <h1 class="text-primary-semi-dark mb-7">
    Создание новой записи
  </h1>
  <div class="flex flex-column md:flex-row text-lg">
    <form class="md:col-6 flex flex-column" @submit.prevent="onSubmit">
      <div class="mb-5">
        <div class="mb-5">
          Выберите категорию
        </div>
        <Dropdown id="category" v-model="category" class="w-full" :options="categories" option-label="title" option-value="id" name="category" placeholder="Категория" filter />
        <div class="p-error mt-1 h-1rem text-sm">
          {{ categoryError }}
        </div>
      </div>
      <div class="mb-5">
        <div class="mb-5">
          Введите сумму
        </div>
        <InputNumber id="amount" v-model="amount" class="w-full" name="amount" placeholder="Сумма" />
        <div class="p-error mt-1 h-1rem text-sm">
          {{ amountError }}
        </div>
      </div>
      <div class="mb-5 flex align-items-center">
        <div class="col-6">
          <RadioButton id="income" v-model="isExpense" class="mr-4" name="type" :value="false" />
          <label for="income">Доход</label>
        </div>
        <div class="col-6">
          <RadioButton id="expense" v-model="isExpense" class="mr-4" name="type" :value="true" />
          <label for="expense">Расход</label>
        </div>
      </div>
      <div class="mb-3">
        <div class="mb-5">
          Введите описание
        </div>
        <InputText id="description" v-model="description" class="w-full" type="text" name="description" placeholder="Описание" />
      </div>
      <Button label="СОЗДАТЬ" class="p-button-rounded align-self-end" type="submit" />
    </form>
    <hr class="md:hidden my-5 w-full">
    <div class="md:col-6">
      <div class="w-full flex justify-content-between align-items-center mb-2">
        <div>Быстрая запись</div>
        <Button icon="pi pi-plus" class="p-button-rounded -mt-1" @click="isNewFastRecordDialogOpen = !isNewFastRecordDialogOpen" />
      </div>
      <DataTable
        :value="mockFastRecords" :paginator="true" class="p-datatable-customers" :rows="5"
        selection-mode="single"
        data-key="id"
        row-hover
        @row-select="(evt: any) => handleFastRecordSelected(evt.data)"
      >
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
        <Column field="isExpense" header="Тип">
          <template
            #body="{data}"
          >
            <RecordTypeTag :is-expense="data.isExpense" />
          </template>
        </Column>
      </DataTable>
    </div>
    <CreateFastRecordModal v-model="isNewFastRecordDialogOpen" :categories="categories" />
  </div>
</template>
<style lang="scss">
@import 'primeflex/primeflex.scss';

.p-datatable {
  @include styleclass('overflow-hidden border-1 border-round border-gray-400')
}
</style>
