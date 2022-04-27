import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'

import 'primevue/resources/themes/lara-light-indigo/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

import 'vue-material-design-icons/styles.css'

import '@assets/styles/main.scss'

import App from './App.vue'
import router from './router'

createApp(App).use(PrimeVue, { ripple: true }).use(ToastService).use(router).use(createPinia()).mount('#app')
