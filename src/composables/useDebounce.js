import { ref, watch, onUnmounted, isRef } from 'vue'

export function useDebounce(source, delay = 300) {
  // 確保初始值至少是空字串，避免 .trim() 報錯
  const initialValue = isRef(source) ? source.value : (typeof source === 'function' ? source() : source);
  const debounced = ref(initialValue || '') 
  
  let timer = null

  // 使用 getter function 來監聽，這樣可以追蹤 store 的 property
  watch(() => (isRef(source) ? source.value : (typeof source === 'function' ? source() : source)), 
    (newVal) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        debounced.value = newVal
      }, delay)
    }
  )

  onUnmounted(() => clearTimeout(timer))

  return debounced
}