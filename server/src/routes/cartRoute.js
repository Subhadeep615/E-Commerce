import express from "express";
import { authUser } from '../middleware/authMiddleware.js'
import { updateCart } from '../controllers/cartController.js'

const router = express.Router()

// router
router.post('/update', authUser, updateCart)

export default router
