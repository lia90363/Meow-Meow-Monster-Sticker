import { ref } from 'vue'

// 放在外面確保資料在頁面切換時不會被重置
const history = ref(JSON.parse(localStorage.getItem('sticker_history') || '[]'))

export function useHistory() {
  
  const saveHistory = () => {
    localStorage.setItem('sticker_history', JSON.stringify(history.value))
  }

  const addHistory = (id) => {
    // 確保 id 是字串或數字，統一格式
    const stickerId = String(id)

    // 檢查是否已存在，若有則找出位置並移除 (為了搬到最前面)
    const index = history.value.indexOf(stickerId)
    if (index !== -1) {
      history.value.splice(index, 1)
    }

    // 推入最前面
    history.value.unshift(stickerId)

    // 限制數量為 10 筆
    if (history.value.length > 5) {
      history.value.pop()
    }

    // 存入 localStorage
    saveHistory()
  }

  return {
    history,
    addHistory
  }
}