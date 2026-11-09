<template>
  <section class="wrap block">
    <div class="block__head"><h3>行业洞察</h3><span>掌握前沿技术动态</span><a href="javascript:;">更多 ›</a></div>
    <div class="insight">
      <a class="insight__main" href="javascript:;">
        <ThumbImg :src="main.img" :display="SLOT.insightMain" :alt="main.title" />
        <div class="insight__cap"><small>{{ main.tag }}<template v-if="main.date"> · {{ main.date }}</template></small><b>{{ main.title }}</b></div>
      </a>
      <ul class="insight__list">
        <li v-for="a in rest" :key="a.title">
          <div class="insight__thumb"><ThumbImg :src="a.img" :display="SLOT.insightSmall" :alt="a.tag" /></div>
          <div><small>{{ a.tag }}<template v-if="a.date"> · {{ a.date }}</template></small><b>{{ a.title }}</b></div>
        </li>
      </ul>
    </div>
  </section>
</template>
<script setup>
import ThumbImg from './ThumbImg.vue'
import { insights } from '@/mock/homeData'
import { SLOT } from '@/utils/imageSize'
const [main, ...rest] = insights
</script>
<style scoped>
.block { margin-top: 44px; }
.block__head { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
.block__head h3 { margin: 0; font-size: 22px; color: #111827; }
.block__head span { color: #9ca3af; font-size: 13px; }
.block__head a { margin-left: auto; color: #6b7280; font-size: 13px; text-decoration: none; }
.insight { display: grid; grid-template-columns: 600px 1fr; gap: 24px; }
.insight__main { position: relative; height: 300px; border-radius: 14px; overflow: hidden; display: block; }
.insight__cap { position: absolute; inset: auto 0 0 0; padding: 48px 22px 18px; color: #fff; background: linear-gradient(transparent, rgba(0,0,0,.7)); }
.insight__cap b { display: block; font-size: 20px; margin-top: 4px; }
.insight__list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; }
.insight__list li { display: grid; grid-template-columns: 120px 1fr; gap: 16px; padding: 14px 0; border-bottom: 1px solid #f0f1f3; cursor: pointer; }
.insight__list li:first-child { padding-top: 0; }
.insight__thumb { height: 80px; border-radius: 10px; overflow: hidden; }
.insight__list small { color: #9ca3af; font-size: 12px; }
.insight__list b { display: block; margin-top: 6px; font-size: 15px; color: #111827; font-weight: 500; }
.insight__list li:hover b { color: #2f7cf6; }
</style>
