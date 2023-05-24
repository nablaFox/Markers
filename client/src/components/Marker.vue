<script setup>
defineProps(['color', 'selected'])
defineEmits(['select', 'remove'])
</script>

<template>

  <div
    v-if="color"
    class="w-[90%] rounded h-[35px] marker"
    :style="{ backgroundColor: color }" 
    :class="{ selected }"
    @click="selected ? $emit('remove') : $emit('select')"
  >
  </div>

</template>

<style scoped>
/** width transition in the markers */
.marker {
  transition: width 0.2s ease;
}

/** width transition in the markers */
.marker.selected {
  width: 100%;
}
</style>
