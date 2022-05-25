<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useMediaQuery } from '@vueuse/core'
import ProgressSpinner from 'primevue/progressspinner'
import LogoutIcon from 'vue-material-design-icons/Logout.vue'
import HelpIcon from 'vue-material-design-icons/HelpCircleOutline.vue'
import MenuIcon from 'vue-material-design-icons/Menu.vue'
import CloseIcon from 'vue-material-design-icons/Close.vue'

import LogoIcon from '@components/icons/LogoIcon.vue'

const date = ref<string>('')
const interval = setInterval(() => {
  date.value = new Date().toLocaleDateString()
})

onBeforeUnmount(() => {
  clearInterval(interval)
})

const isDesktop = useMediaQuery('(min-width: 769px)')
const isMenuShown = ref(isDesktop.value)
watch(isDesktop, () => isMenuShown.value = isDesktop.value)

const menuLinks = [
  {
    name: 'Добавить запись',
    to: '/',
  },
  {
    name: 'Категории',
    to: '/category',
  },
  {
    name: 'История',
    to: '/history',
  },
  {
    name: 'Курс валют',
    to: '/currencies',
  },
]
const router = useRouter()
const logout = () => {
  router.push('/login')
}
</script>
<template>
  <div class="flex h-screen w-full md:bg-primary-dark">
    <div class="menu-circle" @click="isMenuShown = !isMenuShown">
      <MenuIcon v-if="!isMenuShown" class="text-4xl" />
      <CloseIcon v-else class="text-4xl" />
    </div>
    <transition name="slide">
      <div v-if="isMenuShown" class="fixed w-full h-full z-4 md:static md:w-auto md:h-auto flex flex-column col-10 md:col-2 p-0 bg-primary-dark">
        <LogoIcon class="w-8rem align-self-center" />
        <ul class="flex flex-column list-none w-full p-0 pl-2">
          <router-link
            v-for="link of menuLinks"
            :key="link.to"
            v-slot="{href, navigate, isActive}"
            :to="link.to"
            class="link__active"
            custom
          >
            <li
              class="link-container"
              :class="{'link-container__active' : isActive}"
            >
              <template v-if="isActive">
                <b class="curve" />
                <b class="curve" />
              </template>
              <a
                class="link" :href="href" :class="[isActive ? 'text-primary-dark' : 'text-white']" @click="(e) => {
                  isMenuShown = isDesktop ;
                  navigate(e)
                }"
              > {{ link.name }}</a>
            </li>
          </router-link>
        </ul>
      </div>
    </transition>
    <div class="bg-white w-full h-full flex flex-column overflow-hidden md:border-round pb-4 pt-4 px-3 md:px-6 md:py-4">
      <div class="flex justify-content-between align-items-center text-primary-dark border-bottom-1 border-500 pb-1">
        <div class="font-bold text-lg align-self-end">
          {{ new Date().toLocaleDateString() }}
        </div>
        <div>
          <HelpIcon class="topbar-icon" />
          <LogoutIcon class="topbar-icon" @click="logout" />
        </div>
      </div>
      <hr>
      <div class="h-full px-1 md:px-0 overflow-y-auto">
        <router-view v-slot="{ Component }">
          <template v-if="Component">
            <Suspense>
              <component :is="Component" />
              <template #fallback>
                <div class="h-full w-full flex justify-content-center align-items-center">
                  <ProgressSpinner class="spinner" />
                </div>
              </template>
            </Suspense>
          </template>
        </router-view>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
@import 'primeflex/primeflex.scss';
.menu-circle {
  left: 1rem;
  bottom: 1rem;
  padding-bottom: 0.5em;
  @include styleclass('fixed z-5 border-circle w-3rem h-3rem bg-primary flex justify-content-center align-items-center pb-1rem md:hidden')
}
.link-container {
  @include styleclass('h-4rem flex align-items-center justify-content-center text-center mb-3');
}
.link {
  @include styleclass('no-underline text-lg font-bold px-6 py-4')
}
.link-container__active {
  --border-radius: 2rem;
  @include styleclass('bg-white border-round-left');
  position: relative;
}
.curve {
  display: block;

  --curve-height: 20px;
  &:nth-child(1){
    @include styleclass('absolute w-full bg-white');
    top: calc(-1 * var(--curve-height));
    height: var(--curve-height);
  }
  &:nth-child(1)::before{
    content: '';
    @include styleclass('absolute w-full h-full top-0 left-0');
    background-color: var(--primary-dark-color);
    border-bottom-right-radius: var(--curve-height);
  }
  &:nth-child(2){
    @include styleclass('absolute w-full bg-white');
    bottom: calc(-1 * var(--curve-height));;
    height: var(--curve-height);
  }
  &:nth-child(2)::before{
    content: '';
    @include styleclass('absolute w-full h-full top-0 left-0');
    background-color: var(--primary-dark-color);
    border-top-right-radius: var(--curve-height);
  }
}
.topbar-icon {
  @include styleclass('text-3xl mr-3 cursor-pointer');

  &:last-child {
    margin-right: 0 !important;
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease-out;
}
.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
}

.slide-enter-from,
.slide-leave-to {
    transform: translateX(-100%);
    transition: all 150ms ease-in 0s
}

@keyframes p-progress-spinner-color {
    100%,
    0% {
        stroke: var(--primary-dark-color);
    }
    40% {
        stroke: var(--primary-dark-color);
    }
    66% {
        stroke: var(--primary-dark-color);
    }
    80%,
    90% {
        stroke: var(--primary-dark-color);
    }
}

</style>
