import { v4 as uuidv4 } from 'uuid'

export class Game {
  constructor(players) {
    this.players = players.slice(0)
    this.markers = ['#DC143C', '#7CB9E8', '#39ff14', '#f0e130', '#8a2be2', '#ffbf00', '#fc6c85', 'brown', 'black', '#ff2400', 'grey']
    this.id = uuidv4()
  }

  move(indexes) {
    indexes.forEach(index => {
      this.markers[index] = null
    })
  }

  calculateWinner(player) {
    if (this.markers.every(marker => marker === null)) {
      return this.players.find(_player => _player.id !== player)
    }
  }
}

export const games = {}

games.push = (game) => games[game.id] = game