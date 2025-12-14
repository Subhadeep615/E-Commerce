import express from 'express'
import { upload } from "../middleware/multerMiddleware.js";
import { authUser } from '../middleware/authMiddleware.js'
import { authSeller } from '../middleware/authSellerMiddleware.js'
import { registerSeller, profileSeller } from '../controllers/sellerController.js'

const router = express.Router()

// router
router.post('/register', authUser, upload.single("shopLogo"), registerSeller)
router.get('/profile', authSeller, profileSeller)

export default router;
