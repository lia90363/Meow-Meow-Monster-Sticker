<script setup>
import { useFavoriteStore } from '@/stores/favoriteStore'
import { useUiStore } from '@/stores/uiStore'
import StickerItem from '@/components/StickerItem.vue'

const favoriteStore = useFavoriteStore()
const uiStore = useUiStore()
</script>

<template>
  <h2 class="flex items-center justify-center text-2xl font-bold mt-6 sm:mt-10 rounded-md text-primary">
    收藏
  </h2>
  <div v-if="favoriteStore.favorites.length === 0" class="flex flex-col items-center justify-center min-h-110 sm:min-h-160">
    <p class="text-gray-400 py-5">還沒有貼圖收藏，趕快去收藏喜歡的貼圖吧!</p>
  </div>
  <TransitionGroup 
    v-else 
    tag="ul" 
    name="list"
    class="grid gap-x-4 gap-y-6 p-6 mx-auto max-w-6xl transition-all duration-300"
    :class="{
      // 手機版根據模式切換，電腦版（sm 以上）維持固定 4 列
      'grid-cols-1': uiStore.displayMode === 'single',
      'grid-cols-2': uiStore.displayMode === 'grid',
      'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4': true
    }"
  >  
    <li 
      v-for="item in favoriteStore.favorites" 
      :key="item.id" 
      class="
        card relative bg-card-bg text-text rounded-md shadow-soft text-center border-border w-full max-w-60
        flex flex-col mx-auto justify-between overflow-hidden transition-transform duration-200
        hover:-translate-y-1 hover:border-primary
      "
      :class="uiStore.displayMode === 'grid' ? 'p-2' : 'p-4 my-0.5'" 
    >
      <button @click="favoriteStore.toggleFavorite(item)" class="absolute top-2 right-2 p-1.5 cursor-pointer z-10 transition-transform active:scale-125">❤️</button>
      <StickerItem 
        v-if="item.number"
        :number="item.number" 
        class="m-auto drop-shadow-[0_0_3px_#fff]" 
        :class="uiStore.displayMode === 'grid' ? 'w-28 pt-2' : 'w-32 my-2'" 
      />
      <div 
        v-if="uiStore.displayMode !== 'grid'" 
        class="item-category text-[0.85rem] text-text-soft px-0.5 my-1.5"
      >
        ({{ item.category }})
      </div>
      <div class="card-actions flex justify-center w-full gap-1">
        <router-link 
          :to="`/sticker/${item.id}`" 
          class="btn bg-primary-dark text-white shrink-0 rounded-md py-1 px-4 cursor-pointer text-sm"
          :class="uiStore.displayMode === 'grid' ? 'm-0' : 'm-1'" 
        >
          查看詳細
        </router-link>
      </div>
    </li>
  </TransitionGroup>
</template>

<style scoped>
/* 進入與離開的過渡時間 */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

/* 進入前與離開後的透明度與位置 */
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

/* 讓其他元素在移動時有平滑位移 */
.list-move {
  transition: transform 0.5s ease;
}

/* 離開時暫時脫離文檔流，讓其他卡片可以平滑滑過來 */
.list-leave-active {
  position: absolute;
  /* 視情況可加入以下兩行確保寬度不跑掉 */
  width: 100%; 
  max-width: 260px;
}
</style>