import express from 'express'
import { authUser } from '../middleware/authMiddleware.js'
import { addAddress, getAddress } from '../controllers/addressController.js'

const router = express.Router()

//router
router.post('/add', authUser, addAddress)
router.get('/get', authUser, getAddress)


export default router