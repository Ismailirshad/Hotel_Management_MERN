import express from 'express';

const hotelRouter = express.Router();

hotelRouter.get('/allHotels', fetchAllHotels)
hotelRouter.get('/featuredHotels', featuredHotels)
hotelRouter.get('/hotels/:id', getHotel )