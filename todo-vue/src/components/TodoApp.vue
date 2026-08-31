<script setup>
import { reactive, ref, computed, watch } from 'vue'
import TodoInput from './TodoInput.vue'
import TodoList from './TodoList.vue'
import StatCardList from './StatCardList.vue'
import { useWindowSize } from '../composables/useWindowSize'
import { useRoute, useRouter } from 'vue-router'

const { width, height } = useWindowSize()   // ← 3단계, 바로 이 줄

const route = useRoute()
const router = useRouter()

// 상태 소스: todos는 여러 화면에서 파생되므로 reactive 객체(배열)로 관리
const STORAGE_KEY = 'todo-vue-items'

function loadInitialTodos() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch (e) {
    return []
  }
}

const todos = reactive(loadInitialTodos())

// 필터 상태: 단일 값이므로 ref
// URL에 ?filter=active 같은 값이 있으면 그걸 초기값으로 사용
const initialFilter = ['all', 'active', 'done'].includes(route.query.filter)
    ? route.query.filter
    : 'all'
const filter = ref(initialFilter) // 'all' | 'active' | 'done'

let nextId = todos.length ? Math.max(...todos.map((t) => t.id)) + 1 : 1

function addTodo(text) {
  const trimmed = text.trim()
  if (!trimmed) return
  todos.push({ id: nextId++, text: trimmed, done: false })
}

function toggleTodo(id) {
  const target = todos.find((t) => t.id === id)
  if (target) target.done = !target.done
}

function removeTodo(id) {
  const idx = todos.findIndex((t) => t.id === id)
  if (idx !== -1) todos.splice(idx, 1)
}

function clearCompleted() {
  for (let i = todos.length - 1; i >= 0; i--) {
    if (todos[i].done) todos.splice(i, 1)
  }
}

function resetFilter() {
  filter.value = 'all'
}

// computed: 원본 상태(todos, filter)로부터 파생되는 값 — 별도로 저장하지 않는다
const remainingCount = computed(() => todos.filter((t) => !t.done).length)
const doneCount = computed(() => todos.length - remainingCount.value)

const filteredTodos = computed(() => {
  if (filter.value === 'active') return todos.filter((t) => !t.done)
  if (filter.value === 'done') return todos.filter((t) => t.done)
  return todos
})
const totalCount = computed(() => todos.length)
const doneRate = computed(() =>
    totalCount.value ? Math.round((doneCount.value / totalCount.value) * 100) : 0
)

const kpis = computed(() => [
  { id: 'total', label: '전체', value: totalCount.value, unit: '개' },
  { id: 'remaining', label: '남은 항목', value: remainingCount.value, unit: '개' },
  { id: 'done', label: '완료', value: doneCount.value, unit: '개' },
  { id: 'rate', label: '완료율', value: doneRate.value, unit: '%' },
])

// watch: todos 변경이라는 "부작용(side effect)"을 localStorage 저장에 연결
watch(
  todos,
  (value) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
  },
  { deep: true }
)
function fakeFetchTodos(filterValue, shouldFail = false) {
  const delay = filterValue === 'active' ? 2000 : 300 //진행중만 일부러 느리게
  let timer
  const promise = new Promise((resolve, reject) => {
    timer = setTimeout(() => {
      if (shouldFail) {
        reject(new Error('목록을 불러오지 못했습니다.'))
        return
      }
      const result =
          filterValue === 'active' ? todos.filter((t) => !t.done)
              : filterValue === 'done' ? todos.filter((t) => t.done)
                  : todos.slice()
      resolve(result)
    }, delay)
  })
  const cancel = () => clearTimeout(timer)
  return { promise, cancel }
}


const asyncFilteredTodos = ref([])
const isLoading = ref(false)
let requestId = 0

const hasError = ref(false)
const simulateError = ref(false)

function fetchList() {
  const currentId = ++requestId
  isLoading.value = true
  hasError.value = false

  const timer = setTimeout(async () => {
    const { promise } = fakeFetchTodos(filter.value, simulateError.value)
    try {
      const result = await promise
      if (currentId === requestId) {
        asyncFilteredTodos.value = result
        isLoading.value = false
      }
    } catch (e) {
      if (currentId === requestId) {
        hasError.value = true
        isLoading.value = false
      }
    }
  }, 300)

  return () => clearTimeout(timer)
}

watch(filter, (newFilter, oldFilter, onCleanup) => {
  const cancel = fetchList()
  onCleanup(cancel)
}, { immediate: true })

watch(filter, (newFilter) => {
  router.replace({ query: { ...route.query, filter: newFilter } })
})

function retry() {
  fetchList()
}

</script>

<template>
  <main class="card">
    <h1>To-Do List</h1>

    <TodoInput @add="addTodo" />

    <p style="font-size:12px;color:#999;">창 크기: {{ width }} x {{ height }}</p>

    <div class="filters">
      <button
        v-for="f in [
          { key: 'all', label: '전체' },
          { key: 'active', label: '진행중' },
          { key: 'done', label: '완료' },
        ]"
        :key="f.key"
        :class="{ active: filter === f.key }"
        @click="filter = f.key"
      >
        {{ f.label }}
      </button>
    </div>

    <label style="font-size:12px;color:#999;">
        <input type="checkbox" v-model="simulateError" /> 에러 시뮬레이션
      </label>

      <p v-if="isLoading">불러오는 중...</p>
      <div v-else-if="hasError" class="error-box">
        <p>목록을 불러오지 못했습니다.</p>
        <button @click="retry">다시 시도</button>
      </div>
    <TodoList

          v-else
          :todos="asyncFilteredTodos"
          @toggle="toggleTodo"
          @remove="removeTodo"
      >
        <template #empty>
          <p>조건에 맞는 항목이 없어요 🔍</p>
        </template>
      </TodoList>
  </main>
</template>


<style scoped>
.card {
  width: 100%;
  max-width: 480px;
  background: #fff;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

h1 {
  margin: 0 0 20px;
  font-size: 22px;
}

.filters {
  display: flex;
  gap: 8px;
  margin: 16px 0;
}

.filters button {
  flex: 1;
  padding: 8px 0;
  border: 1px solid #ddd;
  background: #fafafa;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
}

.filters button.active {
  background: #4f46e5;
  border-color: #4f46e5;
  color: #fff;
}

.summary {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: #666;
}

.clear-btn {
  border: none;
  background: none;
  color: #4f46e5;
  cursor: pointer;
  font-size: 13px;
}

.clear-btn:disabled {
  color: #bbb;
  cursor: not-allowed;
}
</style>
