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
  <div>
    <template v-if="!searching">
      <button @click="$emit('search', username)"> 
        Search Game
      </button>

      <div>
        <label> Your Username </label>
        <input type="text" v-model="username" />
      </div>
    </template>

    <div v-else>
      Searching...
    </div>
  </div>
</template>