<script setup>
import { ref, watch } from 'vue'
import Marker from './Marker.vue'

const emit = defineEmits(['move', 'newGame', 'quit'])
const props = defineProps(['username', 'opponent', 'turn', 'winner', 'markers'])

const selected = ref([])

const onConfirm = () => {
  selected.value.length > 0
  && props.turn
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

  <div 
    class="flex flex-col gap-10 text-xl md:text-2xl py-10 max-w-[500px] w-full px-10"
    :class="[winner && '!justify-center h-screen']"
  >
    <div class="flex flex-col gap-5">
      <h1 v-if="winner" class="text-4xl md:text-5xl bold"> 
        {{ winner }} wins! 
      </h1>
      <h2 v-else class="font-bold text-3xl"> 
        {{ turn ? 'Your Turn!' : `${opponent}'s Turn` }} 
      </h2>
      <h1 class="font-medium text-2xl"> 
        <span class="bg-red-500 text-white"> {{ username }} </span>
        Vs 
        <span class="bg-blue-600 text-white"> {{ opponent }} </span>
      </h1>

      <button 
        v-if="winner"
        class="border w-full mt-10 mx-auto"
        @click="emit('newGame')"
      >
        New Game
      </button>
    </div>
  
    <div v-if="!winner" class="flex overflow-hidden h-full gap-5 flex-col">
      <Marker 
        v-for="marker, i in markers"
        :color="marker"
        :selected="selected.includes(i)"
        @select="onSelect(i)"
        @remove="onRemove(i)"
      />
    </div>
  
    <div class="flex justify-between pr-10" v-if="!winner">
      <button 
        class="border-b-2 "
        @click="onConfirm" 
      >
        Confirm
      </button>
    
      <button @click="emit('quit')">
        Quit
      </button>
    </div>
  </div>

</template>