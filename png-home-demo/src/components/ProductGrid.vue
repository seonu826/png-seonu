<!-- 通用商品区块：标题 + (可选)分类标签 + 5 列商品卡片 -->
<template>
  <section class="wrap block">
    <div class="block__head">
      <h3>{{ title }}</h3>
      <span v-if="sub">{{ sub }}</span>
      <div v-if="tabs.length" class="tabs">
        <button v-for="(t, i) in tabs" :key="t" :class="{ on: i === active }" @click="active = i">{{ t }}</button>
      </div>
      <a href="javascript:;">更多 ›</a>
    </div>
    <div class="grid">
      <a v-for="(p, i) in list" :key="p.name + i" href="javascript:;" class="card">
        <div class="card__img"><ThumbImg :src="p.img" :display="SLOT.productCard" :display-h="SLOT.productCard" :alt="p.name" /></div>
        <div class="card__body">
          <p class="card__name">{{ p.name }}</p>
          <p class="card__price">
            <template v-if="p.price"><b>¥{{ p.price.toLocaleString() }}</b> / {{ p.unit || '个' }}</template>
            <b v-else class="ask">询价</b>
          </p>
          <p v-if="p.tag" class="card__tag">{{ p.tag }}</p>
        </div>
      </a>
    </div>
  </section>
</template>
<script setup>
import { computed, ref } from 'vue'
import ThumbImg from './ThumbImg.vue'
import { SLOT } from '@/utils/imageSize'

const props = defineProps({
  title: String,
  sub: String,
  items: { type: Array, default: () => [] },      // 无标签时的商品
  tabs: { type: Array, default: () => [] },       // 标签名
  groups: { type: Array, default: () => [] }      // 每个标签对应的商品
})
const active = ref(0)
const list = computed(() => (props.tabs.length ? props.groups[active.value] || [] : props.items))
</script>
<style scoped>
.block { margin-top: 44px; }
.block__head { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
.block__head h3 { margin: 0; font-size: 22px; color: #111827; letter-spacing: -.3px; }
.block__head > span { color: #9ca3af; font-size: 13px; }
.block__head > a { margin-left: auto; color: #6b7280; font-size: 13px; text-decoration: none; }
.tabs { display: flex; gap: 6px; margin-left: 12px; }
.tabs button { border: 1px solid #e5e7eb; background: #fff; border-radius: 16px; padding: 5px 14px; font-size: 13px; color: #374151; cursor: pointer; }
.tabs button.on { background: #2f7cf6; border-color: #2f7cf6; color: #fff; }
.grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; }
.card { text-decoration: none; color: inherit; }
.card__img { height: 228px; border: 1px solid #f0f1f3; border-radius: 12px; overflow: hidden; background: #fff; }
.card { min-width: 0; }
.card:hover .card__name { text-decoration: underline; }
.card__body p { margin: 0; }
.card__name { margin-top: 10px !important; font-size: 14px; color: #111827; line-height: 1.4; height: 40px; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
.card__price { margin-top: 6px !important; color: #6b7280; font-size: 12px; }
.card__price b { color: #e11d48; font-size: 18px; }
.card__tag { display: inline-block; margin-top: 6px !important; font-size: 11px; color: #2f7cf6; background: #eef4ff; border-radius: 3px; padding: 2px 6px; }
.card__price b.ask { font-size: 16px; }
</style>
