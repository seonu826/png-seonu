<script setup>
// todo: { id, text, done } — 부모가 소유한 데이터를 읽기 전용 props로만 받는다
defineProps({
  todo: {
    type: Object,
    required: true,
  },
})

defineEmits(['toggle', 'remove'])
</script>

<template>
  <li class="item">
    <label>
      <input
        type="checkbox"
        :checked="todo.done"
        @change="$emit('toggle', todo.id)"
      />
      <span :class="{ done: todo.done }">{{ todo.text }}</span>
    </label>
    <router-link :to="`/todos/${todo.id}`" class="detail-link">상세</router-link>
    <button class="remove-btn" @click="$emit('remove', todo.id)">삭제</button>
  </li>
</template>

<style scoped>
.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px;
  border-radius: 8px;
  background: #fafafa;
}

label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.done {
  text-decoration: line-through;
  color: #aaa;
}

.remove-btn {
  border: none;
  background: none;
  color: #d33;
  cursor: pointer;
  font-size: 13px;
}

.detail-link {
  font-size: 13px;
  color: #4f46e5;
  text-decoration: none;
  margin-right: 8px;
}
</style>
