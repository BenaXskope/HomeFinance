<script setup lang="ts">
import { reactive } from 'vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const handleSubmit = () => {
  console.log('submitted')
}

const registerData = reactive({
  email: undefined,
  password: undefined,
  passwordConfirm: undefined,
})

</script>
<template>
  <div class="flex flex-column">
    <div class="flex" />
    <form class="flex flex-column align-items-center px-4" @submit.prevent="() => 1 ">
      <span class="p-float-label p-inputtext-lg mb-5 w-full">
        <InputText id="email" v-model="registerData.email" class="w-full" type="text" />
        <label for="email">Email</label>
      </span>
      <span class="p-float-label p-inputtext-lg mb-5 w-full">
        <InputText id="password" v-model="registerData.password" class="w-full" type="password" />
        <label for="password">Пароль</label>
      </span>
      <span class="p-float-label p-inputtext-lg mb-5 w-full">
        <InputText id="password-confirm" v-model="registerData.passwordConfirm" class="w-full" type="password" />
        <label for="password">Подтвердите пароль</label>
      </span>
      <Button label="Зарегистироваться" class="p-button-rounded " type="submit" @click="handleSubmit" />
    </form>
  </div>
</template>
