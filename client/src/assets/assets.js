import { CalendarCheck, ListCheck, SquarePlus, Store } from "lucide-react";
import brand_logo from "./images/brand_logo.png";
import hero_img from "./images/hero_img.jpg";
import about_img from "./images/about_img.png";
import contact_img from "./images/contact_img.jpg";
import add_address_image from "./images/add_address_image.jpg";
import box_icon from "./images/box_icon.svg";
import seller_register_image from "./images/seller_register_image.jpg";
import upload_area from './images/upload_area.png';

// category images imports
import home_essentials_image from "./images/home_essentials_image.png";
import clothing_image from "./images/clothing_image.png";
import beauty_image from "./images/beauty_image.png";
import electronics_image from "./images/electronics_image.png";
import stationery_image from "./images/stationery_image.png";
import toys_image from "./images/toys_image.png";
import pet_image from "./images/pet_image.png";

export const assets = {
    brand_logo,
    hero_img,
    about_img,
    contact_img,
    add_address_image,
    box_icon,
    seller_register_image,
    upload_area,
};

// export categories array
export const categories = [
    {
        text: "Home Essentials",
        path: "Home",
        image: home_essentials_image,
        bgColor: "#E6F7FF",
    },
    {
        text: "Clothing & Fashion",
        path: "Clothing",
        image: clothing_image,
        bgColor: "#FFF3E0",
    },
    {
        text: "Beauty & Personal Care",
        path: "Beauty",
        image: beauty_image,
        bgColor: "#FFE6E6",
    },
    {
        text: "Electronics & Gadgets",
        path: "Electronics",
        image: electronics_image,
        bgColor: "#E8F5E9",
    },
    {
        text: "Stationery & Office",
        path: "Stationery",
        image: stationery_image,
        bgColor: "#EDE7F6",
    },
    {
        text: "Toys & Games",
        path: "Toys",
        image: toys_image,
        bgColor: "#FFF9C4",
    },
    {
        text: "Pet Supplies",
        path: "Pet",
        image: pet_image,
        bgColor: "#F0E6FF",
    },
];

// Seller Sidebar Links
export const sidebarLinksSeller = [
    { label: "Add Product", to: "/seller", Icon: SquarePlus },
    { label: "Product List", to: "/seller/product-list", Icon: ListCheck },
    { label: "Orders", to: "/seller/orders", Icon: CalendarCheck },
]

// Admin Sidebar Links
export const sidebarLinksAdmin = [
    { to: "/admin", label: "Store", Icon: Store },
    { to: "/admin/approved-store", label: "Approved Store", Icon: Store },
];
