import { ref, watch, onUnmounted } from 'vue'

// debounce composable  輸入中…（不請求） 停下來 → 才更新
export function useDebounce(sourceRef, delay = 300) {
  const debounced = ref(sourceRef.value)
  let timer = null

  watch(sourceRef, (newVal) => {
    clearTimeout(timer)

    timer = setTimeout(() => {
      debounced.value = newVal
    }, delay)
  })

  onUnmounted(() => {
    clearTimeout(timer)
  })

  return debounced
}