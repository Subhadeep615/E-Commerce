import express from 'express'
import { authAdmin } from '../middleware/authAdminMiddleware.js'
import { loginAdmin, currentAdmin, logoutAdmin, listSeller, approveSeller, rejectSeller, blockedSeller } from '../controllers/adminController.js'

const router = express.Router()

// router
router.post('/login', loginAdmin)
router.get('/current-admin', authAdmin, currentAdmin)
router.get('/logout', authAdmin, logoutAdmin)

router.get('/list-seller', authAdmin, listSeller)
router.post('/approve-seller', authAdmin, approveSeller)
router.post('/reject-seller', authAdmin, rejectSeller)
router.post('/blocked-seller', authAdmin, blockedSeller)


export default router;

