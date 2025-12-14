import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import { Star } from 'lucide-react';

const ProductCard = ({ product }) => {

    const { currency, navigate } = useContext(ShopContext)

    return product && (

        <div onClick={() => { navigate(`/products/${product.category.toLowerCase()}/${product._id}`); scrollTo(0, 0) }} className="border border-gray-500/20 rounded-md bg-white max-w-56 w-full">

            {/* product image */}
            <div className="cursor-pointer w-full flex items-center justify-center">
                <img className="max-w-26 md:max-w-36" src={product.image[0]} alt="" />
            </div>

            <div className="text-gray-500/60 text-sm md:px-4 px-3 py-2">

                {/* product name */}
                <p>{product.seller.shopName}</p>
                <p className="text-gray-700 font-medium text-lg truncate w-full">{product.name}</p>

                {/* product rating */}
                <div className="flex items-center gap-0.5">
                    {Array(5).fill('').map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${ i < 4 ?"text-orange-600 fill-orange-600" : "text-orange-200 fill-orange-200"}`} />
                    ))}
                    <p>(4)</p>
                </div>


                <div className="flex items-end justify-between mt-3">

                    {/* product price */}
                    <p className="md:text-xl text-base font-medium text-primary">
                        {currency}{product.offerPrice}{" "} <span className="text-gray-500/60 md:text-sm text-xs line-through">{product.price}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};


export default ProductCard