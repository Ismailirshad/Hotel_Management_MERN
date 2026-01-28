import express from 'express'
import {fetchAllRooms, fetchFeaturedRooms, fetchRoom} from '../../controllers/user/roomController.js'
const roomRouter = express.Router()

roomRouter.get('/rooms', fetchAllRooms)
roomRouter.get('/featuredRooms/:id', fetchFeaturedRooms)
roomRouter.get('/:id', fetchRoom)

export default roomRouter;