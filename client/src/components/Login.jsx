import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import toast from 'react-hot-toast';
import axios from 'axios';

const Login = () => {

    const { setShowUserLogin, setUser, navigate } = useContext(ShopContext)

    const [state, setState] = useState("login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmitHandler = async (event) => {
        try {
            event.preventDefault();

            const response = await axios.post(`/api/user/${state}`, { name, email, password })

            if (response?.data?.success) {
                navigate('/')
                setShowUserLogin(false)
                setUser(response.data.data)
                toast.success(response.data.message)
            }
        } catch (error) {
            toast.error(String(error?.response?.data?.message || "something went wrong"))
        }

    }

    return (
        <div onClick={() => setShowUserLogin(false)} className="fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center text-sm text-gray-600 bg-black/50">

            {/* Login/SignUp form */}
            <form onSubmit={onSubmitHandler} onClick={(e) => e.stopPropagation()} className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] font-medium text-gray-600 rounded-lg shadow-xl border border-gray-200 bg-white">

                {/* heading */}
                <p className="text-2xl font-medium m-auto">
                    <span className="text-primary">User</span> {state === "login" ? "Login" : "Sign Up"}
                </p>

                {/* name input if signup */}
                {state === "register" && (
                    <div className="w-full">
                        <p>Name</p>
                        <input onChange={(e) => setName(e.target.value)} value={name} placeholder="Enter Name" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="text" required />
                    </div>
                )}

                {/* email input */}
                <div className="w-full ">
                    <p>Email</p>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Enter Email" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="email" required />
                </div>

                {/* password input */}
                <div className="w-full ">
                    <p>Password</p>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Enter password" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="password" required />
                </div>

                {/* swap between login and signup */}
                {state === "register" ? (
                    <p>
                        Already have account? <span onClick={() => setState("login")} className="text-primary cursor-pointer">click here</span>
                    </p>
                ) : (
                    <p>
                        Create an account? <span onClick={() => setState("register")} className="text-primary cursor-pointer">click here</span>
                    </p>
                )}

                {/* sumit button */}
                <button className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-2 rounded-md cursor-pointer">
                    {state === "register" ? "Create Account" : "Login"}
                </button>

            </form>

        </div>
    );
}

export default Login;
