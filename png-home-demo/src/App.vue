<template>
  <AppHeader />
  <main>
    <HeroBanner />
    <IndustryPanel />
    <ProductGrid title="今日精选" sub="认证供应商 · 品质保障" :items="todayPicks" />
    <CategoryCards />
    <InsightList />
    <GuessYouLike />
  </main>
  <AppFooter />
  <ThumborPanel />
</template>

<script setup>
import AppHeader from './components/AppHeader.vue'
import HeroBanner from './components/HeroBanner.vue'
import IndustryPanel from './components/IndustryPanel.vue'
import ProductGrid from './components/ProductGrid.vue'
import CategoryCards from './components/CategoryCards.vue'
import InsightList from './components/InsightList.vue'
import GuessYouLike from './components/GuessYouLike.vue'
import AppFooter from './components/AppFooter.vue'
import ThumborPanel from './components/ThumborPanel.vue'
import { todayPicks } from './mock/homeData'
</script>
