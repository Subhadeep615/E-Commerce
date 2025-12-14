import { asyncHandler } from '../utils/asyncHandler.js';
import Address from '../models/addressModel.js';


// Function for User Add address : /api/address/add
const addAddress = asyncHandler(async (req, res) => {

    // get address data from frontend
    const userId = req.user._id
    const { address } = req.body

    // check address are not empty
    if (!address) {
        return res.status(401).json({ success: false, message: "all feild are required" })
    }

    // check phone and zipcode length
    if (address.phone.length !== 10) {
        return res.status(400).json({ success: false, message: "Please enter a valid Phone No." })
    }
    if (address.zipcode.length !== 6) {
        return res.status(400).json({ success: false, message: "Please enter a valid ZipCode" })
    }

    // create user address in database
    const createdAddress = await Address.create({ ...address, userId })

    //send response to frontend
    return res.status(201).json({
        success: true,
        data: createdAddress,
        message: "Address Added"
    })

})


// Function for User Get address : /api/address/get
const getAddress = asyncHandler(async (req, res) => {

    const userId = req.user._id

    //find address from database
    const address = await Address.find({ userId }).sort({ createdAt: -1 })

    //send response to frontend
    return res.status(200).json({
        success: true,
        data: address,
        message: "Address Fetched"
    })

})


export {
    addAddress, getAddress
}
