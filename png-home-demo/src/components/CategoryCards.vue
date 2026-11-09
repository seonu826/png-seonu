<!-- 产业板块：4 列图片卡片（图片来自公司首页 adv_34） -->
<template>
  <section class="wrap block">
    <div class="block__head"><h3>产业板块</h3><span>四大产业方向，覆盖全链条供应分类</span><a href="javascript:;">更多 ›</a></div>
    <div class="cards">
      <a v-for="c in industries" :key="c.title + c.img" href="javascript:;" class="cardx">
        <ThumbImg :src="c.img" :display="SLOT.industryCard" :alt="c.title" fit="auto" />
        <div class="cardx__mask"><b>{{ c.title }}</b><small>{{ c.sub }}</small></div>
      </a>
    </div>
  </section>
</template>
<script setup>
import ThumbImg from './ThumbImg.vue'
import { industries } from '@/mock/homeData'
import { SLOT } from '@/utils/imageSize'
</script>
<style scoped>
.block { margin-top: 44px; }
.block__head { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
.block__head h3 { margin: 0; font-size: 22px; color: #111827; }
.block__head span { color: #9ca3af; font-size: 13px; }
.block__head a { margin-left: auto; color: #6b7280; font-size: 13px; text-decoration: none; }
.cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.cardx { position: relative; height: 180px; border-radius: 14px; overflow: hidden; display: block; }
.cardx__mask { position: absolute; inset: auto 0 0 0; padding: 36px 16px 14px; color: #fff; background: linear-gradient(transparent, rgba(0,0,0,.6)); }
.cardx__mask b { display: block; font-size: 17px; }
.cardx__mask small { opacity: .85; font-size: 12px; }
.cardx:hover :deep(img) { transform: scale(1.04); }
.cardx :deep(img) { transition: transform .3s; }
</style>
