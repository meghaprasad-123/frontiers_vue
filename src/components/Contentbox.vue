<script setup lang="ts">
import { computed, provide, ref } from 'vue'
import axios from 'axios'
import { useSearchStore } from '../stores/search'
import { Ref } from 'vue'
import { RouterLink } from 'vue-router'

const store = useSearchStore()
const searchQuery = computed(() => store.getSearchQuery)
const isLoading = ref(true)

//axios

axios
  .get('https://mocki.io/v1/6f46c778-2ec4-4690-9dcb-de755e0298e7')
  .then(function (response) {
    console.log(response.data)
    segments.value = response.data
    isLoading.value = false
  })
  .catch(function (response) {
    console.log(response.error)
    isLoading.value = false
  })

const segments = ref([])

//segments

const tools = computed(() => searchData.value.length)

interface segmentList {
  id: string
  displayName: string
  icon: string
}
const segmentList: Ref<segmentList[]> = ref([
  {
    id: '1es23',
    displayName: 'Office platforms',
    icon: 'ICO_Computer.svg'
  },
  {
    id: '1xs2e',
    displayName: 'Advanced settings',
    icon: 'ICO_Cog.svg'
  },
  {
    id: 'xs2e1',
    displayName: 'Data',
    icon: 'ICO_Servers.svg'
  },
  {
    id: 'xf2e1',
    displayName: 'Business workflows Business workflows Business workflows Business workflows',
    icon: 'ICO_BusinessWorkflows.svg'
  }
])

const topics = ref([
  {
    id: 'all',
    btn_name: 'All'
  },
  {
    id: '1es23',
    btn_name: 'Office platforms'
  },
  {
    id: '1xs2e',
    btn_name: 'Advanced settings'
  },
  {
    id: 'xs2e1',
    btn_name: 'Data'
  },
  {
    id: 'xf2e1',
    btn_name: 'More'
  }
])
const segmentOption = ref('all')
function activebtn(segmentId: string) {
  segmentOption.value = segmentId
}

// calling segments

const segmentData = computed(() => {
  if (segmentOption.value === 'all') {
    return segments.value
  } else if (segmentOption.value !== 'xf2e1') {
    return segments.value.filter((data) => data.segmentId === segmentOption.value)
  } else {
    return segments.value.filter((data) => data.segmentId === 'xf2e1')
  }
})

// fntn for displaying images
function displayImage(segmentId: String) {
  const segmentImage = segmentList.value.find((item) => item.id === segmentId)
  return segmentImage ? `/src/assets/images/${segmentImage.icon} ` : ''
}

function displayTitle(segmentId: String) {
  const segmentTitle = segmentList.value.find((item) => item.id === segmentId)
  return segmentTitle ? segmentTitle.displayName : ''
}

//bookmark fntn
function booked(event, data: any) {
  event.preventDefault()
  const savedData = JSON.parse(localStorage.getItem('savedData')) || []
  const index = savedData.findIndex((item) => item.productId === data.productId)

  if (index !== -1) {
    savedData.splice(index, 1)
  } else {
    savedData.push(data)
  }

  localStorage.setItem('savedData', JSON.stringify(savedData))
  const elements = document.querySelectorAll(`[data-product-id="${data.productId}"]`)

  elements.forEach((element) => {
    element.classList.toggle('bookmarked')
  })

  const bookingIcon = event.currentTarget
  const currentBookmarked = bookMarked(data)

  if (currentBookmarked) {
    bookingIcon.classList.add('bookmarked')
  } else {
    bookingIcon.classList.remove('bookmarked')
  }
}

function bookMarked(data) {
  const storedData = JSON.parse(localStorage.getItem('savedData')) || []
  return storedData.some((savedData) => savedData.productId === data.productId)
}

//filtered contents
const filterImage = ref(true)
const showLabel = ref(true)

function filtered() {
  const savedData = JSON.parse(localStorage.getItem('savedData')) || []
  segments.value = savedData
  showLabel.value = false

  // toggling the images

  filterImage.value = !filterImage.value
  if (!filterImage.value) {
    segments.value = savedData
  }

  // Show empty state if there are no saved data items
  if (savedData.length === 0) {
    showLabel.value = true
  }
}

function backPage() {
  filterImage.value = true
  segments.value = JSON.parse(localStorage.getItem('savedData')) || []
  window.location.reload()
}

//search
const searchData = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()

  if (query === '') {
    return segmentData.value
  }
  return segmentData.value.filter((item) => item.productName.toLowerCase().includes(query))
})
</script>

<template>
  <div class="col1">
    <h1 id="tool_title">{{ tools }} tools</h1>

    <ul class="options">
      <li>
        <button
          :key="btn.id"
          v-for="btn in topics"
          :class="{ active: segmentOption === btn.id }"
          @click="activebtn(btn.id)"
        >
          {{ btn.btn_name }}
        </button>
      </li>
      <button class="dots">
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
            d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
          />
        </svg>
      </button>

      <div class="shadow">
        <button @click="filtered()" id="saved">
          <svg
            v-if="filterImage"
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
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
            />
          </svg>

          <svg
            v-else
            @click="backPage()"
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
              d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"
            />
          </svg>
        </button>
      </div>
    </ul>

    <div class="contents">
      <div v-if="isLoading" class="loading-icon">
        <img src="../assets/images/icons8-loading-24.png" alt="" />
      </div>

      <div v-else>
        <div v-for="item in searchData" class="content">
          <div class="pic">
            <img :src="displayImage(item.segmentId)" alt="${data.productName}" />
          </div>

          <div class="notes">
            <router-link
              :to="{
                name: 'ProductDetails',
                params: {
                  segmentId: displayTitle(item.segmentId),
                  segmentIcon: displayImage(item.segmentId),
                  segmentName: displayTitle(item.segmentId),
                  productName: item.productName,
                  description: item.description
                }
              }"
              target="_blank"
            >
              <h6 :class="displayTitle(item.segmentId)">
                {{ displayTitle(item.segmentId) }}
              </h6>
              <h2>
                {{ item.productName }}
              </h2>

              <p>{{ item.description }}</p>
            </router-link>
          </div>

          <div v-if="showLabel" class="label">
            <svg
              @click="booked($event, item)"
              :class="{ booked: bookMarked(item) }"
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
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div v-if="searchQuery && searchData.length === 0" class="no-results">
        <p>No matches to your query could be found. Try another search term.</p>
      </div>

 <!-- Display empty state message -->
      <div v-if="showLabel && searchData.length === 0 && !filterImage" class="no-saved">
        <img src="../assets/images/icons8-empty-50.png" alt="">
        <p>No saved data found.</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '/src/assets/styles/contentbox.scss';

.active {
  text-decoration: underline;
}
</style>
