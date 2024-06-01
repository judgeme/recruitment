import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PolarisVue from '@ownego/polaris-vue'
import '@ownego/polaris-vue/dist/style.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(PolarisVue) 
app.use(router)

app.mount('#app')
