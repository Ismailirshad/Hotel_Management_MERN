import express from 'express';
import { protectRoute, superAdminRoute } from '../../middleware/authMiddleware.js';
import { superAdminAccountingExpense, superAdminAccountingSummary, superAdminAddExpense, superAdminAllBookings, superAdminAllRooms, superAdminDashBoard } from '../../controllers/superAdmin/superAdminController.js';

const superAdminRouter = express.Router()

superAdminRouter.get('/',protectRoute, superAdminRoute, superAdminDashBoard )
superAdminRouter.get('/allRooms', protectRoute, superAdminRoute, superAdminAllRooms)
// superAdminRouter.patch('/toggleRoom/:roomId', protectRoute, superAdminRoute, toggleRoom)
superAdminRouter.get('/all-bookings', protectRoute, superAdminRoute, superAdminAllBookings)
superAdminRouter.get('/accounting-summary', protectRoute, superAdminRoute, superAdminAccountingSummary ) 
superAdminRouter.get('/accounting-expense', protectRoute, superAdminRoute, superAdminAccountingExpense ) 
superAdminRouter.post('/addExpense', protectRoute, superAdminRoute, superAdminAddExpense ) 

export default superAdminRouter;