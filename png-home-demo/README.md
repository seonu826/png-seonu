# png-home-demo · 首页仿制 + Thumbor 图片裁剪压缩

普恩志 PC 首页的**仿制页面**（参考主流电商首页的简洁布局）（独立项目，不属于公司仓库，不提交到 gitee）。
页面里所有远程图片都统一经过 **Thumbor** 按「图片位显示宽度 × 2」裁剪压缩。

## 실행 / 运行
```bash
cd ~/devel/png-home-demo
npm install        # 처음 한 번만
npm run dev        # http://localhost:5180 자동으로 열림
```

## 구조 / 目录
| 경로 | 역할 |
| --- | --- |
| `src/utils/config.js` | Thumbor 주소 (테스트/운영을 주석으로 전환) |
| `src/utils/thumbor.js` | 공통 함수 `thumb(src, w, h)` → `{thumbor}/unsafe/{w}x{h}/{원본 전체 주소}` |
| `src/utils/imageSize.js` | 이미지 자리별 표시 너비(`SLOT`)와 목표 너비 계산(`× DPR 2`, 최대 1920) |
| `src/components/ThumbImg.vue` | 공통 이미지 컴포넌트. 모든 이미지가 이걸 통해 Thumbor 주소로 바뀜 |
| `src/components/*.vue` | 헤더, 배너, 기능·광고, 상품, 产业板块 카드, 업계 인사이트, 추천 상품, 푸터 |
| `src/components/ThumborPanel.vue` | 오른쪽 아래 「Thumbor 检查」 버튼: `/unsafe/` 적용 개수·원본 직출·전송 용량 확인 |
| `src/mock/homeData.js` | 화면에 쓰는 데이터 정리 (백엔드 호출 없음) |
| `src/mock/home-real.json` | 회사 첫 화면 실제 이미지·데이터 스냅샷 |

## 이미지 데이터 / 图片数据
`src/mock/home-real.json` = 회사 첫 화면 API(로컬 백엔드·테스트 DB) 응답에서 뽑은 **실제 첫 화면 이미지 40장**
(배너 6, 기능 아이콘 4, 통栏 광고 1, 소형 광고 4, 产业板块 8, 今日精选 10, 行业洞察 3, 为你推荐 10 등)
- 테스트 데이터의 무의미한 제목(测试, 1111 등)은 예시 제목으로 바꿨고, 이미지는 원본 그대로예요.
- GIF 1장(Thumbor 제외 대상)과 깨진 주소 1개는 같은 구역의 다른 실제 이미지로 대체했어요.

## 이미지 크기 규칙 / 尺寸规则
| 자리 | 표시 너비 | Thumbor 요청 |
| --- | ---: | ---: |
| 메인 배너 / 통栏 광고 | 1210px | 1920 (최대값) |
| 배너 아래 썸네일 (6개) | 196px | 400 |
| 기능 아이콘 | 40px | 80 |
| 소형 광고 / 产业板块 카드 | 290px | 580 |
| 상품 카드 (5열, 정사각형) | 228×228px | 460x460 (Thumbor가 정사각형으로 잘라서 꽉 채움) |
| 업계 인사이트 큰 이미지 | 600px | 1200 |
| 업계 인사이트 작은 이미지 | 120px | 240 |

배치를 바꾸면 `src/utils/imageSize.js`의 `SLOT` 숫자만 고치면 돼요.

## 실제 첫 화면과 나란히 비교 / 对比
1. 회사 PC 프로젝트(`~/devel/global-png/png-web-pc`)를 `npm run serve`로 실행해요 (8080 또는 8081).
2. 이 프로젝트에서 `npm run compare`를 실행하면 `http://localhost:5180/compare.html`이 열려요.
3. 왼쪽은 실제 첫 화면, 오른쪽은 새로 만든 페이지예요. 주소가 다르면 위 입력칸을 고치고 「打开」을 눌러요.
