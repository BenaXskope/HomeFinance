<script setup lang="ts">
import { reactive, ref } from 'vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const handleSubmit = () => {
  console.log('submitted')
}

const loginCredentials = reactive({
  email: undefined,
  password: undefined,
})

</script>
<template>
  <form class="flex flex-column align-items-center px-4" @submit.prevent="() => 1 ">
    <span class="p-float-label p-inputtext-lg mb-5 w-full">
      <InputText id="email" v-model="loginCredentials.email" class="w-full" type="text" />
      <label for="email">Email</label>
    </span>
    <span class="p-float-label p-inputtext-lg mb-5 w-full">
      <InputText id="password" v-model="loginCredentials.password" class="w-full" type="password" />
      <label for="password">Пароль</label>
    </span>
    <Button label="Войти" class="p-button-rounded" type="submit" @click="handleSubmit" />
  </form>
</template>
