<script setup lang="ts">
import { computed, ref } from 'vue'
import ProgressSpinner from 'primevue/progressspinner'
import { useRoute } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import { getCsrf } from '@/api/auth/auth'
import { getCsrfCookie } from '@/utils/cookie'

const loading = ref(false)
if (!getCsrfCookie()) {
  loading.value = true
  getCsrf().then(() => loading.value = false)
}

const currentRoute = useRoute()

const isLayoutDisabled = computed(() => 'noLayout' in currentRoute.meta)
</script>

<template>
  <div>
    <ProgressSpinner v-if="loading" />
    <template v-else>
      <router-view v-if="isLayoutDisabled" />
      <MainLayout v-else>
        <router-view />
      </MainLayout>
    </template>
  </div>
</template>
<style lang="scss">
</style>
