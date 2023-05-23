import { v4 as uuidv4 } from 'uuid'

export class Game {
  constructor(players) {
    this.players = players
    this.markers = Array(11).fill(true)
    this.id = uuidv4()
  }

  move(indexes) {
    indexes.forEach(index => {
      this.markers[index] = null
    })
  }

  calculateWinner(player) {
    // lose who take the last marker
    if (this.markers.every(marker => marker === null)) {
      return this.players.find(_player => _player !== player)
    }
  }
}
