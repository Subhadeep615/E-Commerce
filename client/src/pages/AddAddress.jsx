import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axios from 'axios'
import toast from 'react-hot-toast'

const AddAddress = () => {

    const { user, navigate } = useContext(ShopContext);

    const [address, setAddress] = useState({
        firstName: "",
        lastName: "",
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
        e.preventDefault();
        try {
            const response = await axios.post('/api/address/add', { address })
            console.log(response)
            if (response?.data?.success) {
                toast.success(response.data.message)
                navigate('/cart')
            }
        } catch (error) {
            toast.error(String(error?.response?.data?.message || "something went wrong"))
        }
    }

    useEffect(() => {
        if (!user) {
            navigate('/cart')
        }
    }, [])

    return (
        <div className="mt-16 pb-16">

            <div className="text-2xl md:text-3xl">
                <Title text={"Add Shipping Address"} />
            </div>

            <div className="flex flex-col-reverse md:flex-row justify-between mt-10">
                <div className="flex-1 max-w-md items-center">
                    <form onSubmit={onSubmitHandler} className="space-y-3 mt-6 text-sm">

                        <div className="grid grid-cols-2 gap-4">

                            <input className="w-full px-2 py-2.5 font-medium border-2 border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition" type="text" placeholder="First Name" name="firstName" value={address.firstName} onChange={handleChange} required />

                            <input className="w-full px-2 py-2.5 font-medium border-2 border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition" type="text" placeholder="Last Name" name="lastName" value={address.lastName} onChange={handleChange} required />

                        </div>

                        <input className="w-full px-2 py-2.5 border-2 font-medium border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition" type="text" placeholder="Street" name="street" value={address.street} onChange={handleChange} required />

                        <div className="grid grid-cols-2 gap-4">

                            <input className="w-full px-2 py-2.5 font-medium border-2 border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition" type="text" placeholder="City" name="city" value={address.city} onChange={handleChange} required />

                            <input className="w-full px-2 py-2.5 font-medium border-2 border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition" type="text" placeholder="State" name="state" value={address.state} onChange={handleChange} required />

                        </div>

                        <div className="grid grid-cols-2 gap-4">

                            <input className="w-full px-2 py-2.5 font-medium border-2 border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition" type="text" placeholder="Country" name="country" value={address.country} onChange={handleChange} required />

                            <input className="w-full px-2 py-2.5 font-medium border-2 border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition" type="number" placeholder="ZipCode" name="zipcode" value={address.zipcode} onChange={handleChange} required />

                        </div>

                        <input className="w-full px-2 py-2.5 border-2 font-medium border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition" type="text" placeholder="Mobile No." name="phone" value={address.phone} onChange={handleChange} required />

                        <button className="w-full mt-16 bg-primary font-medium text-white py-3 hover:bg-primary-dull transition cursor-pointer">
                            Save Address
                        </button>

                    </form>
                </div>
                <img src={assets.add_address_image} className="w-full sm:w-1/3 mr-3" alt="add address " />
            </div>
        </div>
    )
}

export default AddAddress
