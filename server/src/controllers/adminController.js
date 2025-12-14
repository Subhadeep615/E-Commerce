import { asyncHandler } from '../utils/asyncHandler.js';
import jwt from 'jsonwebtoken'
import Seller from '../models/sellerModel.js';
import User from '../models/userModel.js';


// Prevent javascript to access cookie
const option = {
    httpOnly: true,
    secure: true,
    sameSite: "none", 
}


// Function for Seller Login : /api/admin/login
const loginAdmin = asyncHandler(async (req, res) => {

    //get email and password from body
    const { email, password } = req.body;

    // check email or password not empty
    if (!email || !password) {
        return res.status(401).json({ success: false, message: "email and password are required" })
    }

    //check seller details are correct
    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
        return res.status(401).json({ success: false, message: "Invalid email or password" })
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '7d' })

    return res.cookie('AdminToken', token, option).status(200).json({
        success: true,
        message: "Admin Logged In"
    })

})


// Function for Seller Details : /api/admin/current-admin
const currentAdmin = asyncHandler(async (req, res) => {

    // response to frontend
    return res.status(200).json({
        success: true,
        message: "Admin Fetched"
    })
    
})


// Function for Seller logout: /api/admin/logout
const logoutAdmin = asyncHandler(async (req, res) => {

    //user logout send to frontend
    return res.clearCookie("AdminToken", option).status(200).json({
        success: true,
        message: "Admin Logged Out"
    })

})


// Function for Seller list: /api/admin/list-seller
const listSeller = asyncHandler(async (req, res) => {

    // fetch all seller from database
    const sellers = await Seller.find({}).populate("user", "name email")

    // send response to fontend
    return res.status(200).json({
        success: true,
        data: sellers,
        message: "Sellers Fetched"
    })

})


// Function for Seller approved: /api/admin/approve-seller
const approveSeller = asyncHandler(async (req, res) => {

    //get sellerId from frontend
    const { sellerId } = req.body

    // check sellerId not empty
    if (!sellerId) {
        return res.status(400).json({ success: false, message: "Seller ID is required" })
    }

    // find seller and update on database
    await Seller.findByIdAndUpdate(sellerId, { isApproved: true, status: "Active" }, { new: true })

    // send response to fontend
    return res.status(200).json({
        success: true,
        message: "Seller Approved"
    })

})


// Function for Seller reject: /api/admin/reject-seller
const rejectSeller = asyncHandler(async (req, res) => {

    // get sellerId from frontend
    const { sellerId } = req.body

    // check sellerId not empty
    if (!sellerId) {
        return res.status(400).json({ success: false, message: "Seller ID is required" })
    }

    // find user id and update role
    const seller = await Seller.findById(sellerId)

    // user id 
    const userId = seller.user

    // update user role in database
    await User.findByIdAndUpdate(userId, { role: 'User' })

    // find seller and update on database
    await Seller.findByIdAndDelete(sellerId)

    // send response to fontend
    return res.status(200).json({
        success: true,
        message: "Seller Rejected"
    }) 

})


// Function for Seller blocked: /api/admin/blocked-seller
const blockedSeller = asyncHandler(async (req, res) => {

    // get sellerId from frontend
    const { sellerId, isBlocked } = req.body

    // check sellerId not empty
    if (!sellerId) {
        return res.status(400).json({ success: false, message: "Seller ID is required" })
    }

    // check isBlocked true or false and update status on database
    if (isBlocked === undefined) {
        return res.status(400).json({ success: false, message: "isBlocked status is required" })
    } else if (isBlocked === true) {

        // block seller
        await Seller.findByIdAndUpdate(sellerId, { status: "Blocked" }, { new: true })
        return res.status(200).json({
            success: true,
            message: "Seller Blocked"
        })

    } else {

        // unblock seller
        await Seller.findByIdAndUpdate(sellerId, { status: "Active" }, { new: true })
        return res.status(200).json({
            success: true,
            message: "Seller Unblocked"
        })

    }

})


export {
    loginAdmin, currentAdmin, logoutAdmin,
    listSeller, approveSeller, rejectSeller, blockedSeller
}