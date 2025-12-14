import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema(
    {
        seller: { type: Schema.Types.ObjectId, required: true, ref: 'Seller' },
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        offerPrice: { type: Number, required: true },
        image: { type: Array, required: true },
        category: { type: String, required: true },
        gender: { type: String },
        sizes: { type: Array },
        inStock: { type: Boolean, required: true }
    }, { timestamps: true }
)

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
