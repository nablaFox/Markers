import { games } from '../models/game.model.js'
import { players } from '../models/players.model.js'

export const move = (socket, player, { gameId, indexes }) => {
  const game = games[gameId]
  const { players } = game

  game.move(indexes)
  players.forEach(_player => {
    socket.to(_player.id).emit('game:move', {
      markers: game.markers,
      from: player
    })
  })

  const winner = game.calculateWinner(player)
  if (winner) {
    players.forEach(player => {
      socket.to(player.id).emit('game:over', {
        winner: winner.username
      })
    })

    return endGame(gameId, players)
  }
}

export const quit = (socket, player, gameId) => {
  const game = games[gameId]
  const { players } = game

  const winner = players.find(_player => _player.id !== player)

  socket.to(winner.id).emit('game:over', {
    winner: winner.username
  })

  endGame(game.id, players)
}

export const getGames = (_, res) => res.json(games)

export const getGame = (req, res) => {
  const { id } = req.params
  try {
    const game = games[id]
    res.json(game)
  } catch(err) {
    res.status(404).json({
      message: 'Game not found'
    })
  }
}

const endGame = (gameId, _players) => {
  delete games[gameId]
  _players.forEach(player => {
    players.splice(players.indexOf(player), 1)
  })  
}