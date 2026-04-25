import express from 'express'
import { createPayment, verifyPayment } from '../../controllers/user/paymentController.js';
import { protectRoute } from '../../middleware/authMiddleware.js';

const paymentRouter = express.Router();

paymentRouter.post('/create/:bookingId',protectRoute, createPayment )
paymentRouter.post("/verify-payment",protectRoute, verifyPayment);

export default paymentRouter;