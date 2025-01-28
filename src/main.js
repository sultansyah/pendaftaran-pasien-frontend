import './assets/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { useGlobalFunctions } from './utils/globalFunctions'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.provide('globalFunctions', useGlobalFunctions())
app.use(pinia)
app.use(router)
app.use(Toast, {
    timeout: 2000,
    pauseOnFocusLoss: false,
    pauseOnHover: false,
})

app.mount('#app')
