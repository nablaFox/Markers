<script setup>
import { useGame } from './composables/game'
import { socketSetup } from './utils/socket'
import Game from './components/Game.vue'
import Lobby from './components/Lobby.vue'

socketSetup()

const { 
  move, 
  search,
  quit,
  inGame,
  searching,
  turn,
  winner,
  markers,
  username,
  opponent
} = useGame()

</script>

<template>
  <main>
    <Lobby
      v-if="!inGame"
      :searching="searching"
      @search="search"
    />

    <Game 
      v-else 
      @move="move"
      @newGame="search(username)"
      @quit="quit"
      :turn="turn"
      :winner="winner"
      :markers="markers"
      :username="username"
      :opponent="opponent"
    />

    {{ username }}
    {{ turn }}
    {{ winner }}
  </main>
</template>

<style scoped>
</style>
