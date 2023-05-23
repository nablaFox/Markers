import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { search, leave, move } from './controller.js'

const app = express().use(cors())
const server = createServer(app)
const io = new Server(server, {
  cors: { origin: '*' }
})

io.on('connection', socket => {
  socket.on('lobby:enter', () => search(io, socket.id))
  socket.on('lobby:leave', () => leave(io, socket.id))

  socket.on('game:move', (playerMove) => move(playerMove, io))
})

server.listen(3000, () => {
  console.log(`Listening on port 3000`)
})