<script setup>
defineProps(['color', 'selected'])
defineEmits(['select', 'remove'])
</script>

<template>

  <div
    v-if="color"
    :style="{ backgroundColor: color }" 
  >
    Marker

    <button @click="$emit('select')">
      Select
    </button>

    <button v-if="selected" @click="$emit('remove')">
      Remove
    </button>
  </div>

</template>