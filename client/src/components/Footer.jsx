import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'

const Footer = () => {

    const { navigate, user } = useContext(ShopContext)

    return (
        <div className="mt-10 bg-primary/10">
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 px-6 md:px-16 lg:px-24 xl:px-32 py-4 my-10 mt-14 text-sm">
                <div>
                    <div className="flex gap-2 items-center">
                        <img src={assets.brand_logo} className="w-15" alt="" />
                        <h1 className="text-2xl"><span className="font-bold">Zippy</span><span className="italic font-light">Mall</span></h1>
                    </div>
                    <p className="w-full md:w-2/3 text-gray-600">
                        ZippyMall is your one-stop shop for all things trendy and affordable.<br />
                        Enjoy seamless shopping with our user-friendly platform and fast delivery services.
                    </p>
                </div>

                <div>
                    <p className="text-xl font-medium mb-5">COMPANY</p>
                    <ul className="flex flex-col gap-1 text-gray-600">
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery </li>
                        <li>Privacy policy</li>
                    </ul>
                </div>

                <div>
                    <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
                    <ul className="flex flex-col gap-1 text-gray-600">
                        <li>Tel: (033) 2456-7890</li>
                        <li>Email: support@ZippyMall.com</li>
                        <div className="flex items-center gap-2 mt-5">
                            {user && user.role === "User" ? <button onClick={() => navigate('/seller-register')} className="bg-primary text-base text-white w-2/3 py-2 rounded">
                                Become a Seller
                            </button> : null}
                            <button onClick={() => navigate('/admin')} className="bg-white text-base text-primary-dull border border-primary-dull w-1/3 py-0.5 rounded-full">
                                Admin
                            </button>
                        </div>
                    </ul>
                </div>
            </div>

            <div>
                <hr />
                <p className="py-5 text-center ">© 2025 ZippyMall by Subhadeep Majhi. All Rights Reserved.</p>
            </div>

        </div>
    )
}

export default Footer
