import { Game, games } from '../models/game.model.js'
import { players } from '../models/players.model.js'

export const search = (socket, player) => {
  players.push(player)

  // remove the player if appears twice
  if (players.filter(_player => _player.id === player.id).length > 1) {
    players.splice(players.indexOf(player), 1)
  }
  
  if (players.length === 2) { 
    checkForMatch(socket, players)
  }
}

const checkForMatch = (socket, players) => {
  const game = new Game(players)
  games.push(game)

  let turn = true
  players.forEach(player => {
    socket.to(player.id).emit('game:start', {
      ...game,
      turn
    })

    turn = !turn
  })

  players.splice(-2)
}

export const leave = (player) => {
  players.splice(players.indexOf(player), 1)
}