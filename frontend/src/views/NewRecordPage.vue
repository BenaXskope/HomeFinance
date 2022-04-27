<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import type { InferType } from 'yup'
import { number, object, string } from 'yup'
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import RadioButton from 'primevue/radiobutton'

const schema = object({
  category: number().required('Обязательное поле'),
  amount: string().required('Обязательное поле'),
  type: number().required('Обязательное поле'),
  description: string(),
})

const { handleSubmit } = useForm<InferType<typeof schema>>({
  validationSchema: schema,
})

const { value: category } = useField<number>('category')
const { value: amount } = useField<string>('amount')
const { value: type } = useField<string>('type')
const { value: description } = useField<string>('description')

</script>

<template>
  <h1 class="text-primary-semi-dark text-3xl">
    Создание новой записи
  </h1>
  <div class="flex">
    <form class="col-6 flex flex-column">
      <div>
        <div>Выберите категорию</div>
        <Dropdown id="category" v-model="category" :options="cities" option-label="category" name="category" placeholder="Категория" />
      </div>
      <div>
        <div>Введите сумму</div>
        <InputText id="amount" v-model="amount" type="number" name="amount" />
      </div>
      <div>
        <RadioButton id="type" v-model="type" name="type" />
      </div>
      <div>
        <div>Введите описание</div>
        <InputText id="description" v-model="description" type="text" name="description" />
      </div>
      <Button label="СОЗДАТЬ" class="p-button-rounded" type="submit" />
    </form>
    <div>
      <Button icon="pi pi-plus" class="p-button-rounded" />
    </div>
  </div>
</template>
