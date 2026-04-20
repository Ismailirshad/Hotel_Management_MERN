import express from 'express'
import { protectRoute } from '../../middleware/authMiddleware.js';
import { checkout, getAllBookings, getBookingById, getReviews, isRoomAvailable } from '../../controllers/user/bookingController.js';

const bookingRouter = express.Router();

bookingRouter.get('/my-bookings', protectRoute, getAllBookings)
bookingRouter.get('/reviews', getReviews)
bookingRouter.get('/check/:roomId', protectRoute, isRoomAvailable)
bookingRouter.get('/:bookingId', protectRoute, getBookingById)
bookingRouter.post('/checkout/:roomId', protectRoute, checkout )

export default bookingRouter;