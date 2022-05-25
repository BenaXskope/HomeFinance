<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import { number, object, string } from 'yup'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'

import { createCategory } from '@api/categories/categories'

const emits = defineEmits<{
  (e: 'categoryCreated'): void
}>()

const schema = object({
  title: string().required('Обязательное поле'),
  prognosis: number().min(1, 'Сумма должна быть положительной').required('Обязательное поле'),
})

const { handleSubmit } = useForm({
  validationSchema: schema,
})

const { value: title, errorMessage: titleError } = useField<string>('title')
const { value: prognosis, errorMessage: prognosisError } = useField<number>('prognosis')

const toast = useToast()
const onSubmit = handleSubmit(async(values) => {
  if (!schema.isValidSync(values)) return

  const result = await createCategory(values)
  if (result.isRight()) {
    toast.add({ severity: 'success', summary: 'Успешно', detail: 'Категория создана', life: 3000 })
    emits('categoryCreated')
    return
  }

  toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Ошибка при создании категории', life: 3000 })
})
</script>
<template>
  <form class="flex flex-column" @submit.prevent="onSubmit">
    <div class="mb-5">
      <div class="mb-5">
        Введите название
      </div>
      <InputText id="title" v-model="title" class="w-full" type="text" name="title" placeholder="Название" />
      <div class="p-error mt-1 h-1rem text-sm">
        {{ titleError }}
      </div>
    </div>
    <div class="mb-5">
      <div class="mb-5">
        Введите месячный лимит
      </div>
      <InputNumber id="amount" v-model="prognosis" class="w-full" name="amount" placeholder="Сумма" />
      <div class="p-error mt-1 h-1rem text-sm">
        {{ prognosisError }}
      </div>
    </div>
    <Button label="СОЗДАТЬ" class="p-button-rounded align-self-end" type="submit" />
  </form>
</template>
