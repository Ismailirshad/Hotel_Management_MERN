import express from 'express'
import { fetchAllOffers } from '../../controllers/user/offerControllers.js';

const offerRouter = express.Router()

offerRouter.get('/', fetchAllOffers);

export default offerRouter;