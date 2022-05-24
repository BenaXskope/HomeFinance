<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import { number, object, string } from 'yup'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'

const schema = object({
  name: string().required('Обязательное поле'),
  limit: number().min(1, 'Сумма должна быть положительной').required('Обязательное поле'),
})

const { handleSubmit } = useForm({
  validationSchema: schema,
})

const { value: name, errorMessage: nameError } = useField<string>('name')
const { value: limit, errorMessage: limitError } = useField<number>('limit')

const onSubmit = handleSubmit((values) => {
  console.log(values)
})
</script>
<template>
  <form class="flex flex-column" @submit.prevent="onSubmit">
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
      <InputNumber id="amount" v-model="limit" class="w-full" name="amount" placeholder="Сумма" />
      <div class="p-error mt-1 h-1rem text-sm">
        {{ limitError }}
      </div>
    </div>
    <Button label="СОЗДАТЬ" class="p-button-rounded align-self-end" type="submit" />
  </form>
</template>
