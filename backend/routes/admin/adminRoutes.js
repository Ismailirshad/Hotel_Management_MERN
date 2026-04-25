import express from 'express';
import { adminRoute, protectRoute } from '../../middleware/authMiddleware.js';
import { AccountingExpense, AccountingSummary, addExpense, allRooms, createOffer, createRoom, dashBoard, fetchOffer, getHotelBookings, getMyHotel, registerHotel,
        toggleRoom } from '../../controllers/admin/adminController.js';

const adminRouter = express.Router()

adminRouter.post('/',protectRoute, registerHotel)
adminRouter.get('/',protectRoute, adminRoute, dashBoard )
adminRouter.post('/createRoom', protectRoute, adminRoute, createRoom)
adminRouter.get('/allRooms', protectRoute, adminRoute, allRooms)
adminRouter.get('/my-hotel', protectRoute, adminRoute, getMyHotel)
adminRouter.post('/createOffer', protectRoute, adminRoute, createOffer)
adminRouter.get('/getOffer', protectRoute, adminRoute, fetchOffer)
adminRouter.get('/all-bookings', protectRoute, adminRoute, getHotelBookings)
adminRouter.get('/accounting-summary', protectRoute, adminRoute, AccountingSummary ) 
adminRouter.get('/accounting-expense', protectRoute, adminRoute, AccountingExpense ) 
adminRouter.post('/addExpense', protectRoute, adminRoute, addExpense ) 
adminRouter.patch('/toggleRoom/:roomId', protectRoute, adminRoute, toggleRoom)

export default adminRouter;