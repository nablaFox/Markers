import express from 'express'
import gamesRoutes from './games.route.js'

const router = express.Router()

router.use('/games', gamesRoutes)

export default router