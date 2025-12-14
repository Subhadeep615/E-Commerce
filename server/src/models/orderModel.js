import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
        items: [{
            seller: { type: Schema.Types.ObjectId, required: true, ref: 'Seller' },
            product: { type: Schema.Types.ObjectId, required: true, ref: 'Product' },
            size: { type: String, default: "" },
            quantity: { type: Number, required: true },
            status: { type: String, default: 'Order Placed' },
        }],
        amount: { type: Number, required: true },
        address: { type: Schema.Types.ObjectId, required: true, ref: 'Address' },
        paymentType: { type: String, required: true },
        isPaid: { type: Boolean, required: true, default: false }
    }, { timestamps: true }
)

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;