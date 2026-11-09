<template>
  <ProductGrid title="为你推荐" sub="根据浏览记录为您推荐" :items="guessYouLike" />
</template>
<script setup>
import ProductGrid from './ProductGrid.vue'
import { guessYouLike } from '@/mock/homeData'
</script>
