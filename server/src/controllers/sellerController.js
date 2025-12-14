import { asyncHandler } from '../utils/asyncHandler.js';
import User from '../models/userModel.js';
import Seller from '../models/sellerModel.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';


// Function for User Register : /api/seller/register
const registerSeller = asyncHandler(async (req, res) => {

    // get details from frontend
    const user = req.user
    let { shopName, shopDescription, address } = req.body

    // check if address in json
    if (typeof address === 'string') {
        try {
            address = JSON.parse(address);
        } catch (err) {
            return res.status(400).json({ success: false, message: 'Invalid address format' });
        }
    }

    //check product details not empty
    if (!shopName || !shopDescription || !address) {
        return res.status(401).json({ success: false, message: "All field are required" })
    }

    // check phone and zipcode length
    if (address.phone.length !== 10) {
        return res.status(400).json({ success: false, message: "Please enter a valid Phone No." })
    }
    if (address.zipcode.length !== 6) {
        return res.status(400).json({ success: false, message: "Please enter a valid ZipCode" })
    }

    // get shoplogo from frontend
    const shopLogo = req.file.path;

    // check image is uploaded
    if (!shopLogo) {
        return res.status(400).json({ success: false, message: "shopLogo is required" })
    }

    // check if seller is already exist
    if (user.role === "Seller") {
        return res.status(401).json({ success: false, message: "Already register as seller" })
    }
    const existedSeller = await Seller.findOne({ shopName })
    if (existedSeller) {
        return res.status(401).json({ success: false, message: "Shop already exist" })
    }

    const shopLogoUrl = await uploadOnCloudinary(shopLogo)

    // create new seller in database
    const newSeller = await Seller.create({
        user: user._id,
        shopName,
        shopLogo: shopLogoUrl,
        shopDescription,
        address,
        isApproved: false,
        status: "Pending",
    })

    //check for seller creation 
    const createdSeller = await Seller.findById(newSeller._id)
    if (!createdSeller) {
        return res.status(500).json({ success: false, message: "User registration failed,please try again" })
    }

    // update user role in database
    await User.findByIdAndUpdate(user._id, { role: 'Seller' })

    // send response to frontend
    return res.status(201).json({
        success: true,
        data: createdSeller,
        message: "Seller registered. Awaiting admin approved"
    })
    
})


// Function for current Seller Detail : /api/seller/profile
const profileSeller = asyncHandler(async (req, res) => {

    //get data from frontend
    const seller = req.seller

    // send response to frontend
    return res.status(200).json({
        success: true,
        data: seller,
        message: "Seller fetched"
    })

})



export { 
    registerSeller, profileSeller 
}
