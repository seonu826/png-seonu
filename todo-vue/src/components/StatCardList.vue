<script setup>
import StatCard from './StatCard.vue'
defineProps({ kpis: { type: Array, required: true } })
const emit = defineEmits(['select'])
</script>

<template>
  <div class="stat-grid">
    <StatCard v-for="kpi in kpis" :key="kpi.id" :kpi="kpi" @select="emit('select', $event)" />
  </div>
</template>