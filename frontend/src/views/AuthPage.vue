<script setup lang="ts">
import { computed, ref } from 'vue'
import Button from 'primevue/button'
import LoginForm from '@components/auth/LoginForm.vue'
import RegisterForm from '@components/auth/RegisterForm.vue'
import backgroundImg from '@assets/images/login-background.jpg'

const activeTabName = ref<'LoginForm' | 'RegisterForm'>('LoginForm')
const changeTab = (componentName: typeof activeTabName.value) => activeTabName.value = componentName

const tabs = {
  LoginForm,
  RegisterForm,
}
const activeComponent = computed(() => tabs[activeTabName.value])

</script>
<template>
  <div
    class="
      w-screen
      h-screen
      grid
      grid-nogutter
      justify-content-center
      align-items-center
      p-4
      md:p-8
      bg-no-repeat
      bg-cover
    "
    :style="{ backgroundImage: `url(${backgroundImg})` }"
  >
    <div
      class="
        col-11
        xl:col-10
        h-full
        flex
        flex-column
        xl:flex-row
        justify-content-center
        xl:align-items-center
        xl:justify-content-start
      "
    >
      <div
        class="
          xl:h-full
          xl:col-8
          flex
          flex-column
          justify-content-center
          align-items-start
          border-round
          bg-primary
          p-4
          pb-5
          md:p-6
          xl:text-right
          font-semibold
        "
      >
        <div class="xl:col-10 xl:pr-6">
          <div
            class="
              mb-2
              xl:mb-8
              text-5xl
              xl:text-7xl
            "
          >
            HomeFinance
          </div>
          <div
            class="
              text-xl
              xl:text-4xl
            "
          >
            Создано для&nbsp;оптимизации ваших&nbsp;финансов
          </div>
        </div>
      </div>
      <div
        class="
          xl:col-6
          -mt-4
          xl:-translate-x-50
          xl:mt-0
          h-30rem
          flex
          flex-column
          p-6
          bg-white
          border-round
        "
      >
        <div
          class="
            mb-5
            flex
            justify-content-around
          "
        >
          <Button
            :class="{'text-900 bg-white border-none': activeTabName !== 'LoginForm'}"
            label="Вход"
            class="p-button-rounded"
            @click="changeTab('LoginForm')"
          />
          <Button
            :class="{'text-900 bg-white border-none': activeTabName !== 'RegisterForm'}"
            label="Регистрация"
            class="p-button-rounded"
            @click="changeTab('RegisterForm')"
          />
        </div>
        <Transition name="slide-up" mode="out-in">
          <component :is="activeComponent" />
        </Transition>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
