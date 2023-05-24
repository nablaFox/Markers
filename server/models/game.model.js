import { v4 as uuidv4 } from 'uuid'

export class Game {
  constructor(players) {
    this.players = players.slice(0)
    this.markers = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'brown', 'black', 'white', 'grey']
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