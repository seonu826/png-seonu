<!-- 开发自查面板：统计页面图片是否都走 Thumbor（/unsafe/），以及实际传输体积 -->
<template>
  <div class="tp" :class="{ open }">
    <button class="tp__btn" @click="toggle">Thumbor 检查</button>
    <div v-if="open" class="tp__body">
      <p>远程图片 <b>{{ stat.total }}</b> 张 · 含 /unsafe/ <b class="ok">{{ stat.thumbor }}</b> · 原图直出 <b :class="stat.raw ? 'ng' : 'ok'">{{ stat.raw }}</b></p>
      <p>Thumbor 图片传输体积合计：<b>{{ kb(stat.bytes) }}</b></p>
      <ul v-if="stat.rawList.length"><li v-for="u in stat.rawList" :key="u">{{ u }}</li></ul>
      <button class="tp__refresh" @click="collect">刷新</button>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue'
const open = ref(false)
const stat = reactive({ total: 0, thumbor: 0, raw: 0, bytes: 0, rawList: [] })
const kb = (b) => (b / 1024).toFixed(1) + ' KB'
function collect () {
  const imgs = performance.getEntriesByType('resource')
    .filter((e) => /^https?:/.test(e.name) && /\.(png|jpe?g|webp)(\?|$)/i.test(e.name))
  const t = imgs.filter((e) => e.name.includes('/unsafe/'))
  const r = imgs.filter((e) => !e.name.includes('/unsafe/'))
  Object.assign(stat, { total: imgs.length, thumbor: t.length, raw: r.length,
    bytes: t.reduce((s, e) => s + (e.transferSize || e.encodedBodySize || 0), 0),
    rawList: r.map((e) => e.name).slice(0, 10) })
}
function toggle () { open.value = !open.value; if (open.value) collect() }
</script>
<style scoped>
.tp { position: fixed; right: 20px; bottom: 20px; z-index: 50; font-size: 13px; }
.tp__btn { background: #1d2b44; color: #fff; border: 0; border-radius: 20px; padding: 10px 16px; cursor: pointer; box-shadow: 0 6px 18px rgba(0,0,0,.2); }
.tp__body { position: absolute; right: 0; bottom: 48px; width: 340px; background: #fff; border-radius: 12px; padding: 14px 16px; box-shadow: 0 10px 30px rgba(0,0,0,.18); color: #1d2b44; }
.tp__body p { margin: 0 0 8px; }
.tp__body ul { margin: 0 0 8px; padding-left: 16px; max-height: 120px; overflow: auto; word-break: break-all; color: #e8502e; }
.ok { color: #18a058; } .ng { color: #e8502e; }
.tp__refresh { border: 1px solid #2f7cf6; color: #2f7cf6; background: #fff; border-radius: 6px; padding: 4px 12px; cursor: pointer; }
</style>
