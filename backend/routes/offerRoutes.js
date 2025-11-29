import express from 'express';
import { createOffers, getAllOffers } from '../controllers/offerController';

const offerRouter = express.json();

offerRouter.post('/createOffer', createOffers)
offerRouter.get('/offers', getAllOffers);