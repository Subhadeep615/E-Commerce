import React, { useContext } from 'react'
import { assets, sidebarLinksAdmin } from '../../assets/assets';
import { ShopContext } from '../../context/ShopContext';
import { Link, NavLink, Outlet } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const AdminLayout = () => {

    const { navigate, setIsAdmin } = useContext(ShopContext)

    const logout = async (params) => {
        try {
            const response = await axios.get('/api/admin/logout')
            if (response?.data?.success) {
                setIsAdmin(false)
                toast.success(response.data.message)
                navigate('/')
            }
        } catch (error) {
            toast.error(String(error?.response?.data?.message || "something went wrong"))
        }
    }

    return (
        <div className="w-full h-screen fixed top-0 left-0 flex flex-col">
            <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white">
                <Link to="/">
                    <div className="flex gap-2 items-center">
                        <img src={assets.brand_logo} className="w-15" alt="" />
                        <h1 className="text-2xl"><span className="font-bold">Zippy</span><span className="italic font-light">Mall</span></h1>
                    </div>
                </Link>
                <div className="flex items-center gap-5 text-gray-500">
                    <button onClick={logout} className="border rounded-full text-sm px-4 py-1">Logout</button>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden bg-slate-50">
                <div className="w-60 xl:w-72 bg-white border-r px-6 text-gray-600 space-y-1 font-medium border-gray-300 pt-4 flex flex-col">
                    {sidebarLinksAdmin.map(({ to, label, Icon }) => (
                        <NavLink key={to} to={to} end={to === '/admin'} onClick={() => setSidebarOpen(false)} className={({ isActive }) => `px-3.5 py-2 flex items-center gap-3 rounded-xl text-base font-semibold ${isActive ? "bg-primary/20 text-blue-700" : "hover:bg-gray-100"}`}>
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
    )
}

export default AdminLayout
