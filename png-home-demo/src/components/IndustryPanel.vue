<!-- 功能入口 + 通栏广告 + 四宫格小广告（图片均来自公司首页） -->
<template>
  <section class="wrap feats">
    <a v-for="f in features" :key="f.title" href="javascript:;" class="feat">
      <div class="feat__icon"><ThumbImg :src="f.icon" :display="SLOT.featureIcon" :alt="f.title" fit="contain" /></div>
      <div><b>{{ f.title }}</b><small>{{ f.sub }}</small></div>
    </a>
  </section>
  <section class="wrap wide">
    <ThumbImg :src="wideAd.img" :display="SLOT.wideAd" alt="通栏广告" />
  </section>
  <section class="wrap ads">
    <a v-for="a in smallAds" :key="a.img" href="javascript:;" class="ad">
      <ThumbImg :src="a.img" :display="SLOT.adSmall" :alt="a.title" />
    </a>
  </section>
</template>
<script setup>
import ThumbImg from './ThumbImg.vue'
import { features, wideAd, smallAds } from '@/mock/homeData'
import { SLOT } from '@/utils/imageSize'
</script>
<style scoped>
.feats { display: grid; grid-template-columns: repeat(4, 1fr); margin-top: 20px; border: 1px solid #eceef1; border-radius: 14px; }
.feat { display: flex; align-items: center; gap: 14px; padding: 18px 24px; text-decoration: none; color: #111827; }
.feat + .feat { border-left: 1px solid #eceef1; }
.feat__icon { width: 40px; height: 40px; flex: none; border-radius: 10px; overflow: hidden; }
.feat b { display: block; font-size: 15px; }
.feat small { color: #9ca3af; font-size: 12px; }
.feat:hover b { color: #2f7cf6; }
.wide { height: 288px; margin-top: 20px; border-radius: 14px; overflow: hidden; }
.ads { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 16px; }
.ad { height: 134px; border-radius: 14px; overflow: hidden; display: block; transition: transform .2s; }
.ad:hover { transform: translateY(-3px); }
</style>
