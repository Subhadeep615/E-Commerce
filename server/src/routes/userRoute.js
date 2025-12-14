import express from 'express'
import { authUser } from '../middleware/authMiddleware.js'
import { loginUser, logoutUser, registerUser, profileUser } from "../controllers/userController.js";

const router = express.Router()

// router
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', authUser, profileUser)
router.get('/logout', authUser, logoutUser)

export default router;
