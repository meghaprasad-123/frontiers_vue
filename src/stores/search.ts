import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', {
  state: () => ({
    searchQuery: ''
  }),

  
  actions: {
    setSearchQuery(query: string) {
      if (query.length > 3) {
        this.searchQuery = query
      } else {
        this.searchQuery = ''
      }
    }
  },

  getters: {
    getSearchQuery(): string {
      return this.searchQuery
    },
    
    isSearchValid(): boolean {
      return this.searchQuery.length >3
    }
  }
})
