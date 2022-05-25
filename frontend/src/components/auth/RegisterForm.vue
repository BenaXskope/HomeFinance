<script setup lang="ts">
import { useRouter } from 'vue-router'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'
import { useField, useForm } from 'vee-validate'
import type { InferType } from 'yup'
import { object, string, ref as yupRef } from 'yup'
import { EmailAlreadyRegisteredError, IncorrectEmailError, WeakPasswordError, registerUser } from '@api/auth/auth'
import { exhaustivenessCheck } from '@/utils/typing'

const schema = object({
  email: string().email('Введите корректный email').required('Обязательное поле'),
  password: string().min(6, 'Пароль слишком короткий').required('Обязательное поле'),
  passwordConfirm: string()
    .oneOf([yupRef('password'), null], 'Пароли должны совпадать!')
    .required('Обязательное поле'),
})

const { handleSubmit } = useForm<InferType<typeof schema>>({
  validationSchema: schema,
})

const { value: email, errorMessage: emailError, setErrors: setEmailErrors } = useField<string>('email')
const { value: password, errorMessage: passwordError, setErrors: setPasswordErrors } = useField<string>('password')
const { value: passwordConfirm, errorMessage: passwordConfirmError } = useField<string>('passwordConfirm')

const { push } = useRouter()
const toast = useToast()
const onSubmit = handleSubmit(async(values) => {
  try {
    const registerResult = await registerUser({ ...values })

    if (registerResult.isRight()) {
      push('/')
    }
    else {
      const errors = registerResult.value
      for (const error of errors) {
        if (WeakPasswordError.guard(error)) setPasswordErrors('Пароль слишком слабый')
        else if (EmailAlreadyRegisteredError.guard(error)) setEmailErrors('Пользователь с таким email уже зарегистрирован')
        else if (IncorrectEmailError.guard(error)) setEmailErrors('Введите корерктный email')
        else exhaustivenessCheck(error)
      }
      toast.add({ severity: 'error', summary: 'Ошибка регистрации', detail: 'Некорректные данные', life: 3000 })
    }
  }
  catch {
    toast.add({ severity: 'error', summary: 'Неизвестная ошибка ', life: 3000 })
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
  </form>
</template>
