import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import toast from "react-hot-toast"

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = "₹";

    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    const [seller, setSeller] = useState(null)
    const [isAdmin, setIsAdmin] = useState(false)
    const [allShop, setALlShop] = useState([])
    const [showUserLogin, setShowUserLogin] = useState(false)
    const [products, setProducts] = useState([])
    const [cartItems, setCartItems] = useState({})
    const [searchQuery, setSearchQuery] = useState({})

    // fetch all product
    const fetchProducts = async () => {
        try {
            const response = await axios.get('/api/product/list')

            if (response?.data?.success) {
                setProducts(response.data.data)
            }
        } catch (error) {
            toast.error(String(error?.response?.data?.message || "Failed to fetch products"))
        }
    }

    // fetch user status
    const fetchUser = async () => {
        try {
            const response = await axios.get('api/user/profile')
            if (response?.data?.success) {
                setUser(response.data.data)
                setCartItems(response.data.data.cartItems || {})
            } else {
                setUser(null)
                setCartItems({})
            }
        } catch (error) {
            setUser(null)
            setCartItems({})
        }
    }

    // fetch seller status
    const fetchSeller = async () => {
        try {
            const response = await axios.get('/api/seller/profile')
            if (response?.data?.success) {
                setSeller(response.data.data)
            } else {
                setSeller(false)
            }
        } catch (error) {
            setSeller(false)
        }
    }

    // fetch admin status
    const fetchAdmin = async () => {
        try {
            const response = await axios.get('/api/admin/current-admin')
            if (response?.data?.success) {
                setIsAdmin(true)
            } else {
                setIsAdmin(false)
            }
        } catch (error) {
            setIsAdmin(false)
        }
    }

    // fetch all store
    const fetchShop = async () => {
        try {
            const response = await axios.get('/api/admin/list-seller')
            if (response?.data?.success) {
                setALlShop(response.data.data)
            } else {
                setALlShop([])
            }
        } catch (error) {
            setALlShop([])
        }
    }

    // add product to card
    const addToCart = async (itemId, size) => {
        let cartData = structuredClone(cartItems);
        const product = products.find(item => item._id === itemId);

        if (product && product.sizes && product.sizes.length > 0) {

            if (!size) {
                toast.error('Select Product Size');
                return;
            }
            if (cartData[itemId]) {
                if (cartData[itemId][size]) {
                    cartData[itemId][size] += 1;
                } else {
                    cartData[itemId][size] = 1;
                }
            } else {
                cartData[itemId] = {};
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = (cartData[itemId] || 0) + 1;
        }
        setCartItems(cartData);
        toast.success("Added to cart")
    }

    // Update Cart Items Quantity
    const updateCartItem = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);

        if (size) {
            cartData[itemId][size] = quantity;
        } else {
            cartData[itemId] = quantity;
        }

        setCartItems(cartData);
        toast.success("Cart Updated")
    }

    // remove product from cart
    const removeToCart = async (itemId, size) => {
        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (size && typeof cartData[itemId] === 'object') {
                cartData[itemId][size] -= 1;
                if (cartData[itemId][size] === 0) {
                    delete cartData[itemId][size];
                }
                // If no sizes left, remove the itemId
                if (Object.keys(cartData[itemId]).length === 0) {
                    delete cartData[itemId];
                }
            } else if (typeof cartData[itemId] === 'number') {
                cartData[itemId] -= 1;
                if (cartData[itemId] === 0) {
                    delete cartData[itemId];
                }
            }
        }

        setCartItems(cartData);
        toast.success("Remove from cart");
    }

    // get cart item count
    const getCartCount = () => {
        let totalCount = 0;
        for (const itemId in cartItems) {
            const entry = cartItems[itemId];
            if (typeof entry === 'number') {
                totalCount += entry;
            } else if (typeof entry === 'object' && entry !== null) {
                for (const size in entry) {
                    totalCount += entry[size];
                }
            }
        }
        return totalCount;
    }

    // get cart total amount
    const getCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            const itemInfo = products.find(product => product._id === itemId);
            const entry = cartItems[itemId];
            if (!itemInfo) continue;
            if (typeof entry === 'number') {
                totalAmount += entry * itemInfo.price;
            } else if (typeof entry === 'object' && entry !== null) {
                for (const size in entry) {
                    totalAmount += entry[size] * itemInfo.price;
                }
            }
        }
        return totalAmount;
    }

    useEffect(() => {
        fetchProducts()
        fetchUser()
        fetchAdmin()
    }, [])

    useEffect(() => {
        if (user && user.role === "Seller") {
            fetchSeller();
        } else {
            setSeller(false);
        }
    }, [user])

    useEffect(() => {
        if (isAdmin) {
            fetchShop()
        }
    }, [isAdmin])

    useEffect(() => {
        const updateCart = async () => {
            try {
                const response = await axios.post('/api/cart/update', { cartItems })
                if (!response?.data?.success) {
                    toast.error(response.data.message)
                }
            } catch (error) {
                toast.error(String(error?.response?.data?.message || "something went wrong"))
            }
        }
        if (user) {
            updateCart()
        }
    }, [cartItems])

    const value = {
        products, navigate, currency,

        user, setUser,

        seller, setSeller,

        searchQuery, setSearchQuery,

        isAdmin, setIsAdmin, allShop,

        showUserLogin, setShowUserLogin,

        cartItems, setCartItems,

        addToCart, removeToCart, updateCartItem,

        getCartCount, getCartAmount,

        fetchUser, fetchSeller, fetchShop, fetchProducts,
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )

}

export default ShopContextProvider;