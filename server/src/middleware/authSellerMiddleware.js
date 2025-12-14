import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'
import User from "../models/userModel.js";
import Seller from "../models/sellerModel.js"

export const authSeller = asyncHandler(async (req, res, next) => {
    try {

        // get cookies from frontend
        const token = req.cookies?.token;

        // check token is available
        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized request" })
        }

        // decoded token using jwt
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

        // find user on databade
        const user = await User.findById(decodedToken?.id).select("-password")

        // check user exist or not
        if (!user) {
            return res.status(401).json({ success: false, message: "Unauthorized access" })
        }

        // check user role
        if (user.role !== "Seller") {
            return res.status(401).json({ success: false, message: "Unauthorized access" })
        }


        // find seller on database
        const userId = user._id
        const seller = await Seller.findOne({ user: userId })

        // check seller exist or not
        if (!seller) {
            return res.status(401).json({ success: false, message: "Unauthorized access" })
        }

        // details send to next 
        req.user = user;
        req.seller = seller;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: error?.message || "Not Authorized, Invalid Access Token" })
    }
});