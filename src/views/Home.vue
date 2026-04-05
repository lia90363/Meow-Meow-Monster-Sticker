<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useStickerStore } from '@/stores/stickerStore'
import { useFavoriteStore } from '@/stores/favoriteStore'
import { useDebounce } from '@/composables/useDebounce'


const stickerStore = useStickerStore()
const favoriteStore = useFavoriteStore()

const keyword = ref('')
const debouncedKeyword = useDebounce(keyword, 300)
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
    if (entries[0].isIntersecting && displayedStickers.value.length < filteredStickers.value.length) {
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

  const lowerKeyword = debouncedKeyword.value.trim().toLowerCase();
  const currentCategory = category.value; 

  return stickerStore.stickers.filter(item => {
    // 同時比對 title 和 category
    const matchesKeyword = lowerKeyword.split(/\s+/).every(word => 
      item.title.toLowerCase().includes(word) || 
      item.category.toLowerCase().includes(word)
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
  { label: '遊戲No.1', value: 'LV.1 遊戲' },
  { label: 'NPC', value: 'LV.2 NPC' },
  { label: '審判', value: 'LV.3 審判' },
  { label: '飆車', value: 'LV.4 飆車' },
  { label: '藥', value: 'LV.5 藥' },
  { label: '敏感/麻煩', value: 'LV.6 敏感/麻煩' },
  { label: '隨你填', value: 'LV.7 隨你填' },
  { label: '佳節適用', value: 'LV.8 佳節適用' },
  { label: '錢', value: 'LV.9 錢' },
  { label: '告白', value: 'LV.10 告白' },
  { label: '口罩', value: 'LV.11 口罩' },
  { label: '訊息貼圖', value: 'LV.12 訊息貼圖' },
  { label: '實話', value: 'LV.13 實話' },
  { label: '草尼馬', value: 'LV.14 附草尼馬' },
  { label: '87小忍者', value: 'LV.15 87小忍者' },
  { label: '厭世', value: 'LV.16 厭世' },
  { label: '小僧', value: 'LV.17 小僧' },
  { label: '日常禮貌', value: 'LV.18 日常性禮貌' },
  { label: '幻肢靜態', value: 'LV.19 幻肢靜態' },
  { label: '放棄', value: 'LV.20 放棄' },
  { label: '提問', value: 'LV.21 提問' },
  { label: '欲擒故縱', value: 'LV.22 欲擒故縱' },
  { label: '上班', value: 'LV.23 上班' },
  { label: '酒精', value: 'LV.24 含酒精成分' },
  { label: '吃貨', value: 'LV.25 屬性:吃貨' },
  { label: '通靈', value: 'LV.26 通靈' },
  { label: '恐怖情人', value: 'LV.27 恐怖情人' },
  { label: '被被', value: 'LV.28 內含被被' },
  { label: '公事', value: 'LV.29 內含失傳貼圖' },
  { label: '幽靈', value: 'LV.30 內含幽靈人口' },
  { label: '搞怪聖誕', value: 'LV.31 屬性:搞怪聖誕' },
  { label: '遊戲No.2', value: 'LV.32 屬性:遊戲' },
  { label: '求生', value: 'LV.33 屬性:求生' },
  { label: '精緻香喵', value: 'LV.34 屬性:精緻香喵' },
  { label: '職場', value: 'LV.35 屬性:職場' },
  { label: '回覆技能補充包', value: 'LV.36 屬性:回覆技能補充包' },
  { label: '吃土', value: 'LV.37 屬性:吃土' },
  { label: '失傳社群', value: 'LV.38 屬性:失傳社群' },
  { label: '魔法烤肉', value: 'LV.39 屬性:魔法烤肉' },
  { label: '猴子', value: 'LV.40 屬性:猴子' },
  { label: '鯊魚', value: 'LV.41 屬性:鯊魚' },
  { label: '混沌???', value: 'LV.42 屬性:混沌???' },
  { label: '年貨', value: 'LV.43 屬性:年貨' },
  { label: '兔兔', value: 'LV.44 屬性:兔兔' },
  { label: '暈船', value: 'LV.45 屬性:暈船' },
  { label: '狗狗No.1', value: 'LV.46 屬性:狗狗/喵喵' },
  { label: '魔術', value: 'LV.47 屬性:魔術' },
  { label: '寶寶No.1', value: 'LV.48 屬性:寶寶' },
  { label: '嘴巴開光', value: 'LV.49 屬性:嘴巴開光' },
  { label: '喵喵教', value: 'LV.50 屬性:喵喵教' },
  { label: '瓜', value: 'LV.51 屬性:瓜' },
  { label: '精神健康', value: 'LV.52 屬性:精神健康' },
  { label: '客服', value: 'LV.53 屬性:客服' },
  { label: '過劫', value: 'LV.54 屬性:過劫' },
  { label: '敏感', value: 'LV.55 屬性:敏感' },
  { label: '修仙', value: 'LV.56 屬性:修仙' },
  { label: '關懷', value: 'LV.57 屬性:關懷' },
  { label: '健康心靈', value: 'LV.58 屬性:健康心靈' },
  { label: '日常', value: 'LV.59 屬性:日常' },
  { label: '寶寶No.2', value: 'LV.60 屬性:寶寶' },
  { label: '大人', value: 'LV.61 屬性:大人' },
  { label: '哥布林', value: 'LV.62 屬性:哥布林' },
  { label: '聖誕', value: 'LV.63 屬性:聖誕綜合禮包' },
  { label: '過年', value: 'LV.64 屬性:豐收過年禮貌組' },
  { label: '情緒提供', value: 'LV.65 屬性:情緒提供' },
  { label: '古代社畜', value: 'LV.66 屬性:古代社畜' },
  { label: '皇上', value: 'LV.67 屬性:皇上' },
  { label: '精神淨化', value: 'LV.68 屬性:精神淨化' },
  { label: '狗狗No.2', value: 'LV.69 屬性:狗狗/喵喵' },
  { label: '軍師', value: 'LV.70 屬性:軍師' },
  { label: '過敏', value: 'LV.71 屬性:過敏' },
  { label: '娘娘', value: 'LV.72 屬性:娘娘' },
  { label: '節日精神', value: 'LV.73 屬性:節日精神' },
  { label: '獨角獸', value: 'LV.74 屬性:獨角獸寶寶' },
  { label: '遊戲No.3', value: 'LV.75 屬性:遊戲' },
];

</script>

<template>
  <Teleport to="#nav-search-target">
    <!-- 搜尋框 -->
    <input v-model="keyword" placeholder="搜尋貼圖..." class="rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 py-1 px-4 w-full focus:ring-2 focus:ring-primary outline-none"/>

    <!-- 分類篩選 
    <select v-model="category" class="select-blue">
      <option v-for="cat in categories" :key="cat.value" :value="cat.value">
        {{ cat.label }}
      </option>
    </select>-->
  </Teleport>

  <div ref="chipsContainer" class="flex overflow-x-auto gap-2 py-4 px-2 scrollbar-custom">
    <button 
      v-for="cat in categories" 
      :key="cat.value"
      class="chip 
        shrink-0 py-1.5 px-4 rounded-full border-[1.5px] border-primary bg-card-bg text-primary cursor-pointer text-[0.9rem] transition-all duration-300
        hover:bg-primary hover:text-primary-soft hover:-translate-y-[2px]
        [&.active]:bg-primary-dark [&.active]:text-white [&.active]:shadow-[0_4px_8px_rgba(162,210,255,0.4)] [&.active]:scale-[0.99]
      "
      :class="{ 'active': category === cat.value }"
      @click="filterByTag(cat.value)" 
    >
      # {{ cat.label }}
    </button>
  </div>

  <!-- loading 時產生假項目，看起來像資料快出來了 -->
  <ul v-if="stickerStore.loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-6 p-6 mx-auto max-w-6xl">
    <li v-for="n in 12" :key="n" class="
      animate-pulse rounded-md p-4 bg-card-bg border border-border 
      flex flex-col min-h-[128px] justify-between items-center text-center
    ">
    <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
    <div class="h-3 bg-gray-100 dark:bg-gray-800 rounded w-1/3 mb-4"></div>
    <div class="flex justify-center w-full gap-2 mt-auto">
      <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24"></div> 
      <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-10"></div>
    </div>
    </li>
  </ul>

  <!-- 列表狀態 (加上 v-else-if 確保錯誤時不顯示空列表) -->
  <ul v-else-if="!stickerStore.error" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-6 p-6 mx-auto max-w-6xl">
    <!-- 關鍵：這裡必須是 filteredStickers，原本使用v-for="item in filteredStickers -->
    <li 
      v-for="item in displayedStickers" 
      :key="item.id" 
      class="
        card relative bg-card-bg rounded-md shadow-soft p-4 my-0.5 text-center border-border w-full 
        flex flex-col min-h-[128px] justify-between overflow-hidden transition-transform duration-200
        hover:-translate-y-1 hover:border-primary
      "
    >
      <button @click="favoriteStore.toggleFavorite(item)" class="absolute top-2 right-2 p-1.5 cursor-pointer z-10 transition-transform active:scale-125">
        {{ favoriteStore.isFavorite(item.id) ? '❤️' : '🤍' }}
      </button>
      <div class="item-title text-[1.1rem] font-semibold leading-normal mb-0.5 line-clamp-1">{{ item.title }}</div>
      <div class="item-category text-[0.85rem] text-text-soft px-0.5 mb-1.5">({{ item.category }})</div>
      <div class="card-actions flex justify-center w-full gap-1">
        <button class="btn bg-primary-dark text-white shrink-0 rounded-md py-0.5 px-2 cursor-pointer mx-1"><router-link :to="`/sticker/${item.id}`">查看詳細</router-link></button>

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