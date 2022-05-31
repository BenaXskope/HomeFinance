import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'

import 'primevue/resources/themes/lara-light-indigo/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

import 'vue-material-design-icons/styles.css'

import '@assets/styles/main.scss'

import App from './App.vue'
import router from './router'

createApp(App).use(PrimeVue, {
  ripple: true,
  locale: {
    monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сент', 'Окт', 'Нояб', 'Дек'],
    accept: 'Да',
    reject: 'Нет',
  },
}).use(ToastService).use(ConfirmationService).use(router).use(createPinia()).mount('#app')
