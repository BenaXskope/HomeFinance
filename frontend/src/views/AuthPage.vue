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
        w-full
        h-full
        flex
        flex-column
        xl:flex-row
        justify-content-center
        xl:align-items-center
      "
    >
      <div
        class="
          xl:h-full
          col-12
          xl:col-7
          xl:-mr-6
          flex
          justify-content-start
          align-items-center
          border-round
          bg-primary
          p-6
          xl:pl-7
          xl:py-8
          xl:text-right
        "
      >
        <div class="xl:col-8 flex flex-column font-semibold">
          <div
            class="
              mb-2
              xl:mb-8
              text-6xl
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
          xl:col-5
          h-30rem
          -mt-4
          xl:mt-0
          xl:-ml-6
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
