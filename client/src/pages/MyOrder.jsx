import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axios from 'axios'

const MyOrder = () => {

    const { currency } = useContext(ShopContext)
    const [myOrders, setMyOrders] = useState([])

    const fetchMyOrder = async () => {
        try {
            const response = await axios.get("/api/order/user")
            if (response?.data?.success) {
                setMyOrders(response.data.data)
            }
        } catch (error) {
            setMyOrders([])
        }
    }

    useEffect(() => {
        fetchMyOrder()
    }, [])

    return (
        <div className="mt-16 pb-16">
            <div className="text-2xl md:text-3xl mb-10">
                <Title text={"My Orders"} />
            </div>
            {myOrders.map((order, index) => (

                <div key={index} className="border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl">
                    <p className="flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col">
                        <span>OrderId: {order._id}</span>
                        <span>Payment: {order.paymentType}</span>
                        <span>Total Amount: {currency}{order.amount}</span>
                    </p>
                    {order.items.map((item, index) => (
                        <div key={index} className={`relative bg-white text-gray-500/70 ${order.items.length !== index + 1 && "border-b "}border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-4 py-5 md:gap-16 w-full max-w-4xl`}>
                            <div className="flex items-center mb-4 md:mb-0">
                                <div className="bg-primary/10 p-4 rounded-lg">
                                    <img className="w-16 h-16" src={item.product.image[0]} alt="" />
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-base text-gray-600">{item.seller.shopName}</h3>
                                    <h2 className="text-xl font-medium text-gray-800">{item.product.name}</h2>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center md:ml-8 mb-4 md:mb-0">
                                <p>Size: {item.size || "Free Size"}</p>
                                <p>Quantity: {item.quantity || "1"}</p>
                                <p>Status: {item.status}</p>
                                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                            </div>
                            <p className="text-primary text-base font-medium">
                                Amount: {currency}{item.product.offerPrice * item.quantity}
                            </p>
                        </div>
                    ))}
                </div>

            ))}
        </div>
    )
}

export default MyOrder
