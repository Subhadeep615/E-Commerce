import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

//Import Routes
import UserRouter from "./routes/userRoute.js";
import AdminRouter from "./routes/adminRoute.js";
import SellerRouter from "./routes/sellerRoute.js";
import ProductRouter from "./routes/productRoute.js";
import CartRouter from "./routes/cartRoute.js";
import AddressRouter from "./routes/addressRoute.js";
import OrderRouter from "./routes/orderRoute.js";
import { StripeWebhooks } from './controllers/orderController.js'

const app = express();

// Stripe Webhoooks
app.post('/stripe', express.raw({ type: 'application/json' }), StripeWebhooks)

//middlewares
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// Route Declaration
app.use("/api/user", UserRouter);
app.use("/api/admin", AdminRouter);
app.use("/api/seller", SellerRouter);
app.use("/api/product", ProductRouter);
app.use("/api/cart", CartRouter);
app.use("/api/address", AddressRouter);
app.use("/api/order", OrderRouter);

export { app };
