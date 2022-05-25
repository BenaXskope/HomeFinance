<script setup lang="ts">
import { computed } from 'vue'
import { useField, useForm } from 'vee-validate'
import { number, object, string } from 'yup'
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'

import type { CategoriesList } from '@api/categories/categories'
import { editCategory } from '@api/categories/categories'

const props = defineProps<{
  categories: CategoriesList
}>()
const emits = defineEmits<{
  (e: 'categoryEdited'): void
}>()

const schema = object({
  id: number().required('Обязательное поле'),
  title: string().required('Обязательное поле'),
  prognosis: number().min(1, 'Сумма должна быть положительной').required('Обязательное поле'),
})

const { handleSubmit } = useForm({
  validationSchema: schema,
})

const { value: id, errorMessage: idError } = useField<number>('id')
const { value: title, errorMessage: titleError } = useField<string>('title')
const { value: prognosis, errorMessage: prognosisError } = useField<number>('prognosis')

const toast = useToast()
const onSubmit = handleSubmit(async(values) => {
  if (!schema.isValidSync(values)) return

  const result = await editCategory(values)
  if (result.isRight()) {
    toast.add({ severity: 'success', summary: 'Успешно', detail: 'Категория изменена', life: 3000 })
    emits('categoryEdited')
    return
  }

  toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Ошибка при изменении категории', life: 3000 })
})

const selectedCategory = computed({
  get() {
    return {
      id: id.value,
      title: title.value,
      prognosis: prognosis.value,
    }
  },
  set(newValue: { id: number; title: string; prognosis: number }) {
    id.value = newValue.id
    title.value = newValue.title
    prognosis.value = newValue.prognosis
  },
})
</script>
<template>
  <form class="flex flex-column" @submit.prevent="onSubmit">
    <div class="mb-5">
      <div class="mb-5">
        Выберите категорию
      </div>
      <Dropdown id="id" v-model="selectedCategory" class="w-full" :options="categories" option-label="title" data-key="id" name="id" placeholder="Категория" filter />
      <div class="p-error mt-1 h-1rem text-sm">
        {{ idError }}
      </div>
    </div>
    <div class="mb-5">
      <div class="mb-5">
        Введите название
      </div>
      <InputText id="description" v-model="title" class="w-full" type="text" name="description" placeholder="Название" />
      <div class="p-error mt-1 h-1rem text-sm">
        {{ titleError }}
      </div>
    </div>
    <div class="mb-5">
      <div class="mb-5">
        Введите месячный лимит
      </div>
      <InputNumber id="amount" v-model="prognosis" class="w-full" name="limit" placeholder="Сумма" />
      <div class="p-error mt-1 h-1rem text-sm">
        {{ prognosisError }}
      </div>
    </div>
    <Button label="РЕДАКТИРОВАТЬ" class="p-button-rounded align-self-end" type="submit" />
  </form>
</template>
