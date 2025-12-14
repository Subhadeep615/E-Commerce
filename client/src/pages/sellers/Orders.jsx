import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../context/ShopContext';
import { assets } from '../../assets/assets';
import axios from 'axios';

const Orders = () => {

    const { currency } = useContext(ShopContext)
    const [orders, setOrders] = useState([])

    const fetchOrder = async () => {
        try {
            const response = await axios.get('/api/order/seller')
            if (response?.data?.success) {
                setOrders(response.data.data)
                console.log(response.data.data)
            }
        } catch (error) {
            setOrders([])
        }
    }

    useEffect(() => {
        fetchOrder();
    }, [])

    return (
        <div className="flex-1 h-[95vh] overflow-y-scroll">
            <div className="md:p-10 p-4 space-y-4">

                <h2 className="text-lg font-medium">Orders List</h2>

                {orders.map((order, index) => (
                    <div key={index} className="flex flex-col md:items-center md:flex-row gap-5 justify-between p-5 max-w-4xl rounded-md border border-gray-300">
                        <div className="flex gap-5 max-w-80">

                            <img className="w-12 h-12 object-cover" src={assets.box_icon} alt="boxIcon" />

                            <div>
                                {order.items.map((item, index) => (

                                    <div key={index} className="flex flex-col">
                                        <p className="font-medium inline-flex gap-2">
                                            {item.product.name}
                                            <span className={`font-medium text-green-500 ${item.size.length < 1 && "hidden"}`}>{item.size}</span>
                                            <span className={`text-primary ${item.quantity < 2 && "hidden"}`}>x {item.quantity}</span>
                                        </p>
                                    </div>
                                ))}
                            </div>

                        </div>

                        <div className="text-sm md:base text-black/60">
                            <p className="text-black/80">{order.address.firstName} {order.address.lastName}</p>
                            <p>{order.address.street}, {order.address.city}</p>
                            <p> {order.address.state}, {order.address.zipcode}, {order.address.country}</p>
                            <p>{order.address.phone}</p>
                        </div>

                        <p className="font-medium text-lg my-auto">{currency}{order.sellerAmount}</p>

                        <div className="flex flex-col text-sm md:base text-black/60">
                            <p>Method: {order.paymentType}</p>
                            <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                            <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Orders
