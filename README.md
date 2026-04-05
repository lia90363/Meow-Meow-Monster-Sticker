# 🐱 喵喵怪貼圖搜尋工具 (Meow-Meow Sticker Search)

[Vue 3]
[Pinia]
[Vercel]

### 🎯 專案介紹  
🔍 解決貼圖難找的問題，提供關鍵字搜尋＋分類瀏覽，提升使用效率  
🚀 支援快速搜尋（Debounce）、無限滾動（Intersection Observer），模擬真實產品體驗  

[🔗 立即試用 Demo](https://meow-meow-monster-sticker.vercel.app)

---

### 📸 專案預覽  
<img width="396" height="757" alt="image" src="https://github.com/user-attachments/assets/31a26392-68be-4160-93bc-a1872950313d" />

### 🛠 使用技術  
- Vue 3：作為前端框架，使用 Composition API 開發  
- Pinia：集中管理貼圖資料、收藏與歷史紀錄狀態  
- Vue Router：處理頁面切換與路由邏輯  
- Git：加強版本控制，練習流程與慣例  
- Mock API：模擬後端資料來源，建立完整資料流  
- Debounce：優化搜尋體驗，避免頻繁請求  
- Intersection Observer：實作無限滾動（load more）  
- LocalStorage（Persist）：保存使用者收藏與歷史紀錄  
- Tailwind：樣式與架構，封裝設計系統(Config)  
- RWD：響應式設計，確保不同裝置皆能維持最佳的排版  
- Vercel：串接 GitHub 實作 CI/CD 工作流，自動化部署專案  

### ✨ 功能亮點  
🔍 **智能搜尋**：輸入關鍵字即時篩選，搭配 Debounce 避免頻繁請求。  
🏷️ **標籤分類**：快速切換不同情境的貼圖類別。  
⭐ **收藏系統**：一鍵收藏喜愛貼圖，資料自動儲存於瀏覽器。  
🕘 **瀏覽歷史**：紀錄最近查看過的貼圖，方便回溯。  
♾️ **流暢載入**：實作無限滾動 (Load More)，優化大量圖片載入效能。  

### 💡 核心學習  
◇如何規劃前端專案架構（components / store / api 分層）  
◇使用 Pinia 管理全域狀態（收藏、歷史紀錄）  
◇透過 Git 加強版本控制  
◇將 API 呼叫集中管理（api/），降低耦合並提升專案可維護性  
◇使用 debounce 優化搜尋效能與使用體驗  
◇透過 Intersection Observer 實作無限滾動  
◇將 SCSS 全面改為 Tailwind 以加快載入速度  
◇使用 Vercel 體驗從開發到部署的流程  

### 架構說明  
src/
  ├─ components/   # UI 元件  
  ├─ views/        # 頁面  
  ├─ stores/       # Pinia 狀態管理  
  ├─ router/       # 路由設定  
  ├─ api/          # API 邏輯統一管理  
