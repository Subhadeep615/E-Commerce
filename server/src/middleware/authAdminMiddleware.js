import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'

export const authAdmin = asyncHandler(async (req, res, next) => {
    try {

        // get cookies from frontend
        const AdminToken = req.cookies?.AdminToken;

        // check token is available
        if (!AdminToken) {
            return res.status(401).json({ success: false, message: "Not Authorized" })
        }

        // decoded token using jwt
        const tokenDecode = jwt.verify(AdminToken, process.env.JWT_SECRET)

        //check admin email is correct or not
        if (tokenDecode.email === process.env.ADMIN_EMAIL) {
            next();
        } else {
            return res.status(401).json({ success: false, message: "Not Authorized, Wrong Access Token" })
        }

    } catch (error) {
        return res.status(401).json({ success: false, message: error?.message || "Not Authorized, Invalid Access Token" })
    }
})
