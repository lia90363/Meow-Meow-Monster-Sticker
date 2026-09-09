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
      
      <div class="theme-switch cursor-pointer items-center justify-center ml-2" @click="uiStore.toggleTheme">
        <span class="text-xl">{{ uiStore.theme === 'light' ? '☀️' : '🌙' }}</span>
      </div>


      <button 
        @click="uiStore.toggleDisplayMode" 
        class="
          sm:hidden p-2 mx-2 rounded-lg transition-all active:scale-90
          bg-white/20 hover:bg-white/30
          flex items-center justify-center
        "
      >
        <LayoutGrid v-if="uiStore.displayMode === 'single'" :size="20" class="text-white" />
        <Square v-else :size="20" class="text-white" />
      </button>


      <div id="nav-search-target" class="ml-auto flex items-center">
        <input v-model="stickerStore.keyword" placeholder="搜尋貼圖..." class="rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 py-1 px-4 w-full focus:ring-2 focus:ring-primary outline-none"/>
      </div>
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
import { computed, onMounted } from 'vue'
import { useFavoriteStore } from '@/stores/favoriteStore'
import { useStickerStore } from '@/stores/stickerStore'
import { useUiStore } from '@/stores/uiStore'
import { Square, LayoutGrid } from 'lucide-vue-next'

const favoriteStore = useFavoriteStore()
const stickerStore = useStickerStore()
const uiStore = useUiStore()

const favoriteCount = computed(() =>
  favoriteStore.favorites.length
) 

onMounted(() => {
  uiStore.applyTheme() // 初始載入時套用主題
})
</script>