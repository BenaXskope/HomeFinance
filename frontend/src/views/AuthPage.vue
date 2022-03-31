<script setup lang="ts">
import { ref } from 'vue'

import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import Button from 'primevue/button'

import LoginForm from '@components/auth/LoginForm.vue'
import RegisterForm from '@components/auth/RegisterForm.vue'

import backgroundImg from '@assets/images/login-background.jpg'

const activeTabIndex = ref(0)

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
          h-30rem
          -mt-4
          xl:-translate-x-50
          xl:mt-0
          flex
          justify-content-center
          py-6
          bg-white
          border-round
        "
      >
        <TabView v-model:activeIndex="activeTabIndex" class="tabs w-full" lazy>
          <TabPanel>
            <template #header>
              <Button :class="{'text-900 bg-white border-none': activeTabIndex !== 0}" label="Вход" class="p-button-rounded" />
            </template>
            <LoginForm />
          </TabPanel>
          <TabPanel>
            <template #header>
              <Button :class="{'text-900 bg-white border-none': activeTabIndex !== 1}" label="Регистрация" class="p-button-rounded" />
            </template>
            <RegisterForm />
          </TabPanel>
        </TabView>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
::v-deep(.tabs) {

  .p-tabview-selected {
    border: none;
  }
  .p-tabview-nav {
    justify-content: center;
    border-bottom: none;

    .p-tabview-nav-link  {
      border: none;
      box-shadow: none !important;
    }
  }
}

</style>
