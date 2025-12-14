import express from "express";
import { authUser } from '../middleware/authMiddleware.js'
import { authSeller } from '../middleware/authSellerMiddleware.js'
import { placeOrderCOD, placeOrderOnline, getUserOrder, getSellerOrder } from '../controllers/orderController.js'

const router = express.Router()

// router
router.post('/cod', authUser, placeOrderCOD)
router.post('/online', authUser, placeOrderOnline)
router.get('/user', authUser, getUserOrder)
router.get('/seller', authSeller, getSellerOrder)

export default router
