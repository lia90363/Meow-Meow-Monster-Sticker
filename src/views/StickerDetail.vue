<script setup>
import { computed, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useFavoriteStore } from '@/stores/favoriteStore'
import { useHistory } from '../composables/useHistory'
import { mockStickers } from '@/mocks/stickers' 
import StickerItem from '@/components/StickerItem.vue'

const route = useRoute()
const favoriteStore = useFavoriteStore()
const { history, addHistory } = useHistory()

// 強制轉為數字，並使用 computed 確保路由切換時 ID 會更新
const id = computed(() => Number(route.params.id))

// 從 store 找資料，若找不到回傳 null
const sticker = computed(() => {
  // 先確認 id 是否有效
  const currentId = id.value;
  if (!currentId) return null;

  // 使用 Number() 確保類型一致，並處理 mockStickers 可能尚未加載的情況
  return (mockStickers || []).find(s => Number(s.id) === currentId) || null;
});

const stickerInfo = computed(() => {
  if (!sticker.value) return { lv: 0, idx: 0 };
  return {
    lv: Math.floor(sticker.value.id / 100),
    idx: sticker.value.id % 100
  };
});

const recentStickers = computed(() => {
  return history.value
    .map(hId => {
      // 統一轉字串比對，避免 ID 格式不一
      return mockStickers.find(s => String(s.id) === String(hId));
    })
    .filter(s => s && String(s.id) !== String(id.value)) // 這裡會過濾掉當前頁面的貼圖
    .slice(0, 5);
});

onUnmounted(() => {
  if (id.value) {
    addHistory(id.value)
  }
})
</script>

<template>
  <!-- 使用 v-if 確保有 sticker 資料才渲染內容 -->
  <div v-if="!sticker" class="p-10 text-center">
    載入中或找不到貼圖...
  </div>

  <ul v-else class="flex justify-center w-full">
    <li class="detail grid bg-card-bg rounded-md shadow-soft p-6 border-border transition-transform mx-6 my-4 sm:max-w-4xl sm:my-12 text-center">
      <div class="item-detail text-3xl font-semibold sm:m-4 m-2">{{ sticker.title }}</div>
      <p class="text-center">貼圖在 LV.{{ stickerInfo.lv }} 的第 {{ stickerInfo.idx }} 張</p>
      
      <StickerItem :number="sticker.number" class="m-auto p-2 my-2 sm:mb-5"/>

      <button @click="favoriteStore.toggleFavorite(sticker)" class="btn shrink-0 cursor-pointer">
        {{ favoriteStore.isFavorite(sticker.id) ? '💖' : '🤍' }}
      </button>

      <!-- 最近查看區塊 -->
      <div v-if="recentStickers.length > 0" class="history sm:mt-8 mt-4 border-t pt-4">
        <h3 class="flex items-center justify-center gap-2 mt-2 font-bold text-gray-400 text-xs uppercase tracking-widest">
          <span class="h-[1px] w-8 bg-gray-200"></span>
            最近查看過的貼圖
          <span class="h-[1px] w-8 bg-gray-200"></span>
        </h3>
        <div class="flex justify-center px-4 mt-4">
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-4 w-fit mx-auto px-4 mb-3">
            <router-link 
              v-for="(item, index) in recentStickers" 
              :key="item.id" 
              :to="`/sticker/${item.id}`" 
              class="hover:scale-105 transition-all duration-300"
              :class="{ 
                'hidden lg:block': index >= 2
              }"
            >
              <StickerItem :number="item.number || item.id" is-thumbnail class="w-24 md:w-32 object-contain"/>
            </router-link>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>