//@ts-nocheck
import './bootstrap';

import { createApp } from 'vue';

import App from './src/App.vue'
import router from './src/router/index'
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css'
import { createPinia } from 'pinia';
import { Bootstrap5Pagination } from 'laravel-vue-pagination'
import Error from './src/components/Error.vue';
import BaseInput from './src/components/BaseInput.vue';
import BaseBtn from './src/components/BaseBtn.vue';
import VueApexCharts from 'vue3-apexcharts';

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(ToastPlugin)
app.use(VueApexCharts)
app.component('Bootstrap5Pagination', Bootstrap5Pagination)
app.component('Error', Error)
app.component('BaseInput', BaseInput)
app.component('BaseBtn', BaseBtn)
app.mount('#app')
