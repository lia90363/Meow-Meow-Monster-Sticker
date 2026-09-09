import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', () => {
  const displayMode = ref(localStorage.getItem('display_mode') || 'single')
  
  const toggleDisplayMode = () => {
    displayMode.value = displayMode.value === 'single' ? 'grid' : 'single'
  }

  const theme = ref(localStorage.getItem('theme') || 'light')

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    applyTheme()
  }

  const applyTheme = () => {
    if (theme.value === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark')
      document.documentElement.classList.add('dark') 
    } else {
      document.documentElement.removeAttribute('data-theme')
      document.documentElement.classList.remove('dark')
    }
  }

  watch(displayMode, (val) => localStorage.setItem('display_mode', val))
  watch(theme, (val) => localStorage.setItem('theme', val))

  applyTheme() 

  return { 
    displayMode, 
    toggleDisplayMode, 
    theme, 
    toggleTheme,
    applyTheme 
  }
})