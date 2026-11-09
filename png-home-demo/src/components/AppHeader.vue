<template>
  <div class="topbar">
    <div class="wrap topbar__inner">
      <span>欢迎来到 Global PNG 泛半导体 B2B 交易平台</span>
      <div class="topbar__links"><a v-for="l in topLinks" :key="l" href="javascript:;">{{ l }}</a></div>
    </div>
  </div>
  <header class="header">
    <div class="wrap header__inner">
      <div class="logo">
        <span class="logo__mark">G</span>
        <div><b>Global PNG</b><small>泛半导体B2B交易平台</small></div>
      </div>
      <button class="allcat">☰ 全部分类</button>
      <div class="search">
        <select><option v-for="c in categories" :key="c">{{ c }}</option></select>
        <input placeholder="搜索设备 / 材料 / 二手设备" />
        <button aria-label="搜索">🔍</button>
      </div>
      <div class="icons">
        <a href="javascript:;"><span>👤</span>我的</a>
        <a href="javascript:;"><span>🛒</span>购物车</a>
      </div>
    </div>
    <nav class="wrap catnav">
      <a v-for="(c, i) in categories.slice(1)" :key="c" :class="{ on: i === 0 }" href="javascript:;">{{ c }}</a>
    </nav>
  </header>
</template>

<script setup>
import { topLinks, categories } from '@/mock/homeData'
</script>

<style scoped>
.topbar { background: #f7f8fa; border-bottom: 1px solid #eceef1; font-size: 12px; color: #8a8f98; }
.topbar__inner { display: flex; justify-content: space-between; height: 32px; align-items: center; }
.topbar__links { display: flex; gap: 18px; }
.topbar__links a { color: #6b7280; text-decoration: none; }
.header { background: #fff; position: sticky; top: 0; z-index: 10; border-bottom: 1px solid #eceef1; }
.header__inner { display: flex; align-items: center; gap: 20px; height: 84px; }
.logo { display: flex; align-items: center; gap: 10px; }
.logo__mark { width: 40px; height: 40px; border-radius: 50%; background: #2f7cf6; color: #fff; display: grid; place-items: center; font-weight: 800; font-size: 18px; }
.logo b { display: block; font-size: 18px; color: #111827; letter-spacing: -.3px; }
.logo small { color: #9ca3af; font-size: 11px; }
.allcat { border: 0; background: #2f7cf6; color: #fff; height: 44px; padding: 0 16px; border-radius: 8px; font-size: 14px; cursor: pointer; white-space: nowrap; }
.search { flex: 1; display: flex; height: 44px; border: 2px solid #2f7cf6; border-radius: 8px; overflow: hidden; }
.search select { border: 0; border-right: 1px solid #e5e7eb; padding: 0 10px; font-size: 13px; color: #374151; background: #fff; outline: 0; }
.search input { flex: 1; border: 0; outline: 0; padding: 0 14px; font-size: 15px; }
.search button { border: 0; background: #fff; width: 52px; font-size: 18px; cursor: pointer; }
.icons { display: flex; gap: 18px; }
.icons a { display: flex; flex-direction: column; align-items: center; font-size: 12px; color: #374151; text-decoration: none; }
.icons span { font-size: 22px; line-height: 1.2; }
.catnav { display: flex; gap: 28px; height: 42px; align-items: center; font-size: 14px; }
.catnav a { color: #374151; text-decoration: none; height: 100%; display: flex; align-items: center; border-bottom: 2px solid transparent; }
.catnav a.on, .catnav a:hover { color: #2f7cf6; border-color: #2f7cf6; font-weight: 600; }
</style>
