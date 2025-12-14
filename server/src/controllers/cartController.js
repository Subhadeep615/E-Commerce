import { asyncHandler } from '../utils/asyncHandler.js';
import User from '../models/userModel.js';

// Function for update cart : /api/cart/update
const updateCart = asyncHandler(async (req, res) => {

    //get cardItem from frontend
    const { cartItems } = req.body

    // Update cart item in database
    await User.findByIdAndUpdate(req.user._id, { cartItems })

    // send response to frontend
    return res.status(200).json({
        success: true,
        message: "Cart Updated"
    })
    
})

export { updateCart }
