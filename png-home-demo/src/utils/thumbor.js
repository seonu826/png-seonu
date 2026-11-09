import { thumborUrl } from './config'

/**
 * 图片转换为 Thumbor 裁剪地址（与公司项目 utils/thumbor.js 相同规则）
 * 格式：{thumbor}/unsafe/{宽}x{高}/{原图完整地址}
 * - 宽或高为 0：按比例缩放，不裁剪
 * - gif / svg / 本地图片 / 非公司图片服务器：返回原图
 * @param {string} src 原图地址
 * @param {number} w 目标宽度（像素）
 * @param {number} h 目标高度（像素）
 * @param {{ smart?: boolean }} opts smart=true 时使用 Thumbor 智能裁剪（围绕画面主体裁剪，而不是简单居中）
 */
export function thumb (src, w = 0, h = 0, opts = {}) {
  if (!src || typeof src !== 'string') return src || ''
  if (!thumborUrl) return src
  if (src.indexOf('/unsafe/') > -1) return src // 已经是裁剪地址，避免重复

  const domain = thumborUrl.replace(/\/unsafe\/?$/, '').replace(/\/+$/, '')
  const base = `${domain}/unsafe/`

  if (/^(data:|blob:|file:)/i.test(src)) return src
  if (/^(\/|\.\/|\.\.\/)/.test(src)) return src

  let origin
  if (/^https?:\/\//.test(src)) {
    if (!/^https?:\/\/(test)?image\.global-png\.com\//.test(src)) return src
    origin = src
  } else {
    origin = `${domain}/${src}`
  }
  if (/\.(gif|svg)($|\?)/i.test(origin)) return origin

  const width = Math.max(0, Math.round(Number(w) || 0))
  const height = Math.max(0, Math.round(Number(h) || 0))
  const smart = opts.smart && width && height ? 'smart/' : ''
  return `${base}${width}x${height}/${smart}${origin}`
}
