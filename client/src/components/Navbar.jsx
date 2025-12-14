import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'
import { Menu, Search, ShoppingBag, User, X } from 'lucide-react'
import { ShopContext } from '../context/ShopContext'
import toast from 'react-hot-toast'
import axios from 'axios'


const Navbar = () => {

    const { user, setUser, setShowUserLogin, navigate, seller, searchQuery, setSearchQuery, getCartCount } = useContext(ShopContext)
    const [open, setOpen] = useState(false)

    const logOut = async () => {
        try {
            const response = await axios.get('/api/user/logout')
            if (response?.data?.success) {
                setUser(null)
                toast.success(response.data.message)
                navigate('/')
            }
        } catch (error) {
            toast.error(String(error?.response?.data?.message || "something went wrong"))
        }
    }


    useEffect(() => {
        if (searchQuery.length > 0) {
            navigate('/products')
        }
    }, [searchQuery])


    return (
        <div className="w-full flex items-center justify-between px-6 md:px-14 lg:px-16 xl:px-32 py-4 mb-2 border-b border-gray-300 bg-white relative transition-all">


            {/* Brand Logo */}
            <NavLink to="/" onClick={() => setOpen(false)}>
                <div className="flex gap-2 items-center">
                    <img src={assets.brand_logo} className="w-15" alt="" />
                    <h1 className="text-2xl"><span className="font-bold">Zippy</span><span className="italic font-light">Mall</span></h1>
                </div>
            </NavLink>


            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-5 text-sm text-gray-700">

                <NavLink to="/" className="flex flex-col font-medium items-center gap-1 hover:text-gray-900">
                    <p>HOME</p>
                    <hr className="w-2/4 border-none rounded h-0.5 bg-gray-700 hidden" />
                </NavLink>

                <NavLink to="/products" className="flex flex-col font-medium items-center gap-1 hover:text-gray-900">
                    <p>ALL PRODUCT</p>
                    <hr className="w-2/4 border-none rounded h-0.5 bg-gray-700 hidden" />
                </NavLink>

                <NavLink to="/about" className="flex flex-col font-medium items-center gap-1 hover:text-gray-900">
                    <p>ABOUT</p>
                    <hr className="w-2/4 border-none rounded h-0.5 bg-gray-700 hidden" />
                </NavLink>

                <NavLink to="/contact" className="flex flex-col font-medium items-center gap-1 hover:text-gray-900">
                    <p>CONTACT</p>
                    <hr className="w-2/4 border-none rounded h-0.5 bg-gray-700 hidden" />
                </NavLink>

                <div className="hidden lg:flex items-center text-sm font-normal gap-2 border border-gray-300 px-3 rounded-full">
                    <input onChange={(e) => setSearchQuery(e.target.value)} className="py-1.5 bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
                    <Search className="w-4 h-4 text-gray-500" />
                </div>

                <div onClick={() => navigate('/cart')} className="relative">
                    <ShoppingBag className="w-5.5 h-5.5 cursor-pointer" />
                    <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-primary-dull text-white aspect-square rounded-full text-[8px]">{getCartCount()}</p>
                </div>

                {!user ?
                    (
                        <button onClick={() => setShowUserLogin(true)} className="hidden md:flex items-center cursor-pointer px-4 py-1 md:px-8 md:py-2 bg-primary hover:bg-primary-dull transition text-white font-medium rounded-full">Login</button>
                    ) : (
                        <div className="group relative">
                            <User className="w-5.5 h-5.5 cursor-pointer" />
                            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                                <div className="flex flex-col gap-2 w-36 py-5 px-5 bg-slate-100 font-medium text-gray-500 rounded">
                                    <p onClick={() => navigate('/order')} className="cursor-pointer hover:text-primary">Orders</p>
                                    <p onClick={logOut} className="cursor-pointer hover:text-primary">LogOut</p>
                                    {seller ? <p onClick={() => navigate('/seller')} className="cursor-pointer hover:text-primary">Seller</p> : null}
                                </div>
                            </div>
                        </div>
                    )
                }

            </div>


            {/* Cart Icon */}
            <div className="flex md:hidden gap-4" >

                <div onClick={() => navigate('/cart')} className="relative lg:hidden">
                    <ShoppingBag className="w-5.5 h-5.5 cursor-pointer" />
                    <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-primary-dull text-white aspect-square rounded-full text-[8px]">{getCartCount()}</p>
                </div>


                {/* Mobile Menu Icon */}
                <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="lg:hidden">
                    {open ?  <X className="w-5 h-5"/> : <Menu className="w-5 h-5"/>}   
                </button>
            </div>


            {/* Mobile Menu */}
            <div className={`${open ? "flex" : "hidden"} absolute top-25 left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm font-medium lg:hidden`}>

                <NavLink onClick={() => setOpen(false)} to="/" className="py-2 pl-6">HOME</NavLink>
                <NavLink onClick={() => setOpen(false)} to="/products" className="py-2 pl-6">ALL PRODUCT</NavLink>
                <NavLink onClick={() => setOpen(false)} to="/about" className="py-2 pl-6">ABOUT</NavLink>
                <NavLink onClick={() => setOpen(false)} to="/contact" className="py-2 pl-6">CONTACT</NavLink>
                {user && <NavLink onClick={() => setOpen(false)} to="/order" className="py-2 pl-6 mt-5 mb-2">MY ORDER</NavLink>}
                {seller ? <p onClick={() => navigate('/seller')} className="cursor-pointer hover:text-primary">Seller</p> : null}

                {!user ? (
                    <button onClick={() => { setOpen(false); setShowUserLogin(true); }} className=" w-[25%] items-center cursor-pointer ml-3 px-4 py-1 md:px-8 md:py-2 bg-primary hover:bg-primary-dull transition text-white font-medium rounded-full">Login</button>
                ) : (
                    <button onClick={logOut} className=" w-[25%] items-center cursor-pointer ml-3 px-4 py-2 bg-primary hover:bg-primary-dull transition text-white font-medium rounded-full">LogOut</button>
                )}
            </div>

        </div>


    )
}

export default Navbar
