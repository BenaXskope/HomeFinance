import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'

import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import '@assets/styles/main.scss'

import App from './App.vue'
import router from './router'

createApp(App).use(PrimeVue).use(router).use(createPinia()).mount('#app')
