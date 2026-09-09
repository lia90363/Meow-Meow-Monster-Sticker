<script setup>
import { computed } from 'vue'

const props = defineProps({
  number: [Number, String],
  isThumbnail: {
    type: Boolean,
    default: false
  }
})

// 統一管理 URL 邏輯
const imageUrl = computed(() => {
  if (!props.number) return ''
  return `https://stickershop.line-scdn.net/stickershop/v1/sticker/${props.number}/android/sticker.png?v=1`
})
</script>

<template>
  <img 
    :src="imageUrl" 
    :class="isThumbnail ? 'stickerImg-sm' : 'stickerImg'" 
    loading="lazy"
  />
</template>