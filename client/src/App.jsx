import React, { useContext } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { ShopContext } from './context/ShopContext'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'
import Loading from './components/Loading'
import ProtectedRoutes from './utils/ProtectedRoutes'


//import pages
import Home from './pages/Home'
import AllProduct from './pages/AllProduct'
import ProductCategory from './pages/ProductCategory'
import ProductDetails from './pages/ProductDetails'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import AddAddress from './pages/AddAddress'
import MyOrder from './pages/MyOrder'


// import seller 
import SellerRegister from './pages/sellers/SellerRegister'
import SellerLayout from './pages/sellers/SellerLayout'
import AddProduct from './pages/sellers/AddProduct'
import ProductList from './pages/sellers/ProductList'
import Orders from './pages/sellers/Orders'


// import admin
import AdminLogin from './components/admin/AdminLogin'
import AdminLayout from './pages/admin/AdminLayout'
import Store from './pages/admin/Store'
import ApprovedStore from './pages/admin/ApprovedStore'


const App = () => {

    const pathname = useLocation().pathname;
    const sellerPath = pathname.startsWith("/seller") && pathname !== "/seller-register";
    const isAdminPath = useLocation().pathname.includes("admin")
    const { showUserLogin, seller, isAdmin } = useContext(ShopContext);

    return (
        <div className="text-default min-h-screen text-gray-700 bg-white">

            {sellerPath || isAdminPath ? null : <Navbar />}
            {showUserLogin ? <Login /> : null}

            <Toaster />

            <div className={`${sellerPath || isAdminPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<AllProduct />} />
                    <Route path="/products/:category" element={<ProductCategory />} />
                    <Route path="/products/:category/:id" element={<ProductDetails />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/add-address" element={
                        <ProtectedRoutes>
                            <AddAddress />
                        </ProtectedRoutes>
                    } />
                    <Route path="/order" element={
                        <ProtectedRoutes>
                            <MyOrder />
                        </ProtectedRoutes>
                    } />
                    <Route path="/loader" element={<Loading />} />
                    <Route path="/seller-register" element={
                        <ProtectedRoutes>
                            <SellerRegister />
                        </ProtectedRoutes>
                    } />

                    {/* seller */}
                    <Route path="/seller" element={seller?.status === "Active" ? <SellerLayout /> : <div className="flex justify-center items-center h-[80vh] text-center text-2xl">{seller?.status === "Blocked" ? "Your account has been blocked for some reason" : "You are not approved to access this page."}</div>}>
                        <Route index element={seller ? <AddProduct /> : null} />
                        <Route path="product-list" element={seller ? <ProductList /> : null} />
                        <Route path="orders" element={seller ? <Orders /> : null} />
                    </Route>

                    {/* admin */}
                    <Route path="/admin" element={isAdmin ? <AdminLayout /> : <AdminLogin />}>
                        <Route index element={isAdmin ? <Store /> : null} />
                        <Route path="approved-store" element={isAdmin ? <ApprovedStore /> : null} />
                    </Route>

                </Routes>

            </div>

            <Footer />

        </div>
    )
}

export default App
