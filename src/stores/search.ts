import { ref, computed } from 'vue'

import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', () => {
  const searchQuery = ref('')

  const getSearchQuery = computed(() => searchQuery.value)

  function setSearchQuery(query: string) {
    if (query.length >= 3) {
      searchQuery.value = query
    } else {
      searchQuery.value = ''
    }
  }

  return { useSearchStore, getSearchQuery, setSearchQuery }
})
