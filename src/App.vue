<template>
  <div class="flex flex-col min-h-screen bg-bg">
    <nav class="navbar sticky top-0 z-[100] flex items-center bg-primary-dark py-2.5 px-6 sm:px-8 sm:gap-2 shadow-lg">
      <router-link to="/" class="nav-btn">首頁</router-link>
      <router-link to="/favorites" class="nav-btn relative">
        最愛
        <span 
          v-if="favoriteCount > 0"
          class="absolute -top-1 -right-2 
          flex items-center justify-center 
          bg-sky-600 text-white text-[10px] font-bold
          w-5 h-5 rounded-full border-2 border-blue-600 shadow-sm"
        >
          {{ favoriteCount }}
        </span>
      </router-link>
      
      <div class="theme-switch" @click="toggleTheme">
        <div class="switch-handle">
          <span v-if="theme === 'light'" class="icon mx-3">☀️</span>
          <span v-else class="icon mx-3">🌙</span>
        </div>
      </div>
      <div id="nav-search-target" class="ml-auto flex items-center"></div>
    </nav>

    <main class="flex-grow">
      <router-view />
    </main>
    
    <footer class="flex flex-col pb-6">
      <p class="mt-auto py-2 text-center text-gray-400 text-xs">
        © 2026 Sticker Collection · 僅供學術練習使用
      </p>
    </footer>
  </div>
</template>

<script setup>
import { ref, watchEffect, computed } from 'vue'
import { useFavoriteStore } from '@/stores/favoriteStore'

// 初始化時先從 LocalStorage 抓取，如果沒有就預設 'light'
const theme = ref(localStorage.getItem('theme') || 'light')

const favoriteStore = useFavoriteStore()

const favoriteCount = computed(() =>
  favoriteStore.favorites.length
) 

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
}

watchEffect(() => {
  // 當 theme 改變時，同時更新 DOM 屬性和 LocalStorage
  document.documentElement.setAttribute('data-theme', theme.value)
  localStorage.setItem('theme', theme.value)
})
</script>