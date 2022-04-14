<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'
import type { InferType } from 'yup'
import { object, string, ref as yupRef } from 'yup'
import { useField, useForm } from 'vee-validate'
import { useRouter } from 'vue-router'
import { registerUser } from '@api/auth/auth'

const schema = object({
  email: string().email('Введите корректный email').required('Обязательное поле'),
  username: string().required('Обязательное поле'),
  password: string().min(6, 'Пароль слишком короткий').required('Обязательное поле'),
  passwordConfirm: string()
    .oneOf([yupRef('password'), null], 'Пароли должны совпадать!')
    .required('Обязательное поле'),
}).strict()

const { handleSubmit } = useForm<InferType<typeof schema>>({
  validationSchema: schema,
})

const { value: email, errorMessage: emailError } = useField<string>('email')
const { value: username, errorMessage: usernameError } = useField<string>('username')
const { value: password, errorMessage: passwordError } = useField<string>('password')
const { value: passwordConfirm, errorMessage: passwordConfirmError } = useField<string>('passwordConfirm')

const { push } = useRouter()
const toast = useToast()
const onSubmit = handleSubmit(async(values) => {
  const registerResult = await registerUser({ ...values })

  if (registerResult.isRight()) {
    push('/')
  }
  else {
    const error = registerResult.value
    toast.add({ severity: 'error', summary: 'Ошибка', detail: error, life: 3000 })
  }
})
</script>
<template>
  <form class="flex flex-column align-items-center h-full" @submit.prevent="onSubmit">
    <div class="field w-full">
      <span class="p-float-label p-inputtext-lg mb-4">
        <InputText id="email" v-model="email" name="email" class="w-full" type="text" />
        <div id="username2-help" class="p-error h-1rem text-sm">{{ emailError }}</div>
        <label for="email">Email</label>
      </span>
      <span class="p-float-label p-inputtext-lg mb-4">
        <InputText id="email" v-model="username" name="email" class="w-full" type="text" />
        <div id="username2-help" class="p-error h-1rem text-sm">{{ usernameError }}</div>
        <label for="email">Логин</label>
      </span>
      <span class="p-float-label p-inputtext-lg mb-4">
        <InputText id="password" v-model="password" class="w-full" type="password" />
        <div id="username2-help" class="p-error h-1rem text-sm">{{ passwordError }}</div>
        <label for="password">Пароль</label>
      </span>
      <span class="p-float-label p-inputtext-lg">
        <InputText
          id="password-confirm"
          v-model="passwordConfirm"
          class="w-full"
          type="password"
        />
        <div id="username2-help" class="p-error h-1rem text-sm">{{ passwordConfirmError }}</div>
        <label for="password">Подтвердите пароль</label>
      </span>
    </div>
    <div>
      <Button label="Зарегистироваться" class="p-button-rounded" type="submit" />
    </div>
    <Toast position="bottom-right" />
  </form>
</template>
