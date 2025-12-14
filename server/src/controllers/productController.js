import { asyncHandler } from '../utils/asyncHandler.js';
import Product from '../models/productModel.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

// Function for add products
const addProduct = asyncHandler(async (req, res) => {

    // get product details from frontend
    const { name, description, price, offerPrice, category, gender, sizes, inStock } = req.body;
    const seller = req.seller

    //check product details not empty
    if (!name || !description || !price || !offerPrice || !category) {
        return res.status(400).json({ success: false, message: "All product details are required" })
    }

    // multer stores files under req.files with arrays for each field
    const image1 = req.files?.image1?.[0]?.path;
    const image2 = req.files?.image2?.[0]?.path;
    const image3 = req.files?.image3?.[0]?.path;
    const image4 = req.files?.image4?.[0]?.path;

    // check at least one image is uploaded
    if (!image1 && !image2 && !image3 && !image4) {
        return res.status(400).json({ success: false, message: "At least one product image is required" })
    }

    // create array of images
    const images = [image1, image2, image3, image4].filter((img) => img !== undefined)

    // upcload images to cloudinary
    const imageUrl = await Promise.all(
        images.map(async (img) => {
            const result = await uploadOnCloudinary(img);
            return result
        })
    )

    // create new product in database
    const newProduct = await Product.create({
        seller,
        name,
        description,
        price: Number(price),
        offerPrice: Number(offerPrice),
        category,
        gender,
        sizes: sizes ? JSON.parse(sizes) : [],
        inStock: inStock === "true" ? true : false,
        image: imageUrl
    })

    // check for product creation
    const createdProduct = await Product.findById(newProduct._id)
    if (!createdProduct) {
        return res.status(500).json({ success: false, message: "Product creation failed, please try again" })
    }

    // send response to frontend
    return res.status(201).json({
        success: true,
        data: createdProduct,
        message: "Product Added"
    })

})


// Function for list Product : /api/product/list
const listProduct = asyncHandler(async (req, res) => {

    // fetch all products from database with seller details
    const products = await Product.find({}).populate("seller", "shopName status")

    // send response to fontend
    return res.status(200).json({
        success: true,
        data: products,
        message: "Product list fetched"
    })

})


// Function for inStock Product : /api/product/stock
const changeStock = asyncHandler(async (req, res) => {

    //get product id or inStock from frontend
    const { productId, inStock } = req.body
    const seller = req.seller

    // check product id not empty
    if (!productId) {
        return res.status(400).json({ success: false, message: "Product ID is required" })
    }

    // Find the product and verify seller ownership
    const product = await Product.findById(productId);
    if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Verify the seller owns this product
    if (product.seller.toString() !== seller._id.toString()) {
        return res.status(403).json({ success: false, message: "Unauthorized: You can only update your own products" });
    }

    // update product stock in database
    await Product.findByIdAndUpdate(productId, { inStock })

    // send response to frontend
    return res.status(200).json({
        success: true,
        message: "Product Stock Updated"
    })

})


export {
    addProduct, listProduct, changeStock
}
