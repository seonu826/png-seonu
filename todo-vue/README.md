# Vue 3 To-Do List

Vite + Vue 3(Composition API, `<script setup>`)로 만든 간단한 할 일 목록 앱입니다.

## 구조

```
todo-vue/
├─ index.html          # 진입 HTML
├─ src/
│  ├─ main.js           # 앱 부팅 (createApp)
│  ├─ App.vue            # 루트 컴포넌트
│  └─ components/
│     ├─ TodoApp.vue     # 상태 소유(todos, filter) + computed + watch
│     ├─ TodoInput.vue   # 입력 폼 (emit: add)
│     ├─ TodoList.vue    # 목록 렌더링 (props: todos, v-for/key)
│     └─ TodoItem.vue    # 항목 1개 (props: todo, emit: toggle/remove)
└─ package.json
```

## IntelliJ IDEA에서 열기

1. IntelliJ 실행 → `File > Open` → 압축 해제한 `todo-vue` 폴더 선택
2. 하단 터미널(Terminal) 탭 열기 (`Alt+F12` 또는 View > Tool Windows > Terminal)
3. 아래 명령 순서대로 실행

```bash
npm install
npm run dev
```

4. 터미널에 뜨는 로컬 주소(기본 `http://localhost:5173`)를 Ctrl+클릭하면 브라우저에서 바로 확인 가능

> IntelliJ Ultimate라면 `.vue` 파일에 Vue.js 플러그인(설정 > Plugins > "Vue.js")을 설치해두면 템플릿/스크립트 자동완성이 훨씬 편해집니다.

## 기능

- 할 일 추가 / 완료 토글 / 삭제
- 전체 · 진행중 · 완료 필터
- 완료 항목 일괄 삭제
- 새로고침해도 유지 (localStorage 저장)

## 이번 주 학습 포인트와의 연결

- **ref/reactive**: `filter`는 `ref`(단일 값), `todos`는 `reactive`(배열/객체)
- **computed**: `remainingCount`, `doneCount`, `filteredTodos` — 원본 상태에서 파생되는 값을 중복 저장하지 않음
- **watch**: `todos` 변경을 감시해 `localStorage`에 저장하는 부작용(side effect) 처리
- **props/emits**: `TodoList`·`TodoItem`은 데이터를 props로만 받고, 변경은 emit으로 부모에게 알림 (자식이 직접 수정하지 않음)
- **v-for/key**: 목록 렌더링 시 배열 index가 아닌 항목의 고유 `id`를 key로 사용
