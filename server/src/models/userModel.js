import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        cartItems: { type: Object, default: {} },
        role: { type: String, enum: ['User', 'Seller'], default: 'User' }
    }, { minimize: false }
)

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
