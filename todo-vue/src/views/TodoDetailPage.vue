<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const todo = ref(null)
const notFound = ref(false)

onMounted(() => {
  const saved = localStorage.getItem('todo-vue-items')
  const todos = saved ? JSON.parse(saved) : []
  const found = todos.find((t) => String(t.id) === route.params.id)
  if (found) {
    todo.value = found
  } else {
    notFound.value = true
  }
})
</script>

<template>
  <main class="card">
    <router-link to="/">← 목록으로</router-link>
    <div v-if="notFound">
      <p>해당 항목을 찾을 수 없어요.</p>
    </div>
    <div v-else-if="todo">
      <h1>{{ todo.text }}</h1>
      <p>{{ todo.done ? '완료됨' : '진행중' }}</p>
    </div>
    <p v-else>불러오는 중...</p>
  </main>
</template>


<style scoped>

</style>