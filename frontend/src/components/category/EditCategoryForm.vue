<script setup lang="ts">
import { computed } from 'vue'
import { useField, useForm } from 'vee-validate'
import { number, object, string } from 'yup'
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import ColorPicker from 'primevue/colorpicker'
import Button from 'primevue/button'
import ConfirmDialog from 'primevue/confirmdialog'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'

import type { CategoriesList } from '@api/categories/categories'
import { deleteCategory, editCategory } from '@api/categories/categories'

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
  color: string().required(),
})

const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
})

const { value: id, errorMessage: idError } = useField<number>('id')
const { value: title, errorMessage: titleError } = useField<string>('title')
const { value: prognosis, errorMessage: prognosisError } = useField<number>('prognosis')
const { value: color } = useField<string>('color')

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

const confirm = useConfirm()
const handleDelete = (id: number | undefined) => {
  if (id === undefined) return
  confirm.require({
    message: 'Вы действительно хотите удалить категорию?',
    header: 'Подтвердите удаление',
    icon: 'pi pi-exclamation-triangle',
    accept: async() => {
      const result = await deleteCategory({ id })
      if (result.isRight()) {
        toast.add({ severity: 'success', summary: 'Успешно', detail: 'Категория удалена', life: 3000 })
        emits('categoryEdited')
        resetForm()
        return
      }
      toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Ошибка при удалении категории', life: 3000 })
    },
  })
}

const selectedCategory = computed({
  get() {
    return {
      id: id.value,
      title: title.value,
      prognosis: prognosis.value,
      color: color.value,
    }
  },
  set(newValue: { id: number; title: string; prognosis: number; color: string }) {
    id.value = newValue.id
    title.value = newValue.title
    prognosis.value = newValue.prognosis
    color.value = newValue.color
  },
})
</script>
<template>
  <div>
    <ConfirmDialog />
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
      <div class="mb-5 flex align-items-center">
        <div class="mr-2">
          Выберите цвет
        </div>
        <ColorPicker v-model="color" />
      </div>
      <div class="align-self-end">
        <Button label="УДАЛИТЬ" class="p-button-rounded p-button-danger mr-2" theme="danger" @click="handleDelete(selectedCategory.id)" />
        <Button label="РЕДАКТИРОВАТЬ" class="p-button-rounded " type="submit" />
      </div>
    </form>
  </div>
</template>
