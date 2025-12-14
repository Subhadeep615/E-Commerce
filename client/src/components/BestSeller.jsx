import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductCard from './ProductCard'

const BestSeller = () => {

    const { products } = useContext(ShopContext)

    return (
        <div className="mt-16">
            <div className="text-2xl md:text-3xl">
                <Title text={"Best Seller"} />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6">
                {products.filter((product) => product.inStock && product.seller.status === "Active").slice(0, 5).map((product, idx) => (
                    <ProductCard key={idx} product={product} />
                ))}
            </div>
        </div>
    )
}

export default BestSeller
