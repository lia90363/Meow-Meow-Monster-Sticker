import { defineStore } from 'pinia'

export const useFavoriteStore = defineStore('favorite', {
  state: () => ({
    favorites: []
  }),

  actions: {
    toggleFavorite(item) {
      const index = this.favorites.findIndex(f => f.id === item.id)

      if (index === -1) {
        this.favorites.push(item)
      } else {
        this.favorites.splice(index, 1)
      }
    },

    isFavorite(id) {
      return this.favorites.some(f => f.id === id)
    }
  }
})