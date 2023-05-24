<script setup>
import { ref } from 'vue'

defineProps(['searching'])
defineEmits(['search'])

// a function to generate a random username
const generateUsername = () => {
  const adjectives = ['red', 'green', 'blue', 'yellow', 'purple', 'orange', 'pink', 'black', 'white']
  const nouns = ['cat', 'dog', 'bird', 'fish', 'rabbit', 'turtle', 'hamster', 'snake', 'lizard']
  const random = (arr) => arr[Math.floor(Math.random() * arr.length)]
  return `${random(adjectives)}-${random(nouns)}`
}

const username = ref(generateUsername())
</script>

<template>
  <div class="text-3xl md:text-4xl flex flex-col items-center px-10">
    <template v-if="!searching">

      <div class="w-full">
        <label class="block mb-2 font-bold"> Your Username </label>
        <input
          class="w-full" 
          type="text" 
          v-model="username" 
        />
      </div>

      <button 
        class="border px-5 py-2 mt-10 self-start"
        @click="$emit('search', username); click = true"
      > 
        Search Game
      </button>
    </template>

    <div v-else>
      Searching...
    </div>
  </div>
</template>