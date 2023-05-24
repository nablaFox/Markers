import express from 'express'
import * as controller from '../controllers/game.js'

const router = express.Router()

router
  .route('/')
  .get(controller.getGames)

router
  .route('/:id')
  .get(controller.getGame)

export default router