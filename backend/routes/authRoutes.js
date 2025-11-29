import express from 'express'
import { getProfile, login, logout, signup } from '../controllers/authController.js';
import { protectRoute } from '../middleware/authMiddleware.js';

const authRouter = express.Router()

authRouter.post('/signup', signup)
authRouter.post('/login', login)
authRouter.post('logout', logout)
authRouter.get('/profile', protectRoute, getProfile)

export default authRouter;