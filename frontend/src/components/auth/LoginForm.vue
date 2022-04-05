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
  <form class="flex flex-column align-items-center" @submit.prevent="() => 1 ">
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
<style lang="scss">
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>
