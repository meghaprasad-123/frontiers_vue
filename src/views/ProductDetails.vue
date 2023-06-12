<script setup lang="ts">
import { defineProps } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps(['segmentId', 'segmentIcon', 'productName', 'segmentName', 'description'])
const route = useRoute()

const img = route.params.segmentIcon
</script>

<template>
  <div class="details">
    <img :src="img" />
    <div class="title">{{ route.params.segmentName }}</div>
    <h1>{{ route.params.productName }}</h1>
    <p>{{ route.params.description }}</p>
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
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  gap: 18px;
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
