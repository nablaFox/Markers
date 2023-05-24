import { ref, computed, onBeforeMount } from 'vue'
import { socket } from '../utils/socket'

export const useGame = () => {
  const turn = ref(false)
  const markers = ref([])
  const winner = ref(false)
  const game = ref(null)
  const inGame = computed(() => !!game.value)
  const searching = ref(false)
  const username = ref('')
  const players = ref([])
  const opponent = computed(() => players.value.find(player => player.id !== socket.userID)?.username)

  const setup = (_game) => {
    game.value = _game.id
    markers.value = _game.markers
    players.value = _game.players
    searching.value = false
  }

  onBeforeMount(async () => {
    const gameID = localStorage.getItem('gameID')
    if (gameID) { // retrieve the game
      const response = await fetch(`http://localhost:3000/games/${gameID}`)
      if (!response.ok) { return clean() }
      const game = await response.json()
      console.log('flag', game.value)
      setup(game)
      username.value = localStorage.getItem('username')
      turn.value = localStorage.getItem('turn') === 'true'
      return
    }

    localStorage.removeItem('gameID')
  })

  socket.on('game:start', (game) => {
    setup(game)
    turn.value = game.turn
    localStorage.setItem('gameID', game.gameId)
  })

  socket.on('game:move', (move) => { 
    markers.value = move.markers
    if (move.from !== socket.userID) {
      turn.value = !turn.value
    }
  })

  socket.on('game:over', (game) => (winner.value = game.winner))

  const move = (markers) => {
    turn.value = !turn.value
    socket.emit('game:move', {
      gameId: game.value,
      indexes: markers
    })
  }

  const quit = () => {
    socket.emit('game:quit', game.value)
    cleanGame()
    clean()
  }

  const search = (_username) => {
    cleanGame()
    searching.value = true
    username.value = _username
    socket.emit('lobby:enter', _username)
  }

  const leaveLobby = () => socket.emit('lobby:leave')

  const clean = () => {
    localStorage.removeItem('gameID')
    localStorage.removeItem('username')
    localStorage.removeItem('turn')
  }

  window.addEventListener('beforeunload', () => {
    if (searching.value) { return leaveLobby() }
    if (winner.value || !inGame.value) { return clean() } 
    localStorage.setItem('gameID', game.value)
    localStorage.setItem('username', username.value)
    localStorage.setItem('turn', turn.value)
  })

  const cleanGame = () => {
    game.value = null
    markers.value = []
    winner.value = false
    players.value = []
  }

  return {
    turn,
    winner,
    markers,
    inGame,
    game,
    searching,
    username,
    players,
    opponent,
    move,
    search,
    quit,
    leaveLobby,
    cleanGame
  }
}