import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import { useParams } from 'react-router-dom';
import { Star } from 'lucide-react';
import Title from '../components/Title';
import ProductCard from '../components/ProductCard';

const ProductDetails = () => {

    const { user, products, currency, addToCart } = useContext(ShopContext)
    const { id } = useParams()

    const [relatedProducts, setRelatedProducts] = useState([])
    const [image, setImage] = useState(null);
    const [size, setSize] = useState("");

    const product = products.find((item) => item._id === id);

    useEffect(() => {
        if (products.length > 0 && product) {
            let productsCopy = products.slice();

            productsCopy = productsCopy.filter((item) => product.category.toLowerCase() === item.category.toLowerCase())
            setRelatedProducts(productsCopy.slice(0, 5))
        }
    }, [products, product])

    // set default/main image when product loads
    useEffect(() => {
        if (product && product.image && product.image.length > 0) {
            setImage(product.image[0]);
        }
    }, [product])

    return product && product.seller.status === "Active" ? (
        <div className="mt-16">

            {/* Product Data */}
            <div className="flex gap-2 sm:gap-12 flex-col sm:flex-row">

                {/* Product Images */}
                <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
                    <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
                        {product.image.map((item, index) => (
                            <img onClick={() => setImage(item)} src={item} key={index} className="w-[24%] sm:w-full sm:mb-3 shrink-0 cursor-pointer " alt="" />
                        ))}
                    </div>
                    <div className="w-full sm:w-[80%]">
                        <img className="w-full h-auto" src={image} alt="" />
                    </div>
                </div>

                {/* Product Info */}
                <div className="flex-1 ">
                    <h3 className="font-medium text-gray-500/70 text-base mt-2">{product.seller.shopName}</h3>
                    <h1 className="font-medium text-2xl mt-1">{product.name}</h1>

                    <div className="flex items-center gap-1 mt-2 ">
                        <Star className="w-4.5 h-4.5 fill-orange-600 text-orange-600"/>
                        <Star className="w-4.5 h-4.5 fill-orange-600 text-orange-600"/>
                        <Star className="w-4.5 h-4.5 fill-orange-600 text-orange-600"/>
                        <Star className="w-4.5 h-4.5 fill-orange-600 text-orange-600"/>
                        <Star className="w-4.5 h-4.5 text-orange-600"/>
                        <p className="pl-2">(122)</p>
                    </div>


                    <div className="mt-6">
                        <p className="text-gray-500/70 line-through">MRP: {currency}{product.price}</p>
                        <p className="text-2xl font-medium">MRP: {currency}{product.offerPrice}</p>
                        <span className="text-gray-500/70">(inclusive of all taxes)</span>
                    </div>

                    <p className="text-base font-medium mt-6">About Product</p>
                    <p className=" text-gray-500/70 md:w-4/5 ">{product.description}</p>

                    {product.sizes && product.sizes.length > 0 && (
                        <div className="flex flex-col gap-4">
                            <p>Select Size</p>
                            <div className="flex gap-2">
                                {
                                    product.sizes.map((item, index) => (
                                        <button onClick={() => setSize(item)} className={`border py-2 px-4 bg-gray-100 cursor-pointer rounded ${item === size ? "border-orange-500" : ""}`} key={index}>{item}</button>
                                    ))
                                }
                            </div>
                        </div>
                    )}


                    {user && <div className="mt-10 text-base">
                        <button onClick={() => addToCart(product._id, size)} className="w-[50%] py-3.5 cursor-pointer text-lg font-medium border bg-primary/10 border-primary/40 text-primary" >
                            Add to Cart
                        </button>
                    </div>}

                    <hr className="mt-8 sm:w-4/5" />

                    <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
                        <p>100% Original products.</p>
                        <p>Cash on delivery is available on ths products.</p>
                        <p>Easy return and exchange policy within 7 days.</p>
                    </div>

                </div>

            </div>


            {/* related product */}
            <div className="flex flex-col item-center mt-20">
                <div className="text-2xl md:text-3xl text-center">
                    <Title text={"Related Products"} />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 mt-6">
                    {relatedProducts.filter((product) => product.inStock && product.seller.status === "Active").map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}
                </div>
            </div>

        </div>
    ) : null
}

export default ProductDetails
