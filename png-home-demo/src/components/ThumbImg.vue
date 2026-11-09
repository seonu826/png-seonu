<!-- 公共图片组件：所有首页图片统一经过 Thumbor 裁剪压缩
     fit="auto"：图片比例和图片位接近 → 铺满(cover)；比例差太多 → 完整显示(contain) + 同图模糊背景填充，不留白也不裁掉内容 -->
<template>
  <div ref="box" class="thumb_img" :class="{ is_fit: mode === 'contain' }">
    <div v-if="url && !failed && mode === 'contain'" class="thumb_img__blur" :style="{ backgroundImage: `url(${url})` }"></div>
    <img
      v-if="url && !failed"
      :src="url"
      :alt="alt"
      :loading="eager ? 'eager' : 'lazy'"
      decoding="async"
      :style="{ objectFit: mode }"
      @load="onLoad"
      @error="failed = true"
    />
    <div v-else class="thumb_img__empty">{{ alt }}</div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { thumb } from '@/utils/thumbor'
import { targetWidth } from '@/utils/imageSize'

const props = defineProps({
  src: { type: String, default: '' },
  display: { type: Number, required: true }, // 图片位显示宽度(px)
  displayH: { type: Number, default: 0 },    // 图片位显示高度(px)，给出时由 Thumbor 直接按宽高裁剪（fit="auto" 时不裁剪）
  alt: { type: String, default: '' },
  fit: { type: String, default: 'cover' },   // cover | contain | auto
  eager: { type: Boolean, default: false },
  smart: { type: Boolean, default: false }   // Thumbor 智能裁剪：按宽高裁剪时围绕主体裁剪
})

const box = ref(null)
const failed = ref(false)
const autoMode = ref('cover')
watch(() => props.src, () => { failed.value = false; autoMode.value = 'cover' })

const mode = computed(() => (props.fit === 'auto' ? autoMode.value : props.fit))
const url = computed(() => thumb(
  props.src,
  targetWidth(props.display),
  props.displayH && props.fit !== 'auto' ? targetWidth(props.displayH) : 0,
  { smart: props.smart }
))

// 比例相差超过 20% 时改为完整显示，避免把图片里的文字/商品裁掉
function onLoad (e) {
  if (props.fit !== 'auto' || !box.value) return
  const img = e.target
  const imgRatio = img.naturalWidth / img.naturalHeight
  const boxRatio = box.value.clientWidth / box.value.clientHeight
  autoMode.value = Math.abs(imgRatio / boxRatio - 1) <= 0.2 ? 'cover' : 'contain'
}
</script>

<style scoped>
.thumb_img { position: relative; width: 100%; height: 100%; overflow: hidden; background: #eef3fa; }
.thumb_img img { position: relative; display: block; width: 100%; height: 100%; }
.thumb_img__blur { position: absolute; inset: -20px; background-size: cover; background-position: center; filter: blur(18px) brightness(.92); transform: scale(1.05); }
.thumb_img__empty {
  position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
  color: #8a9bb3; font-size: 13px; background: linear-gradient(135deg, #e8f0fb, #f6f9fd);
}
</style>
