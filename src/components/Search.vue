<script setup lang="ts">
import { ref, watch } from 'vue'

import { useSearchStore } from '../stores/search'

const searchQuery = ref('')
const store = useSearchStore()

// Watch for changes in the search query
watch(searchQuery, (newValue) => {
  store.setSearchQuery(newValue)
})
</script>

<template>
  <section>
    <div class="searchbox">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
      <input type="text" id="searching" placeholder="Search..." v-model="searchQuery" />
    </div>
    <div id="searchtext"><p>Type atleast 3 characters</p></div>
  </section>
</template>

<style lang="scss">
@import '/src/assets/styles/search.scss';
</style>
