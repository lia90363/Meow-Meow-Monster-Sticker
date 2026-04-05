<script setup>
import { useFavoriteStore } from '@/stores/favoriteStore'

const favoriteStore = useFavoriteStore()
</script>

<template>
  <h2 class="text-center text-3xl mt-6">我的最愛</h2>

  <p v-if="favoriteStore.favorites.length === 0" class="empty col-span-full py-5 m-auto mb-10 text-center text-gray-400">還沒有貼圖收藏，趕快去收藏喜歡的貼圖吧!</p>

  <ul v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-6 p-6 mx-auto max-w-6xl">
    <li 
      v-for="item in favoriteStore.favorites" 
      :key="item.id" 
      class="
        card relative bg-card-bg rounded-md shadow-soft p-4 my-0.5 text-center border-border w-full 
        flex flex-col min-h-[128px] justify-between overflow-hidden transition-transform duration-200
        hover:-translate-y-1 hover:border-primary
      ">
      <button @click="favoriteStore.toggleFavorite(item)" class="absolute top-2 right-2 p-1.5 cursor-pointer z-10 transition-transform active:scale-125">❤️</button>
      <div class="item-title text-[1.1rem] font-semibold leading-normal mb-0.5 line-clamp-1">{{ item.title }}</div>
      <div class="item-category text-[0.85rem] text-text-soft px-0.5 mb-1.5">({{ item.category }})</div>
      <div class="card-actions flex justify-center w-full gap-1">
        <button class="btn bg-primary-dark text-white shrink-0 rounded-md py-0.5 px-2 cursor-pointer mx-1"><router-link :to="`/sticker/${item.id}`">查看詳細</router-link></button>
      </div>
    </li>
  </ul>
</template>