import express from 'express'

const roomRouter = express.json()

roomRouter.get('/rooms', fetchAllRooms)
roomRouter.get('/room/:id', fetchRoom)