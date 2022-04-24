<script setup lang="ts">
import { ref } from 'vue'
import ProgressSpinner from 'primevue/progressspinner'
import { getCsrf } from '@/api/auth/auth'
import { getCsrfCookie } from '@/utils/cookie'

const loading = ref(false)
if (!getCsrfCookie()) {
  loading.value = true
  getCsrf().then(() => loading.value = false)
}

</script>

<template>
  <div>
    <ProgressSpinner v-if="loading" />
    <router-view v-else />
  </div>
</template>
<style lang="scss">
</style>
