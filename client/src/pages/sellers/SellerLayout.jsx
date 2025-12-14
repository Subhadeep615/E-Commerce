import React, { useContext } from 'react'
import { ShopContext } from '../../context/ShopContext';
import { assets, sidebarLinksSeller } from '../../assets/assets';
import { Link, NavLink, Outlet } from 'react-router-dom';

const SellerLayout = () => {

    const { navigate, seller } = useContext(ShopContext)

    const logout = async () => {
        navigate('/');
    }

    return (
        <div className="w-full h-screen fixed top-0 left-0 flex flex-col">
            <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white">
                <Link to="/">
                    <div className='flex gap-2 items-center'>
                        <img src={assets.brand_logo} className="w-15" alt="" />
                        <h1 className="text-2xl"><span className='font-bold'>Zippy</span><span className='italic font-light'>Mall</span></h1>
                    </div>
                </Link>
                <div className="flex items-center gap-5 text-gray-500">
                    <p>Hi! Seller</p>
                    <button onClick={logout} className='border rounded-full text-sm px-4 py-1'>Logout</button>
                </div>
            </div>
            <div className='flex flex-1 overflow-hidden bg-slate-50'>
                <div className="w-60 xl:w-72 bg-white border-r px-6 text-gray-600 space-y-1 font-medium border-gray-300 pt-4 flex flex-col">
                    <div className="flex items-center justify-center py-3 px-4 gap-3">
                        <img src={seller.shopLogo} alt="" className="w-8 h-8 md:w-15 md:h-15 rounded-full" />
                        <p className="hidden md:block font-medium text-center">{seller.shopName}</p>
                    </div>
                    {sidebarLinksSeller.map(({ to, label, Icon }) => (
                        <NavLink key={to} to={to} end={to === '/seller'} onClick={() => setSidebarOpen(false)} className={({ isActive }) => `px-3.5 py-2 flex items-center gap-3 rounded-xl text-base font-semibold ${isActive ? "bg-primary/20 text-blue-700" : "hover:bg-gray-100"}`}>
                            <Icon className="w-6 h-6" />
                            {label}
                        </NavLink>
                    ))}
                </div>
                <div className="flex-1 overflow-y-scroll">
                    <Outlet />
                </div>
            </div>

        </div>
    );
};

export default SellerLayout
