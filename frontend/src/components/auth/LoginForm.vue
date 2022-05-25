<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'
import type { InferType } from 'yup'
import { object, string } from 'yup'
import { useField, useForm } from 'vee-validate'
import { useRouter } from 'vue-router'
import { InvalidCredentialsError, authUser } from '@api/auth/auth'
import { exhaustivenessCheck } from '@/utils/typing'

const schema = object({
  email: string().required('Обязательное поле'),
  password: string().required('Обязательное поле'),
})

const { handleSubmit } = useForm<InferType<typeof schema>>({
  validationSchema: schema,
})

const { value: email, errorMessage: emailError } = useField<string>('email')
const { value: password, errorMessage: passwordError } = useField<string>('password')

const { push } = useRouter()
const toast = useToast()

const onSubmit = handleSubmit(async(values) => {
  try {
    const loginResult = await authUser(values)

    if (loginResult.isRight()) { push('/') }
    else {
      const error = loginResult.value
      if (InvalidCredentialsError.guard(error))
        toast.add({ severity: 'error', summary: 'Ошибка авторизации', detail: 'Неправильный логин или пароль', life: 3000 })
      else exhaustivenessCheck(error)
    }
  }
  catch {
    toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Неизвестная ошибка', life: 3000 })
  }
})

</script>
<template>
  <form class="flex flex-column align-items-center h-full" @submit.prevent="onSubmit">
    <div class="field w-full">
      <span class="p-float-label p-inputtext-lg mb-4">
        <InputText id="email" v-model="email" name="email" class="w-full" type="text" />
        <div id="email-help" class="p-error h-1rem text-sm">{{ emailError }}</div>
        <label for="email">E-mail</label>
      </span>
      <span class="p-float-label p-inputtext-lg">
        <InputText id="password" v-model="password" class="w-full" type="password" />
        <div id="password-help" class="p-error h-1rem text-sm">{{ passwordError }}</div>
        <label for="password">Пароль</label>
      </span>
    </div>
    <div>
      <Button label="Войти" class="p-button-rounded" type="submit" />
    </div>
  </form>
</template>
