
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Favorites from '../views/Favorites.vue'
import StickerDetail from '../views/StickerDetail.vue'

// 使用一個陣列 routes 來儲存需要跳轉的頁面
const routes = [
  { path: '/', component: Home },
  { path: '/favorites', component: Favorites },
  { path: '/sticker/:id', component: StickerDetail }
]

// 使用 HTML5 的 History API 來產生路由的功能，並且傳入 routes 陣列
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router