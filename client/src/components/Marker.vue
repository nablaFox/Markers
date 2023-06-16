<script setup>
defineProps(['color', 'selected'])
defineEmits(['select', 'remove'])
</script>

<template>
  <button
    v-if="color"
    class="w-[90%] rounded h-[35px] marker"
    :style="{ backgroundColor: color }" 
    :class="{ selected }"
    @click="selected ? $emit('remove') : $emit('select')"
  />
</template>

<style scoped>
.marker {
  transition: width 0.2s ease;
}

.marker.selected {
  width: 100%;
}
</style>
