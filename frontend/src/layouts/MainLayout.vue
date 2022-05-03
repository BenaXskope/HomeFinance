<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import LogoIcon from '@components/icons/LogoIcon.vue'
import CogIcon from 'vue-material-design-icons/Cog.vue'
import LogoutIcon from 'vue-material-design-icons/Logout.vue'
import HelpIcon from 'vue-material-design-icons/HelpCircleOutline.vue'

const date = ref<string>('')
const interval = setInterval(() => {
  date.value = new Date().toLocaleDateString()
})

onBeforeUnmount(() => {
  clearInterval(interval)
})

const menuLinks = [
  {
    name: 'Добавить запись',
    to: '/',
  },
  {
    name: 'Тест',
    to: '/test',
  },
]
</script>
<template>
  <div class="flex h-screen w-full bg-primary-dark">
    <div class="flex flex-column col-2 p-0">
      <LogoIcon class="w-8rem align-self-center" />
      <ul class="flex flex-column list-none w-full p-0 pl-2">
        <router-link
          v-for="link of menuLinks"
          :key="link.to"
          v-slot="{href, navigate, isActive}" class="link__active" :to="link.to" custom
        >
          <li
            class="link-container"
            :class="{'link-container__active' : isActive}"
          >
            <template v-if="isActive">
              <b class="curve" />
              <b class="curve" />
            </template>
            <a class="link" :href="href" :class="[isActive ? 'text-primary-dark' : 'text-white']" @click="navigate"> {{ link.name }}</a>
          </li>
        </router-link>
      </ul>
    </div>
    <div class="bg-white w-full h-full border-round p-4">
      <div class="flex justify-content-between align-items-center text-primary-dark">
        <div class="font-bold text-lg align-self-end">
          {{ new Date().toLocaleDateString() }}
        </div>
        <div>
          <HelpIcon class="topbar-icon" />
          <CogIcon class="topbar-icon" />
          <LogoutIcon class="topbar-icon" />
        </div>
      </div>
      <hr>
      <div>
        <slot />
      </div>
    </div>
  </div>
</template>
<style lang="scss">
@import 'primeflex/primeflex.scss';

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
</style>
