<script setup lang="ts">
import { watch } from 'vue'
import { useField, useForm } from 'vee-validate'
import { number, object, string } from 'yup'
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'

const mockCategories = [
  {
    id: 1,
    label: 'Еда',
    limit: 10000,
  },
  {
    id: 2,
    label: 'Одежда',
    limit: 20000,
  },
  {
    id: 3,
    label: 'Техника',
    limit: 30000,
  },
  {
    id: 4,
    label: 'Здоровье',
    limit: 11000,
  },
]

const schema = object({
  category: number().required('Обязательное поле'),
  name: string().required('Обязательное поле'),
  limit: number().min(1, 'Сумма должна быть положительной').required('Обязательное поле'),
})

const { handleSubmit } = useForm({
  validationSchema: schema,
})

const { value: category, errorMessage: categoryError } = useField<number>('category')
const { value: name, errorMessage: nameError } = useField<string>('name')
const { value: limit, errorMessage: limitError } = useField<number>('limit')

watch(category, (newSelectedCategory) => {
  const selectedCategory = mockCategories.find(category => category.id === newSelectedCategory)

  if (selectedCategory) {
    name.value = selectedCategory.label
    limit.value = selectedCategory.limit
  }
})

const onSubmit = handleSubmit((values) => {
  console.log(values)
})
</script>
<template>
  <form class="flex flex-column" @submit.prevent="onSubmit">
    <div class="mb-5">
      <div class="mb-5">
        Выберите категорию
      </div>
      <Dropdown id="category" v-model="category" class="w-full" :options="mockCategories" option-label="label" option-value="id" name="category" placeholder="Категория" filter />
      <div class="p-error mt-1 h-1rem text-sm">
        {{ categoryError }}
      </div>
    </div>
    <div class="mb-5">
      <div class="mb-5">
        Введите название
      </div>
      <InputText id="description" v-model="name" class="w-full" type="text" name="description" placeholder="Название" />
      <div class="p-error mt-1 h-1rem text-sm">
        {{ nameError }}
      </div>
    </div>
    <div class="mb-5">
      <div class="mb-5">
        Введите месячный лимит
      </div>
      <InputNumber id="amount" v-model="limit" class="w-full" name="limit" placeholder="Сумма" />
      <div class="p-error mt-1 h-1rem text-sm">
        {{ limitError }}
      </div>
    </div>
    <Button label="РЕДАКТИРОВАТЬ" class="p-button-rounded align-self-end" type="submit" />
  </form>
</template>
