<script setup lang="ts">
import { reactive } from 'vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { registerUser } from '@api/auth/auth'

const registerData = reactive({
  email: undefined,
  username: 'test_user',
  password: undefined,
  passwordConfirm: undefined,
})

const handleSubmit = () => {
  registerUser(registerData)
}
</script>
<template>
  <form class="flex flex-column align-items-center" @submit.prevent="handleSubmit">
    <span class="p-float-label p-inputtext-lg mb-5 w-full">
      <InputText id="email" v-model="registerData.email" class="w-full" type="text" />
      <label for="email">Email</label>
    </span>
    <span class="p-float-label p-inputtext-lg mb-5 w-full">
      <InputText id="password" v-model="registerData.password" class="w-full" type="password" />
      <label for="password">Пароль</label>
    </span>
    <span class="p-float-label p-inputtext-lg mb-5 w-full">
      <InputText
        id="password-confirm"
        v-model="registerData.passwordConfirm"
        class="w-full"
        type="password"
      />
      <label for="password">Подтвердите пароль</label>
    </span>
    <Button label="Зарегистироваться" class="p-button-rounded" type="submit" @click="handleSubmit" />
  </form>
</template>
