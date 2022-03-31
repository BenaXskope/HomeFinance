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
      grid
      grid-nogutter
      w-screen
      h-screen
      align-items-center
      p-8
      bg-no-repeat
      bg-cover
    "
    :style="{ backgroundImage: `url(${backgroundImg})` }"
  >
    <div class="flex align-items-center w-full h-full">
      <div
        class="
          h-full
          flex
          justify-content-start
          align-items-center
          border-round
          bg-primary
          pl-7
          py-8
          text-right
          col-7
        "
      >
        <div class="col-8 flex flex-column font-semibold">
          <div
            class="
              text-7xl
              mb-8
            "
          >
            HomeFinance
          </div>
          <div
            class="
              text-4xl
            "
          >
            Создано для&nbsp;оптимизации ваших&nbsp;финансов
          </div>
        </div>
      </div>
      <div
        class="
          h-30rem
          col-5
          -translate-x-25
          flex
          justify-content-center
          pt-6
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
  .p-tabview-nav {
    justify-content: center;
    border-bottom: none;

    .p-tabview-nav-link  {
      border-width: 0px;
    }
  }
}

</style>
