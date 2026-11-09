/**
 * 首页数据：使用公司首页真实图片（home-real.json）
 * home-real.json = 本地后端（测试库）首页接口响应快照：pcDeco/index、guessYouLike、firstAdv
 * 测试数据中无意义的标题（如“测试”）已替换为示例标题，图片保持原样
 */
import real from './home-real.json'

export const topLinks = ['登录', '免费注册', '供应商入驻', '客服中心']
export const categories = ['全部分类', '半导体', '电池&储能', '光伏', 'FPD', '电子元器件', '二手设备', '耗材备件']

const BANNER_TEXT = [
  ['先进半导体技术与设备', '探索前沿科技 把握行业先机'],
  ['全球资源高效采购平台', '整合国际供应商，跨境物流与支付支持'],
  ['创新之力 驱动未来', '新品专区汇聚顶尖工艺成果'],
  ['国产替代 品质保障', '优质国产器件，快速匹配'],
  ['二手设备 放心采购', '专业检测 · 质保服务'],
  ['样品申请 快速响应', '认证供应商 24 小时内答复']
]
// 真实轮播图本身带文字，这里只保留标题给读屏使用，不再叠加文字
export const banners = real.banners.map((b, i) => ({ img: b.img, title: (BANNER_TEXT[i] || BANNER_TEXT[0])[0] }))
export const features = real.features
export const wideAd = real.wideAd
export const smallAds = real.smallAds
export const industries = real.industries
export const insights = real.insights
export const todayPicks = real.todayPicks
export const guessYouLike = real.guess
