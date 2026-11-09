<template>
  <section class="hero wrap">
    <div class="hero__main">
      <div class="hero__track" :style="{ transform: `translateX(-${cur * 100}%)` }">
        <div v-for="(b, i) in banners" :key="i" class="hero__slide">
          <ThumbImg :src="b.img" :display="SLOT.heroBanner" :alt="b.title" :eager="i === 0" />
        </div>
      </div>
      <button class="hero__arrow l" @click="go(-1)">‹</button>
      <button class="hero__arrow r" @click="go(1)">›</button>
      <span class="hero__count">{{ cur + 1 }} / {{ banners.length }}</span>
    </div>
    <div class="hero__thumbs">
      <button v-for="(b, i) in banners" :key="i" :class="{ on: i === cur }" @mouseenter="cur = i">
        <ThumbImg :src="b.img" :display="SLOT.heroThumb" :alt="b.title" />
      </button>
    </div>
  </section>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import ThumbImg from './ThumbImg.vue'
import { banners } from '@/mock/homeData'
import { SLOT } from '@/utils/imageSize'

const cur = ref(0)
const go = (d) => { cur.value = (cur.value + d + banners.length) % banners.length }
let timer = null
onMounted(() => { timer = setInterval(() => go(1), 4500) })
onBeforeUnmount(() => clearInterval(timer))
</script>

<style scoped>
.hero { margin-top: 16px; }
.hero__main { position: relative; height: 380px; overflow: hidden; border-radius: 16px; background: #eef3fa; }
.hero__track { display: flex; height: 100%; transition: transform .5s ease; }
.hero__slide { position: relative; flex: 0 0 100%; height: 100%; }
.hero__text { position: absolute; left: 64px; top: 50%; transform: translateY(-50%); color: #fff; text-shadow: 0 2px 12px rgba(0,0,0,.4); }
.hero__text h2 { font-size: 38px; margin: 0 0 10px; letter-spacing: -.5px; }
.hero__text p { font-size: 17px; margin: 0; }
.hero__arrow { position: absolute; top: 50%; transform: translateY(-50%); width: 40px; height: 64px; border: 0; background: rgba(0,0,0,.25); color: #fff; font-size: 28px; cursor: pointer; opacity: 0; transition: opacity .2s; }
.hero__main:hover .hero__arrow { opacity: 1; }
.hero__arrow.l { left: 0; } .hero__arrow.r { right: 0; }
.hero__count { position: absolute; right: 16px; bottom: 14px; background: rgba(0,0,0,.4); color: #fff; font-size: 12px; padding: 3px 10px; border-radius: 12px; }
.hero__thumbs { display: grid; grid-template-columns: repeat(6, 1fr); gap: 8px; margin-top: 8px; }
.hero__thumbs button { height: 56px; border: 2px solid transparent; padding: 0; border-radius: 10px; overflow: hidden; cursor: pointer; opacity: .6; background: none; }
.hero__thumbs button.on { border-color: #2f7cf6; opacity: 1; }
</style>
