import { asyncHandler } from '../utils/asyncHandler.js';
import User from '../models/userModel.js';
import validator from 'validator';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


// Prevent javascript to access cookie
const option = {
    httpOnly: true,
    secure: true,
    sameSite: "none", 
}


// Generate Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' })
}


// Function for User Register : /api/user/register
const registerUser = asyncHandler(async (req, res) => {

    // get name, email and password from frntend
    const { name, email, password } = req.body

    // check name email and password not empty
    if (!name || !email || !password) {
        return res.status(401).json({ success: false, message: "Name, Email and Password are required" })
    }

    // validating email format and password length
    if (!validator.isEmail(email)) {
        return res.status(400).json({ success: false, message: "Please enter a valid email" })
    }
    if (password.length < 8) {
        return res.status(400).json({ success: false, message: "Please enter a strong password with minimum 8 characters" })
    }

    // find user already exist in database with email
    const existedUser = await User.findOne({ email })
    if (existedUser) {
        return res.status(400).json({ success: false, message: "User already exists, Please try again" })
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    // create new user in database
    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        role: 'User'
    })

    // check for user creation 
    const createdUser = await User.findById(newUser._id).select("-password")
    if (!createdUser) {
        return res.status(500).json({ success: false, message: "User registration failed,please try again" })
    }

    // generate token for user
    const token = generateToken(newUser._id)

    // response to frontend
    return res.status(201).cookie("token", token, option).json({
        success: true,
        data: createdUser,
        message: "User registered"
    })

})


// Function for User Login : /api/user/login
const loginUser = asyncHandler(async (req, res) => {

    // get email and password from frontend
    const { email, password } = req.body;

    // check email and password not empty
    if (!email || !password) {
        return res.status(401).json({ success: false, message: "email and password are required" })
    }

    //find user from database with email
    const user = await User.findOne({ email })

    // if user not found in database
    if (!user) {
        return res.status(404).json({ success: false, message: "User does't exist" })
    }

    // compare password with hashed password in database
    const isPasswordMatched = await bcrypt.compare(password, user.password);

    // if password not matched
    if (!isPasswordMatched) {
        return res.status(401).json({ success: false, message: "Please enter valid password" })
    }

    // get user data without password
    const loggedInUser = await User.findById(user._id).select("-password")

    // generate token for user
    const token = generateToken(user._id)

    // send response to frontend
    return res.status(200).cookie("token", token, option).json({
        success: true,
        data: loggedInUser,
        message: "User Logged In"
    })

})


// Function for current User Detail : /api/user/profile
const profileUser = asyncHandler(async (req, res) => {

    //get data from frontend
    const user = req.user

    // response to frontend
    return res.status(200).json({
        success: true,
        data: user,
        message: "User fetched"
    })

})


// Function for logout user: /api/user/logout
const logoutUser = asyncHandler(async (req, res) => {

    //user logout send to frontend
    return res.status(200).json({
        success: true,
        message: "User Logged Out"
    })

})


export {
    loginUser, logoutUser, registerUser, profileUser,
}
