/**
 * 根据「图片位实际显示宽度」计算 Thumbor 目标宽度
 * 目标宽度 = 显示宽度 × 像素倍率(DPR)，向上取整到 10，最大 1920
 * 规则来自首页复验报告：小图不要用整行宽度，大图不要小于显示宽度
 */
export const DPR = 2
export const MAX_WIDTH = 1920

export function targetWidth (displayPx, dpr = DPR) {
  return Math.min(MAX_WIDTH, Math.ceil((displayPx * dpr) / 10) * 10)
}

/** 每个图片位的显示宽度（px）——改版式时只改这里 */
export const SLOT = {
  heroBanner: 1210,   // 首页大轮播
  heroThumb: 196,     // 轮播下方缩略图（6 等分）
  featureIcon: 40,    // 功能入口图标
  wideAd: 1210,       // 通栏广告
  adSmall: 290,       // 四宫格小广告
  industryCard: 290,  // 产业板块卡片（4 列）
  productCard: 228,   // 商品卡片（5 列，正方形 228×228 → Thumbor 460x460 裁剪）
  insightMain: 600,   // 行业洞察大图
  insightSmall: 120   // 行业洞察小图
}
