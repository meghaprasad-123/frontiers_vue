<script setup lang="ts">
import Contentbox from './Contentbox.vue'
import Toolsbox from './Toolsbox.vue'
import { ref } from 'vue'

const segments = ref([
  {
    id: '1es23',
    displayName: 'Office platforms',
    displayTitle: 'Accounting',
    icon: '/src/assets/images/ICO_Computer.svg'
  },
  {
    id: '1xs2e',
    displayName: 'Advanced settings',
    displayTitle: 'Article types',
    icon: '/src/assets/images/ICO_Cog.svg'
  },
  {
    id: 'xf2e1',
    displayName: 'Business workflows Business workflows Business workflows Business workflows',
    displayTitle: 'All workflows',
    icon: '/src/assets/images/ICO_BusinessWorkflows.svg'
  },
  {
    id: 'xs2e1',
    displayName: 'Data',
    displayTitle: 'General',
    icon: '/src/assets/images/ICO_Servers.svg'
  }
])
</script>

<template>
  <section>
    <div class="mainbox">
      <Contentbox :data="segments" />
      <Toolsbox />
    </div>
  </section>
</template>

<style lang="scss">
@import '/src/assets/styles/mainbox.scss';
</style>
