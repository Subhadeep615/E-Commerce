import React, { useContext, useState } from 'react'
import { ShopContext } from '../../context/ShopContext'
import { assets } from '../../assets/assets'
import Title from '../../components/Title'
import axios from 'axios'
import toast from 'react-hot-toast'

const SellerRegister = () => {

    const { navigate, user, fetchUser, fetchSeller } = useContext(ShopContext);

    const [shopName, setShopName] = useState("")
    const [file, setFile] = useState(null)
    const [shopDescription, setShopDescription] = useState("")
    const [address, setAddress] = useState({
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;

        setAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value,
        }))

    }

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();

            if (!user) {
                toast.error("Please login first")
                return;
            }

            const formData = new FormData()

            formData.append("shopName", shopName);
            formData.append("shopDescription", shopDescription);
            formData.append("address", JSON.stringify(address));
            formData.append("shopLogo", file);

            const response = await axios.post('/api/seller/register', formData)

            if (response?.data?.success) {
                fetchUser()
                fetchSeller()
                navigate('/')
                return response.data.message;
            } else {
                throw new Error(response?.data?.message || "something went wrong");
            }
        } catch (error) {
            throw new Error(String(error?.response?.data?.message || "something went wrong"))
        }
    }

    return (
        <div className="mt-16 pb-16">
            <div className="text-2xl md:text-3xl">
                <Title text={"Seller Register"} />
            </div>

            <div className="flex flex-col-reverse md:flex-row justify-between mt-10">
                <div className="flex-1 max-w-md items-center">
                    <form onSubmit={(e) => toast.promise(onSubmitHandler(e), {
                        loading: "Seller Adding...",
                        success: (msg) => <p>{msg}</p>,
                        error: (err) => <p>{err.message}</p>
                    })} className="space-y-3 mt-6 text-sm">

                        {/* Shop Name */}
                        <div className="flex flex-col gap-1 max-w-md">
                            <label className="text-base font-medium" htmlFor="shopName">Shop Name</label>
                            <input className="w-full px-2 py-2.5 font-medium border-2 border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition" type="text" placeholder="Shop Name" name="shopName" value={shopName} onChange={(e) => setShopName(e.target.value)} required />
                        </div>

                        {/* Shop Description */}
                        <div className="flex flex-col gap-1 max-w-md">
                            <label className="text-base font-medium" htmlFor="shopDescription">Shop Description</label>
                            <textarea className="w-full px-2 py-2.5 font-medium border-2 border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition" rows={4} placeholder="ShopDescription" name="shopDescription" value={shopDescription} onChange={(e) => setShopDescription(e.target.value)} required />
                        </div>

                        {/* Address */}
                        <h2 className="text-base font-medium">Shop Address</h2>

                        <input className="w-full px-2 py-2.5 font-medium border-2 border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition" type="text" placeholder="Street" name="street" value={address.street} onChange={handleChange} required />

                        <div className="grid grid-cols-2 gap-4">

                            <input className="w-full px-2 py-2.5 font-medium border-2 border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition" type="text" placeholder="City" name="city" value={address.city} onChange={handleChange} required />

                            <input className="w-full px-2 py-2.5 font-medium border-2 border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition" type="text" placeholder="State" name="state" value={address.state} onChange={handleChange} required />

                        </div>

                        <div className="grid grid-cols-2 gap-4">

                            <input className="w-full px-2 py-2.5 font-medium border-2 border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition" type="text" placeholder="Country" name="country" value={address.country} onChange={handleChange} required />

                            <input className="w-full px-2 py-2.5 font-medium border-2 border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition" type="number" placeholder="ZipCode" name="zipcode" value={address.zipcode} onChange={handleChange} required />

                        </div>


                        <input className="w-full px-2 py-2.5 font-medium border-2 border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition" type="text" placeholder="Mobile No." name="phone" value={address.phone} onChange={handleChange} required />


                        <div className="grid grid-cols-2 gap-6 mt-6">
                            <input className="w-full px-2 py-2.5 font-medium border-2 border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition" type="file" onChange={(e) => setFile(e.target.files[0])} required />

                            <button className="w-full bg-primary font-medium text-white py-3 rounded hover:bg-primary-dull transition cursor-pointer">
                                Register
                            </button>
                        </div>


                    </form>
                </div>
                <img src={assets.seller_register_image} className="w-full sm:w-1/2 mr-3" alt="add address" />
            </div>
        </div>
    )
}

export default SellerRegister
