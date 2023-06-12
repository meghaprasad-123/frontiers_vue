import { createRouter, createWebHistory } from 'vue-router'

import ProductList from '../views/ProductList.vue'
import ProductDetails from '../views/ProductDetails.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'productlist',
      component: ProductList
    },
    {
      path: '/productDetails/:segmentIcon/:productName/:segmentName/:description/',
      name: 'ProductDetails',
      component: ProductDetails,
      props: true
    }
  ]
})

export default router
