import { Game } from './game.js'

const players = []
const games = {}

games.push = (game) => games[id] = game.id

export const search = (socket, player) => {
  players.push(player)

  if (players.length === 2) { 
    checkForMatch(socket, players)
  }
}

const checkForMatch = (socket, players) => {
  const game = new Game(players)
  games.push(game)

  let turn = true
  players.forEach(player => {
    socket.to(player).emit('game:start', {
      game: game.id,
      turn
    })

    turn = !turn
  })

  players.splice(-2)
}

export const leave = (player) => {
  players.splice(players.indexOf(player), 1)
}

export const move = ({ gameId, indexes, player }, socket) => {
  const game = games[gameId]
  const { players } = game

  // check if there is a winner
  const winner = game.calculateWinner(player)

  if (winner) {
    players.forEach(player => {
      socket.to(player).emit('game:winner', {
        winner
      })
    })

    return endGame(gameId, players)
  }

  game.move(indexes)
}

const endGame = (gameId, _players) => {
  delete games[gameId]
  _players.forEach(player => {
    players.splice(players.indexOf(player), 1)
  })  
}