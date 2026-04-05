// 偽 API 層
import { mockStickers } from '@/mocks/stickers'

// 模擬網路延遲
function delay(ms = 800) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// 記住正在進行的請求
let cache = null
let cacheTimestamp = 0
let requestPromise = null

const TTL = 5000 // 5 秒

/*SWR
export async function fetchStickers({ force = false } = {}) {
  // SWR：有 cache → 直接回傳
  if (cache && !force) {
    // 背景偷偷更新
    revalidate()
    return cache
  }

  // 沒 cache → 正常抓
  return revalidate()
}*/


// 處理暫時性失敗：第一次失敗等0.5秒，第二次失敗等1秒，第三次報錯
async function retryWithBackoff(fn, retries = 3) {
  let delayTime = 500
  for (let i = 0; i < retries; i++) {
    try {
      return await fn()
    } catch (err) {
      if (i === retries - 1) throw err // 最後一次失敗才拋出
      console.warn(`請求失敗，第 ${i + 1} 次重試...`)
      await delay(delayTime)
      delayTime *= 2 // 每次重試等更久 (500ms -> 1000ms)
    }
  }
}

// 處理重複請求
async function revalidate() {
  // 如果已經有請求在進行中，直接回傳該 Promise (防止重複請求)
  if (requestPromise) return requestPromise

  // 將帶有重試機制的邏輯賦值給 requestPromise
  requestPromise = retryWithBackoff(async () => {
    await delay() // 模擬網路延遲

    // 模擬錯誤機率
    if (Math.random() < 0.3) {
      throw new Error('Mock API error')
    }

    const data = mockStickers
    cache = data
    cacheTimestamp = Date.now()
    return data
  })
  .finally(() => {
    requestPromise = null // 請求結束（成功或失敗）都要解鎖
  })

  return requestPromise
}

export async function fetchStickers({ force = false } = {}) {
  const now = Date.now()
  const cacheExpired = now - cacheTimestamp > TTL

  // 1. 檢查快取
  if (!force && cache && !cacheExpired) {
    console.log('⚡ 使用快取資料');
    return cache
  }

  // 2. 執行帶有重試機制的請求
  return await revalidate()
}