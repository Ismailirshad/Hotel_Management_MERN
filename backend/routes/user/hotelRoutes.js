import express from 'express';
import { featuredHotels, fetchAllHotels, getHotel, getHotelWithRooms, submitRating } from '../../controllers/user/hotelController.js';
import { protectRoute } from '../../middleware/authMiddleware.js';

const hotelRouter = express.Router();

hotelRouter.get('/allHotels', fetchAllHotels)
hotelRouter.get('/featuredHotels', featuredHotels)
hotelRouter.get('/:id', getHotel )
hotelRouter.get('/hotel/:id', getHotelWithRooms )
hotelRouter.patch('/rating/:bookingId', protectRoute, submitRating)

export default hotelRouter;