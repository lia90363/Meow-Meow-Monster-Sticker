import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './route'
import { persistPlugin } from './plugins/persist'
// import './main.scss'
import './assets/main.css'

const app = createApp(App) 
const pinia = createPinia()

// 1. 註冊插件
pinia.use(persistPlugin)

// 2. 將 pinia 和 router 安裝到同一個 app 實例上
app.use(pinia)
app.use(router)

// 3. 最後才掛載
app.mount('#app')