import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { v4 as uuidv4 } from 'uuid'

import { search, leave } from './controllers/lobby.js'
import { move, quit } from './controllers/game.js'
import routes from './routes/index.js'

const app = express()
  .use(cors())
  .use(bodyParser.json())

const server = createServer(app)
const io = new Server(server, {
  cors: { origin: '*' }
})

app.use('/', routes)

const sessionStore = new Map()

io.use((socket, next) => {
  const sessionID = socket.handshake.auth.sessionID

  if (sessionID) {
    const session = sessionStore.get(sessionID)
    if (session) {
      socket.sessionID = sessionID
      socket.userID = session.userID
      return next()
    }
  }

  socket.sessionID = uuidv4()
  socket.userID = uuidv4()
  next()
})

io.on('connection', (socket) => {
  // lobby
  socket.on('lobby:enter', (username) => search(io, { 
    id: socket.userID,
    username
  }))

  socket.on('lobby:leave', () => leave(io, socket.userID))

  // game
  socket.on('game:move', (playerMove) => move(io, socket.userID, playerMove))
  socket.on('game:quit', (gameId) => quit(io, socket.userID, gameId))

  // session details
  socket.emit('session', {
    sessionID: socket.sessionID,
    userID: socket.userID
  })

  // join the "userID" room
  socket.join(socket.userID)

  // disconnect
  socket.on('disconnect', async () => {
    const matchingSockets = await io.in(socket.userID).fetchSockets()
    const isDisconnected = matchingSockets.length === 0

    if (isDisconnected) {
      socket.broadcast.emit('user:disconnected', socket.userID)

      sessionStore.set(socket.sessionID, {
        userID: socket.userID,
        connected: false
      })
    }
  })
})

server.listen(3000, () => {
  console.log(`Listening on port 3000`)
})