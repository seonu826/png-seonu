<script setup>
import { ref } from 'vue'

// 자식 → 부모 통신은 emits로 이벤트를 올려보낸다 (부모가 실제 상태를 소유)
const emit = defineEmits(['add'])

const text = ref('')

function submit() {
  emit('add', text.value)
  text.value = ''
}
</script>

<template>
  <form class="input-row" @submit.prevent="submit">
    <input
      v-model="text"
      type="text"
      placeholder="할 일을 입력하고 Enter"
      maxlength="80"
    />
    <button type="submit">추가</button>
  </form>
</template>

<style scoped>
.input-row {
  display: flex;
  gap: 8px;
}

input {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
}

button {
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  background: #4f46e5;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
}
</style>
