<script setup>
import TodoItem from './TodoItem.vue'

// props는 읽기 전용 — 이 컴포넌트는 todos를 직접 수정하지 않고 이벤트만 올려보낸다
defineProps({
  todos: {
    type: Array,
    required: true,
  },
})

defineEmits(['toggle', 'remove'])
</script>

<template>
  <ul v-if="todos.length" class="list">
    <TodoItem
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      @toggle="$emit('toggle', $event)"
      @remove="$emit('remove', $event)"
    />
  </ul>
  <p v-else class="empty">표시할 항목이 없습니다.</p>
</template>

<style scoped>
.list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.empty {
  text-align: center;
  color: #999;
  font-size: 13px;
  padding: 24px 0;
}
</style>
