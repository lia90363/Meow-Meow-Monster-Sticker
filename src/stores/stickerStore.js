import { defineStore } from 'pinia'
import { fetchStickers } from '@/api/stickers'

const TTL = 10_000

export const useStickerStore = defineStore('sticker', {
  state: () => ({
    stickers: [],
    loading: false,
    error: null,
    requestPromise: null,
    lastFetched: 0
  }),

  actions: {  
    async loadStickers(force = false) {
      const now = Date.now()

      // 有資料 + 還沒過期 → 直接用 cache
      if (!force && this.stickers.length && now - this.lastFetched < TTL) {
        return
      }

      if (this.requestPromise) return this.requestPromise

      this.loading = true;
      this.requestPromise = (async () => {
        try {
          // 3. 直接呼叫 API，它會自己 retry
          this.stickers = await fetchStickers({ force });
          this.lastFetched = Date.now();
        } catch (err) {
          this.error = err.message;
        } finally {
          this.loading = false;
          this.requestPromise = null;
        }
      })();

      return this.requestPromise
    }
  }
})

