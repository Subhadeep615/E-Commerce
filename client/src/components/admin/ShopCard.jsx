import React, { useContext } from 'react'
import { MapPin, Phone } from 'lucide-react'
import { ShopContext } from '../../context/ShopContext'
import axios from 'axios'
import toast from 'react-hot-toast'

const ShopCard = ({ shop }) => {

    const { fetchShop } = useContext(ShopContext);

    // approved seller
    const handleApprove = async (sellerId) => {
        try {
            const response = await axios.post('/api/admin/approve-seller', { sellerId })
            if (response?.data?.success) {
                toast.success(response.data.message)
                fetchShop()
            }
        } catch (error) {
            toast.error(String(error?.response?.data?.message || "something went wrong"))
        }
    }

    // reject seller
    const handleReject = async (sellerId) => {
        try {
            const response = await axios.post('/api/admin/reject-seller', { sellerId })
            if (response?.data?.success) {
                toast.success(response.data.message)
                fetchShop()
            }
        } catch (error) {
            toast.error(String(error?.response?.data?.message || "something went wrong"))
        }
    }

    // seller blocked toggle
    const toggleBlocked = async (sellerId, status) => {
        try {
            let isBlocked = false;
            if (status === "Active") {
                isBlocked = true;
            } else {
                isBlocked = false;
            }
            const response = await axios.post('/api/admin/blocked-seller', { sellerId, isBlocked })
            if (response?.data?.success) {
                toast.success(response.data.message)
                fetchShop()
            }
        } catch (error) {
            toast.error(String(error?.response?.data?.message || "something went wrong"))
        }
    }

    return (
        <div className="w-full max-w-3xl px-5 py-4 bg-white border-2 border-gray-500 rounded flex flex-col md:flex-row justify-between gap-3">
            <div className="">
                <img src={shop.shopLogo} alt="" className="w-12 h-12 rounded-full" />
                <div className="flex items-center gap-3 mt-1">
                    <h3 className="font-semibold text-lg text-black ">{shop.shopName}</h3>
                    <p className={`text-xs font-semibold px-2 py-0.5 rounded-full ${shop.status === "Active" ? "text-green-500 bg-green-100" : "text-amber-500 bg-amber-100 "}`}>{shop.status}</p>
                </div>
                <p className="font-medium text-gray-500 text-sm mt-4">{shop.shopDescription}</p>
                <div className="mt-3 flex flex-col gap-2">
                    <p className="font-medium text-gray-500 text-sm inline-flex items-center gap-1"><MapPin className="w-5 h-5" /> {`${shop.address.street}, ${shop.address.city}, ${shop.address.state}`}</p>
                    <p className="font-medium text-gray-500 text-sm inline-flex items-center gap-1 mt-1"><Phone className="w-5 h-5" /> {shop.address.phone}</p>
                </div>
                <p className="font-medium text-gray-700 text-sm mt-4">Applied on {new Date(shop.createdAt).toLocaleDateString()} by</p>

                <div className=" mt-2">
                    <p className="font-medium text-sm text-gray-500">{shop.user.name}</p>
                    <p className="font-normal text-xs text-gray-500">{shop.user.email}</p>
                </div>
            </div>

            {shop.status === "Pending" && <div className="flex flex-col justify-end">
                <div className="flex gap-3">
                    <button onClick={() => handleApprove(shop._id)} className="bg-primary hover:bg-primary-dull text-white px-5 py-2 rounded cursor-pointer">Approve</button>
                    <button onClick={() => handleReject(shop._id)} className="bg-gray-500 hover:bg-gray-700 text-white px-5 py-2 rounded cursor-pointer">Reject</button>
                </div>
            </div>}

            {shop.isApproved && <div className="flex flex-col justify-end">
                <div className="px-4 py-3">
                    <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                        <input onChange={() => toggleBlocked(shop._id, shop.status)} checked={shop.status === "Active"} type="checkbox" className="sr-only peer" />
                        <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-primary transition-colors duration-200"></div>
                        <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                    </label>
                </div>
            </div>}
        </div>
    )
}

export default ShopCard
