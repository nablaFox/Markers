import { io } from 'socket.io-client'
import { onBeforeMount } from 'vue'

export const socket = io('https://markers.icedcube.net')

socket.on('session', ({ sessionID, userID }) => {
  socket.auth = { sessionID }
  localStorage.setItem('sessionID', sessionID)
  socket.userID = userID
})

export const socketSetup = () => {
  onBeforeMount(() => {
    const sessionID = localStorage.getItem('sessionID')

    if (sessionID) {
      socket.auth = { sessionID }
      socket.connect()
    }
  })
}