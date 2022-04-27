<script setup lang="ts">
import { computed } from 'vue'
import { useField, useForm } from 'vee-validate'
import { boolean, number, object } from 'yup'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
import InputNumber from 'primevue/inputnumber'
import RadioButton from 'primevue/radiobutton'

const props = defineProps<{
  modelValue: boolean
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const dialogValue = computed({
  get() {
    return props.modelValue
  },
  set(newValue: boolean) {
    emits('update:modelValue', newValue)
  },
})

const schema = object({
  category: number().required('Обязательное поле'),
  amount: number().required('Обязательное поле'),
  type: boolean().required('Обязательное поле'),
})

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    category: undefined,
    amount: undefined,
    type: false,
  },
})

const { value: category } = useField<number>('category')
const { value: amount } = useField<number>('amount')
const { value: type } = useField<boolean>('type')

const mockCategories = [
  {
    label: 'Еда',
    id: 1,
  },
  {
    label: 'Одежда',
    id: 2,
  },
  {
    label: 'Техника',
    id: 3,
  },
  {
    label: 'Здоровье',
    id: 4,
  },
]

const onSubmit = handleSubmit((values) => {
  console.log(values)
})
</script>
<template>
  <Dialog v-model:visible="dialogValue" header="Добавьте новую быструю запись" class="modal border-rounded" modal dismissable-mask>
    <form class="flex flex-column" @submit.prevent="onSubmit">
      <div class="mb-5">
        <Dropdown id="category" v-model="category" class="w-full" :options="mockCategories" option-label="label" option-value="id" name="category" placeholder="Категория" />
      </div>
      <div class="mb-5">
        <InputNumber id="amount" v-model="amount" class="w-full" name="amount" placeholder="Сумма" />
      </div>
      <div class="mb-5 flex align-items-center justify-content-evenly">
        <div>
          <RadioButton id="income" v-model="type" class="mr-2" name="type" :value="false" />
          <label for="income">Доход</label>
        </div>
        <div>
          <RadioButton id="expense" v-model="type" class="mr-2" name="type" :value="true" />
          <label for="expense">Расход</label>
        </div>
      </div>
      <Button label="СОЗДАТЬ" class="p-button-rounded p-button-sm align-self-center" type="submit" />
    </form>
  </Dialog>
</template>
<style lang="scss">
@import 'primeflex/primeflex.scss';

.p-dialog {
  @include styleclass('p-4 bg-white border-rounded w-50');
}
.p-dialog-titlebar {
  @include styleclass('text-center');
}
.p-dialog-titlebar-icon {
  @include styleclass('mr-4')
}
</style>
