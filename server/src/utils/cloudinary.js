import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        // upload to cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            folder: "Project/EcommerceProject"
        });


        // remove file from local uploads folder
        fs.unlinkSync(localFilePath);
        return response?.secure_url || response?.url || null;
    } catch (error) {
        // remove file from local uploads folder
        fs.unlink(localFilePath);
        return null;
    }
};

export { uploadOnCloudinary };
