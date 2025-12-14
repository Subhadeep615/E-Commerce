import React, { useContext, useState } from 'react'
import { assets, categories } from '../../assets/assets'
import toast from 'react-hot-toast'
import axios from 'axios'
import { ShopContext } from '../../context/ShopContext'

const AddProduct = () => {

    const { fetchProducts } = useContext(ShopContext)

    const [files, setFiles] = useState([])
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [price, setPrice] = useState("")
    const [offerPrice, setOfferPrice] = useState("")
    const [gender, setGender] = useState("")
    const [size, setSize] = useState([])


    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();

            const formData = new FormData()

            formData.append("name", name);
            formData.append("description", description);
            formData.append("category", category);
            formData.append("price", price);
            formData.append("offerPrice", offerPrice);
            formData.append("gender", gender);
            formData.append("sizes", JSON.stringify(size));

            // append up to 4 image fields only when a file exists
            for (let i = 0; i < 4; i++) {
                if (files[i]) {
                    formData.append(`image${i + 1}`, files[i]);
                }
            }

            // include credentials so the seller auth cookie is sent
            const response = await axios.post('/api/product/add', formData)

            if (response?.data?.success) {
                fetchProducts()
                setName("");
                setDescription("");
                setCategory("");
                setPrice("");
                setOfferPrice("");
                setGender("");
                setSize([]);
                setSizeInput("");
                setFiles([]);
                return response.data.message;
            } else {
                throw new Error(response?.data?.message || "something went wrong");
            }
        } catch (error) {
            throw new Error(String(error?.response?.data?.message || "something went wrong"))
        }

    }

    // size input handle 
    const [sizeInput, setSizeInput] = useState("")
    const handleSizeInput = (e) => {
        const value = e.target.value;
        setSizeInput(value.toUpperCase())

        const sizeArray = value.split(",").map(item => item.trim()).filter(item => item !== "").map(item => item.toUpperCase());
        setSize(sizeArray);
    }

    return (
        <div className="flex-1 h-[95vh] overflow-y-scroll flex flex-col">

            <h2 className="px-2 md:px-10 pt-4 pb-2 text-lg font-medium">Add Product</h2>

            <form onSubmit={(e) => toast.promise(onSubmitHandler(e), {
                loading: "Product Adding...",
                success: (msg) => <p>{msg}</p>,
                error: (err) => <p>{err.message}</p>
            })} className="md:p-10 p-4 md:pt-4 space-y-5 max-w-lg">

                {/* product image */}
                <div>
                    <p className="text-base font-medium">Product Image</p>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                        {Array(4).fill("").map((_, index) => (
                            <label key={index} htmlFor={`image${index}`}>
                                <input onChange={(e) => {
                                    const updatedFiles = [...files];
                                    updatedFiles[index] = e.target.files[0];
                                    setFiles(updatedFiles)
                                }} type="file" id={`image${index}`} hidden />
                                <img className="max-w-24 cursor-pointer" src={files[index] ? URL.createObjectURL(files[index]) : assets.upload_area} alt="uploadArea" width={100} height={100} />
                            </label>
                        ))}
                    </div>
                </div>

                {/* product name */}
                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="product-name">Product Name</label>
                    <input onChange={(e) => { setName(e.target.value) }} value={name} id="product-name" type="text" placeholder="Type here" className="md:py-2.5 py-2 px-3 rounded outline-primary border border-gray-500/40 " required />
                </div>

                {/* product description */}
                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="product-description">Product Description</label>
                    <textarea onChange={(e) => { setDescription(e.target.value) }} value={description} id="product-description" rows={4} className="md:py-2.5 py-2 px-3 rounded outline-primary border border-gray-500/40 resize-none" placeholder="Type here"></textarea>
                </div>

                {/* product category */}
                <div className="w-full flex flex-col gap-1">
                    <label className="text-base font-medium" htmlFor="category">Category</label>
                    <select onChange={(e) => { setCategory(e.target.value) }} value={category} id="category" className="md:py-2.5 py-2 px-3 rounded outline-primary border border-gray-500/40">
                        <option value="">Select Category</option>
                        {categories.map((item, index) => (
                            <option key={index} value={item.path}>{item.path}</option>
                        ))}
                    </select>
                </div>

                {/* product price or offerprice */}
                <div className="flex items-center gap-5 flex-wrap">
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="product-price">Product Price</label>
                        <input onChange={(e) => { setPrice(e.target.value) }} value={price} id="product-price" type="number" placeholder="0" className="md:py-2.5 py-2 px-3 rounded outline-primary border border-gray-500/40" required />
                    </div>
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="offer-price">Offer Price</label>
                        <input onChange={(e) => { setOfferPrice(e.target.value) }} value={offerPrice} id="offer-price" type="number" placeholder="0" className="md:py-2.5 py-2 px-3 rounded outline-primary border border-gray-500/40" required />
                    </div>
                </div>

                {/* gender or size */}
                {category === "Clothing" && (
                    <div className="flex items-center gap-5 flex-wrap">
                        <div className="flex-1 flex flex-col gap-1 w-32">
                            <label className="text-base font-medium" htmlFor="product-gender">Product Gender</label>
                            <select onChange={(e) => { setGender(e.target.value) }} value={gender} id="gender" className="md:py-2.5 py-2 px-3 rounded outline-primary border border-gray-500/40">
                                <option value="">Select Category</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Unisex">Unisex</option>
                            </select>
                        </div>
                        <div className="flex-1 flex flex-col gap-1 w-32">
                            <label className="text-base font-medium" htmlFor="product-size">Product Size</label>
                            <input onChange={handleSizeInput} value={sizeInput} id="size" type="text" placeholder="M,L,XL,.." className="md:py-2.5 py-2 px-3 rounded outline-primary border border-gray-500/40" required />
                        </div>
                    </div>
                )}

                <button className="px-8 py-2.5 bg-primary hover:bg-primary-dull text-white font-medium rounded cursor-pointer">ADD</button>

            </form>
        </div>
    );
}

export default AddProduct
