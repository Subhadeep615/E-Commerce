import mongoose, { Schema } from "mongoose";

const sellerSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
        shopName: { type: String, required: true, unique: true },
        shopLogo: { type: String, required: true, default: "" },
        shopDescription: { type: String, required: true },
        address: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            zipcode: { type: Number, required: true },
            country: { type: String, required: true },
            phone: { type: Number, required: true }
        },
        isApproved: { type: Boolean, default: false },
        status: { type: String, enum: ['Active', 'Pending', 'Blocked'], default: 'Pending' }
    }, { timestamps: true }
)

const Seller = mongoose.models.Seller || mongoose.model("Seller", sellerSchema);
export default Seller;
