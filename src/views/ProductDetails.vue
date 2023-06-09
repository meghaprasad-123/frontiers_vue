<script setup lang="ts">
import { inject } from 'vue'
import { ref } from 'vue'

const injectedData = inject('data', ref([]))
</script>

<template>
  <div v-for="item in injectedData" :key="item.id" class="details">
    <img src="displayImage(item.segmentId)" alt="${item.productName}" />
    <div class="title">{{ item.segmentId }}</div>
    <h1>{{ item.productName }}</h1>
    <p>{{ item.description }}</p>
  </div>
</template>

<style scoped>
body {
  margin: 0;
  padding: 1rem;
  font-family: Arial, sans-serif;
  background-color: #f0f8ff;
}

.details {
  width: 50%;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  padding: 3rem;
  margin: auto;
}

img {
  width: 100px;
  height: 100px;
}

.title {
  font-size: 1rem;
  font-weight: bold;
  margin-top: 10px;
}
</style>
