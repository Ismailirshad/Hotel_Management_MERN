import express from 'express';
import { protectRoute, superAdminRoute } from '../../middleware/authMiddleware.js';
import { superAdminAccountingExpense, superAdminAccountingSummary, superAdminAddExpense, superAdminAllBookings, superAdminAllHotels, superAdminAllRooms, superAdminDashBoard, superAdminResolveSupportRequestse, superAdminSupportRequests, superAdminToggleHotel } from '../../controllers/superAdmin/superAdminController.js';

const superAdminRouter = express.Router()

superAdminRouter.get('/',protectRoute, superAdminRoute, superAdminDashBoard )
superAdminRouter.get('/allRooms', protectRoute, superAdminRoute, superAdminAllRooms)
superAdminRouter.get('/allHotels', protectRoute, superAdminRoute, superAdminAllHotels)
superAdminRouter.get('/all-bookings', protectRoute, superAdminRoute, superAdminAllBookings)
superAdminRouter.get('/accounting-summary', protectRoute, superAdminRoute, superAdminAccountingSummary ) 
superAdminRouter.get('/accounting-expense', protectRoute, superAdminRoute, superAdminAccountingExpense ) 
superAdminRouter.post('/addExpense', protectRoute, superAdminRoute, superAdminAddExpense ) 
superAdminRouter.get('/support-requests', protectRoute, superAdminRoute, superAdminSupportRequests )
superAdminRouter.post('/resolve-request/:id', protectRoute, superAdminRoute, superAdminResolveSupportRequestse )
superAdminRouter.patch('/toggleHotel/:hotelId', protectRoute, superAdminRoute, superAdminToggleHotel)

export default superAdminRouter;