<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useStickerStore } from '@/stores/stickerStore'
import { useFavoriteStore } from '@/stores/favoriteStore'
import { useUiStore } from '@/stores/uiStore'
import { useDebounce } from '@/composables/useDebounce'
import StickerItem from '@/components/StickerItem.vue'

const stickerStore = useStickerStore()
const favoriteStore = useFavoriteStore()
const uiStore = useUiStore()

const debouncedKeyword = useDebounce(() => stickerStore.keyword, 300)
const category = ref('all')
const chipsContainer = ref(null);

const page = ref(1);
const perPage = 40;
const loadMoreTrigger = ref(null); // 用於綁定 DOM 元素

let observer = null;

onMounted(async () => {
  await stickerStore.loadStickers();

  await nextTick(); // 確保畫面上的 <li> 都排好了
  setupObserver();

  if (chipsContainer.value) {
    chipsContainer.value.addEventListener('wheel', (evt) => {
      evt.preventDefault();
      // 橫向捲動
      chipsContainer.value.scrollLeft += evt.deltaY;
    }, { passive: false }); // 建議加上 passive: false 確保 preventDefault 有效
  }
});

// 滾動偵測邏輯
const setupObserver = () => {
  if (observer) observer.disconnect(); // 如果已經有在監聽，先斷開

  if (!loadMoreTrigger.value) return; // 檢查 DOM 是否真的存在

  observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && 
        !stickerStore.loading && 
        displayedStickers.value.length < filteredStickers.value.length) {
      page.value++; 
    }
  }, { 
    threshold: 0.1,
    rootMargin: '150px' // 提早觸發，使用者滑起來更順
  });

  observer.observe(loadMoreTrigger.value);
};

// 組件卸載時要銷毀監聽器，避免佔用記憶體
onUnmounted(() => {
  if (observer) observer.disconnect();
});

// 當資料重新載入完成後，重新綁定偵測器
watch(() => stickerStore.loading, (newLoading) => {
  if (!newLoading) {
    nextTick(() => { setupObserver(); });
  }
});

// 監控搜尋條件或分類，一旦變動就回到第一頁並滾回頂部
watch([debouncedKeyword, category], () => {
  page.value = 1;
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const filterByTag = (tag) => {
  category.value = tag;
  // 這裡可以連動搜尋邏輯，或是直接過濾 store 的資料
};

// 這是「所有」符合條件的資料
const filteredStickers = computed(() => {
  if (!stickerStore.stickers) return [];

  const lowerKeyword = (debouncedKeyword.value || '').trim().toLowerCase();
  const currentCategory = category.value; 

  const keywords = lowerKeyword.split(/\s+/).filter(word => word);

  return stickerStore.stickers.filter(item => {
    // 同時比對 title 和 category
    const matchesKeyword = keywords.length === 0 || keywords.every(word => 
      (item.title && item.title.toLowerCase().includes(word)) || 
      (item.category && item.category.toLowerCase().includes(word))
    );

    // 類別標籤比對
    const matchesCategory = currentCategory === 'all' || 
                            currentCategory === '全部' || 
                            item.category === currentCategory;
    
    return matchesKeyword && matchesCategory;
  });
});

const displayedStickers = computed(() => {
  return filteredStickers.value.slice(0, page.value * perPage);
});

const categories = [
  { label: '全部', value: 'all' },
  { label: 'LV.1', value: 'LV.1 遊戲' },
  { label: 'LV.2', value: 'LV.2 NPC' },
  { label: 'LV.3', value: 'LV.3 審判' },
  { label: 'LV.4', value: 'LV.4 飆車' },
  { label: 'LV.5', value: 'LV.5 藥' },
  { label: 'LV.6', value: 'LV.6 敏感/麻煩' },
  { label: 'LV.7', value: 'LV.7 隨你填' },
  { label: 'LV.8', value: 'LV.8 佳節適用' },
  { label: 'LV.9', value: 'LV.9 錢' },
  { label: 'LV.10', value: 'LV.10 告白' },
  { label: 'LV.11', value: 'LV.11 口罩' },
  { label: 'LV.12', value: 'LV.12 訊息貼圖' },
  { label: 'LV.13', value: 'LV.13 實話' },
  { label: 'LV.14', value: 'LV.14 附草尼馬' },
  { label: 'LV.15', value: 'LV.15 87小忍者' },
  { label: 'LV.16', value: 'LV.16 厭世' },
  { label: 'LV.17', value: 'LV.17 小僧' },
  { label: 'LV.18', value: 'LV.18 日常性禮貌' },
  { label: 'LV.19', value: 'LV.19 幻肢靜態' },
  { label: 'LV.20', value: 'LV.20 放棄' },
  { label: 'LV.21', value: 'LV.21 提問' },
  { label: 'LV.22', value: 'LV.22 欲擒故縱' },
  { label: 'LV.23', value: 'LV.23 上班' },
  { label: 'LV.24', value: 'LV.24 含酒精成分' },
  { label: 'LV.25', value: 'LV.25 吃貨' },
  { label: 'LV.26', value: 'LV.26 通靈' },
  { label: 'LV.27', value: 'LV.27 恐怖情人' },
  { label: 'LV.28', value: 'LV.28 內含被被' },
  { label: 'LV.29', value: 'LV.29 內含失傳貼圖' },
  { label: 'LV.30', value: 'LV.30 內含幽靈人口' },
  { label: 'LV.31', value: 'LV.31 屬性:搞怪聖誕' },
  { label: 'LV.32', value: 'LV.32 屬性:遊戲' },
  { label: 'LV.33', value: 'LV.33 屬性:求生' },
  { label: 'LV.34', value: 'LV.34 屬性:精緻香喵' },
  { label: 'LV.35', value: 'LV.35 屬性:職場' },
  { label: 'LV.36', value: 'LV.36 屬性:回覆技能補充包' },
  { label: 'LV.37', value: 'LV.37 屬性:吃土' },
  { label: 'LV.38', value: 'LV.38 屬性:失傳社群' },
  { label: 'LV.39', value: 'LV.39 屬性:魔法烤肉' },
  { label: 'LV.40', value: 'LV.40 屬性:猴子' },
  { label: 'LV.41', value: 'LV.41 屬性:鯊魚' },
  { label: 'LV.42', value: 'LV.42 屬性:混沌???' },
  { label: 'LV.43', value: 'LV.43 屬性:年貨' },
  { label: 'LV.44', value: 'LV.44 屬性:兔兔' },
  { label: 'LV.45', value: 'LV.45 屬性:暈船' },
  { label: 'LV.46', value: 'LV.46 屬性:狗狗' },
  { label: 'LV.47', value: 'LV.47 屬性:魔術' },
  { label: 'LV.48', value: 'LV.48 屬性:寶寶' },
  { label: 'LV.49', value: 'LV.49 屬性:嘴巴開光' },
  { label: 'LV.50', value: 'LV.50 屬性:喵喵教' },
  { label: 'LV.51', value: 'LV.51 屬性:瓜' },
  { label: 'LV.52', value: 'LV.52 屬性:精神健康' },
  { label: 'LV.53', value: 'LV.53 屬性:客服' },
  { label: 'LV.54', value: 'LV.54 屬性:過劫' },
  { label: 'LV.55', value: 'LV.55 屬性:敏感' },
  { label: 'LV.56', value: 'LV.56 屬性:修仙' },
  { label: 'LV.57', value: 'LV.57 屬性:關懷' },
  { label: 'LV.58', value: 'LV.58 屬性:健康心靈' },
  { label: 'LV.59', value: 'LV.59 屬性:日常' },
  { label: 'LV.60', value: 'LV.60 屬性:寶寶' },
  { label: 'LV.61', value: 'LV.61 屬性:大人' },
  { label: 'LV.62', value: 'LV.62 屬性:哥布林' },
  { label: 'LV.63', value: 'LV.63 屬性:聖誕綜合禮包' },
  { label: 'LV.64', value: 'LV.64 屬性:豐收過年禮貌組' },
  { label: 'LV.65', value: 'LV.65 屬性:情緒提供' },
  { label: 'LV.66', value: 'LV.66 屬性:古代社畜' },
  { label: 'LV.67', value: 'LV.67 屬性:皇上' },
  { label: 'LV.68', value: 'LV.68 屬性:精神淨化' },
  { label: 'LV.69', value: 'LV.69 屬性:狗狗' },
  { label: 'LV.70', value: 'LV.70 屬性:軍師' },
  { label: 'LV.71', value: 'LV.71 屬性:過敏' },
  { label: 'LV.72', value: 'LV.72 屬性:娘娘' },
  { label: 'LV.73', value: 'LV.73 屬性:節日精神' },
  { label: 'LV.74', value: 'LV.74 屬性:獨角獸寶寶' },
  { label: 'LV.75', value: 'LV.75 屬性:遊戲' },
  { label: 'LV.76', value: 'LV.76 屬性:狗狗' },
  { label: 'LV.77', value: 'LV.77 屬性:派派' },
  { label: 'LV.78', value: 'LV.78 屬性:自定義' },
  { label: 'LV.79', value: 'LV.79 屬性:兔兔' },
  { label: 'LV.80', value: 'LV.80 屬性:狗狗' },
  { label: 'RE.01', value: 'RE.01 猴子' }
];
</script>

<template>
  <div ref="chipsContainer" class="flex overflow-x-auto gap-2 py-4 px-2 scrollbar-custom">
    <button 
      v-for="cat in categories" 
      :key="cat.value"
      class="chip 
        shrink-0 py-1.5 px-4 rounded-full border-[1.5px] border-primary bg-card-bg text-text-soft cursor-pointer text-[0.9rem] transition-all duration-300
        hover:bg-primary hover:text-primary-soft hover:-translate-y-[2px]
        [&.active]:bg-primary-dark [&.active]:text-white [&.active]:shadow-[0_4px_8px_rgba(162,210,255,0.4)] [&.active]:scale-[0.99]
      "
      :class="{ 'active': category === cat.value }"
      @click="filterByTag(cat.value)" 
    >
      # {{ cat.label }}
    </button>
  </div>

  <!-- loading 時產生假項目 -->
  <ul v-if="stickerStore.loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-6 p-6 mx-auto max-w-6xl">
    <li v-for="n in 12" :key="n" class="
      animate-pulse rounded-md p-4 bg-card-bg border border-gray-300 
      flex flex-col max-w-60 w-full mx-auto justify-between items-center text-center
    ">
      <div class="absolute top-2.5 right-3 h-5 w-5 bg-gray-200 dark:bg-gray-600 rounded-full"></div>
      <div class="w-32 h-20 bg-gray-200 dark:bg-gray-600 rounded-md mt-2 mb-3"></div>
      <div class="h-3 bg-gray-100 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
      <div class="flex justify-center w-full mt-auto">
        <div class="h-8 bg-gray-200 dark:bg-gray-600 rounded-md w-24"></div> 
      </div>
    </li>
  </ul>

  <!-- 列表狀態 (加上 v-else-if 確保錯誤時不顯示空列表) -->
  <ul 
    v-else-if="!stickerStore.error" 
    class="grid gap-x-4 gap-y-6 p-6 mx-auto max-w-6xl transition-all duration-300"
    :class="{
      // 手機版根據模式切換，電腦版（sm 以上）維持固定 4 列
      'grid-cols-1': uiStore.displayMode === 'single',
      'grid-cols-2': uiStore.displayMode === 'grid',
      'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4': true
    }"
  >
    <li 
      v-for="item in displayedStickers" 
      :key="item.id" 
      class="
        card relative bg-card-bg text-text rounded-md shadow-soft text-center border-border w-full max-w-60
        flex flex-col mx-auto justify-between overflow-hidden transition-transform duration-200
        hover:-translate-y-1 hover:border-primary
      "
      :class="uiStore.displayMode === 'grid' ? 'p-2' : 'p-4 my-0.5'" 
    >
      <button @click="favoriteStore.toggleFavorite(item)" class="absolute top-2 right-2 p-1.5 cursor-pointer z-10 transition-transform active:scale-125">
        {{ favoriteStore.isFavorite(item.id) ? '❤️' : '🤍' }}
      </button>
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
  </ul>

  <!-- 滾動偵測觸發點 -->
  <div ref="loadMoreTrigger" class="load-mor py-8 text-center text-gray-400e">
    <p v-if="stickerStore.loading && displayedStickers.length > 0">載入中...</p>
    <p v-else-if="!stickerStore.loading && displayedStickers.length >= filteredStickers.length && filteredStickers.length > 0">已顯示所有貼圖</p>
  </div>

  <div v-if="!stickerStore.loading && filteredStickers.length === 0" class="empty col-span-full py-5 m-auto mb-10 text-center text-gray-400">
    <p class="emoji mb-2.5 text-4xl">🔍</p>
    <p>找不到符合條件的貼圖</p>
  </div>

  <!-- recoverable error，出錯 → 重試 -->
  <div v-if="stickerStore.error" class="error-box flex flex-grow flex-col items-center justify-center w-full py-20">
  <div class="text-center">
    <p class="error-text mb-4 text-gray-600 flex flex-col items-center">
      <span class="text-4xl mb-2">⚠️</span>
      <span class="text-lg font-medium">貼圖載入失敗</span>
    </p>
    <button 
      @click="stickerStore.loadStickers(true)" 
      class="retry-btn bg-white border border-gray-300 rounded-lg px-6 py-2 cursor-pointer hover:bg-gray-50 transition-all shadow-sm active:scale-95 text-gray-700"
    >
      重試
    </button>
  </div>
  </div>
</template>