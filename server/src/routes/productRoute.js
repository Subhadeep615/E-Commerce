import { Router } from "express";
import { addProduct, listProduct, changeStock } from "../controllers/productController.js";
import { upload } from "../middleware/multerMiddleware.js";
import { authSeller } from "../middleware/authSellerMiddleware.js"

const router = Router();

//product routes
router.post('/add', authSeller, upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
]), addProduct);
router.get('/list', listProduct)
router.post('/stock', authSeller, changeStock)

export default router;