import React, { useContext, useEffect, useState } from 'react'
import { CircleX, MoveRight } from 'lucide-react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import toast from 'react-hot-toast'


const Cart = () => {

    const { products, navigate, user, currency, cartItems, setCartItems, removeToCart, getCartCount, updateCartItem, getCartAmount } = useContext(ShopContext)

    const [showAddress, setShowAddress] = useState(false)
    const [address, setAddress] = useState([])
    const [cartArray, setCartArray] = useState([])
    const [paymentOption, setPaymentOption] = useState("COD")
    const [selectedAddress, setSelectedAddress] = useState(null)


    const getCart = () => {
        const tempArray = [];
        for (const itemId in cartItems) {
            const entry = cartItems[itemId];
            // Attach product details so we can render image, name, price
            const productData = products.find(p => p._id === itemId);
            if (!productData) continue;

            if (typeof entry === "number") {
                if (entry > 0) {
                    tempArray.push({ ...productData, quantity: entry });
                }
            } else if (typeof entry === "object" && entry !== null) {
                for (const size in entry) {
                    if (entry[size] > 0) {
                        tempArray.push({ ...productData, size, quantity: entry[size] });
                    }
                }
            }
        }
        setCartArray(tempArray);
    }

    const getUserAddress = async () => {
        try {
            const response = await axios.get('/api/address/get')
            if (response?.data?.success) {
                setAddress(response.data.data)
                if (response.data.data.length > 0) {
                    setSelectedAddress(response.data.data[0])
                }
            }
        } catch (error) {
            setAddress([])
            setSelectedAddress(null)
        }
    }

    const placeOrder = async () => {
        try {
            if (!selectedAddress) {
                return toast.error("Please select an Address")
            }

            // place order with cod or online
            if (paymentOption === "COD") {

                const response = await axios.post('/api/order/cod', {
                    userId: user._id,
                    items: cartArray.map(item => ({ seller: item.seller._id, product: item._id, size: item.size, quantity: item.quantity })),
                    address: selectedAddress._id
                })

                if (response?.data?.success) {
                    setCartItems({})
                    navigate('/order')
                    return response.data.message;
                } else {
                    throw new Error(response?.data?.message || "something went wrong");
                }
            } else {
                const response = await axios.post('/api/order/online', {
                    userId: user._id,
                    items: cartArray.map(item => ({ seller: item.seller._id, product: item._id, size: item.size, quantity: item.quantity })),
                    address: selectedAddress._id
                })

                if (response?.data?.success) {
                    window.location.replace(response.data.url)
                    return "Redirecting to payment..."
                } else {
                    throw new Error(response?.data?.message || "something went wrong");
                }
            }
        } catch (error) {
            throw new Error(String(error?.response?.data?.message || "something went wrong"))
        }
    }

    useEffect(() => {
        if (products.length > 0 && cartItems) {
            getCart()
        }
    }, [products, cartItems])

    useEffect(() => {
        if (user) {
            getUserAddress()
        }
    }, [user])

    return products.length > 0 ? (
        <div className="flex flex-col md:flex-row mt-16">

            {/* right side cart  */}
            <div className="flex-1 max-w-4xl">

                <h1 className="text-3xl font-medium mb-6">
                    Shopping Cart <span className="text-sm text-primary">{getCartCount()} Items</span>
                </h1>
                <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
                    <p className="text-left">Product Details</p>
                    <p className="text-center">Subtotal</p>
                    <p className="text-center">Action</p>
                </div>

                {/* product */}
                {cartArray.map((product, index) => (
                    <div key={index} className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3">
                        <div className="flex items-center md:gap-6 gap-3">

                            <div onClick={() => { navigate(`/products/${product.category.toLowerCase()}/${product._id}`); scrollTo(0, 0) }} className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden">
                                <img className="max-w-full h-full object-cover" src={product.image[0]} alt={product.name} />
                            </div>

                            <div>
                                <p className="hidden md:block font-semibold">{product.name}</p>
                                <div className="font-normal text-gray-500/70">

                                    <p>Size: <span>{product.size || "Free Size"}</span></p>

                                    <div className="flex items-center">
                                        <p>Qty:</p>
                                        <select className="outline-none" value={product.quantity} onChange={e => updateCartItem(product._id, product.size, Number(e.target.value))}>
                                            {Array.from({ length: 9 }, (_, i) => i + 1).map(num => (
                                                <option key={num} value={num}>{num}</option>
                                            ))}
                                        </select>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <p className="text-center">{currency}{product.offerPrice * product.quantity}</p>
                        <button onClick={() => removeToCart(product._id, product.size)} className="cursor-pointer mx-auto">
                            <CircleX className="w-6 h-6 text-red-600 hover:text-red-800" />
                        </button>
                    </div>)
                )}

                {/* navigate to products */}
                <button onClick={() => { navigate('/products'); scrollTo(0, 0) }} className="group cursor-pointer flex items-center mt-8 gap-2 text-primary font-medium">
                    Continue Shopping
                    <MoveRight className="w-5 h-5 group-hover:-translate-x-1 transition" />
                </button>

            </div>

            {/* left side details */}
            <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
                <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
                <hr className="border-gray-300 my-5" />

                {/* delivary details */}
                <div className="mb-6">
                    <p className="text-sm font-medium uppercase">Delivery Address</p>
                    <div className="relative flex justify-between items-start mt-2">

                        <p className="text-gray-500">{selectedAddress ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}` : "No address found"}</p>

                        <button onClick={() => setShowAddress(!showAddress)} className="text-primary hover:underline cursor-pointer">
                            Change
                        </button>

                        {showAddress && (
                            <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
                                {address.map((address, index) => (
                                    <p onClick={() => { setSelectedAddress(address); setShowAddress(false) }} className="text-gray-500 p-2 hover:bg-gray-100">
                                        {address.street},{address.city},{address.state},{address.country}
                                    </p>
                                ))}
                                <p onClick={() => navigate('/add-address')} className="text-primary text-center cursor-pointer p-2 hover:bg-primary/10">
                                    Add address
                                </p>
                            </div>
                        )}
                    </div>

                    <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

                    <select onChange={e => setPaymentOption(e.target.value)} className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none">
                        <option value="COD">Cash On Delivery</option>
                        <option value="Online">Online Payment</option>
                    </select>
                </div>

                <hr className="border-gray-300" />

                {/* order Amount */}
                <div className="text-gray-500 mt-4 space-y-2">
                    <p className="flex justify-between">
                        <span>Price</span><span>{currency}{getCartAmount()}</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Shipping Fee</span><span className="text-green-600">Free</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Tax (2%)</span><span>{currency}{getCartAmount() * 2 / 100}</span>
                    </p>
                    <p className="flex justify-between text-lg font-medium mt-3">
                        <span>Total Amount:</span><span>{currency}{getCartAmount() + getCartAmount() * 2 / 100}</span>
                    </p>
                </div>

                {user && <button onClick={() => toast.promise(placeOrder, {
                    loading: "Placing your order...",
                    success: (msg) => <p>{msg}</p>,
                    error: (err) => <p>{err.message}</p>
                })} className="w-full py-3 mt-6 cursor-pointer bg-primary text-white font-medium hover:bg-primary-dull transition">
                    {paymentOption === "COD" ? "Place Order" : "Proceed To Checkout"}
                </button>}
            </div>

        </div>
    ) : null
}

export default Cart
