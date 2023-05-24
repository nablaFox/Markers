<script setup>
import { ref, watch } from 'vue'
import Marker from './Marker.vue'

const emit = defineEmits(['move', 'newGame', 'quit'])
const props = defineProps(['username', 'opponent', 'turn', 'winner', 'username', 'opponent', 'markers'])

const selected = ref([])

const onConfirm = () => {
  selected.value.length > 0
  && emit('move', selected.value)
}

const onSelect = (i) => {
  !selected.value.includes(i)
  && selected.value.length < 3
  && selected.value.push(i)
}

const onRemove = (i) => {
  const index = selected.value.indexOf(i)
  selected.value.splice(index, 1)
}

watch(props, (now) => {
  now.markers && (selected.value.length = 0)
})
</script>

<template>

  <div v-if="winner">
    <h1> {{ winner }} wins! </h1>

    <button @click="$emit('newGame')" v-if="winner">
      Play Again
    </button>
  </div>

  <div v-else>
    <h2> {{ turn ? 'Your Turn' : `${opponent}'s Turn`  }} </h2>
  </div>

  <div>
    <h1> {{ username }} Vs {{ opponent }} </h1>
  </div>

  <div v-if="!winner">
    <Marker 
      v-for="marker, i in markers"
      :color="marker"
      :selected="selected.includes(i)"
      @select="onSelect(i)"
      @remove="onRemove(i)"
    />
  </div>

  <button @click="onConfirm" v-if="turn && !winner">
    Confirm
  </button>

  <button @click="emit('quit')" v-if="!winner">
    Quit
  </button>
</template>