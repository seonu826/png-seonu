<script setup>
defineProps({ kpi: { type: Object, default: null } })
defineEmits(['select'])
</script>

<template>
  <button
      class="stat-card"
      :class="{ highlight: kpi.unit === '%' && kpi.value >= 80 }"
      @click="$emit('select', kpi.id)"
  >
    <span class="label">{{ kpi.label }}</span>
    <span class="value" v-if="kpi.value !== null && kpi.value !== undefined">
      {{ kpi.value }}{{ kpi.unit }}
    </span>
    <span class="value empty" v-else>-</span>
  </button>
</template>