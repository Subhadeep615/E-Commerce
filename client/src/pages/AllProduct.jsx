import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import ProductCard from '../components/ProductCard'


const AllProduct = () => {

    const { products, searchQuery } = useContext(ShopContext)
    const [filterProducts, setFilterProducts] = useState([])

    useEffect(() => {

        if (searchQuery.length > 0) {
            setFilterProducts(products.filter(
                (product) => product.name.toLowerCase().includes(searchQuery.toLowerCase())
            ))
        } else {
            setFilterProducts(products)
        }

    }, [products, searchQuery])

    return (
        <div className="mt-16 flex flex-col">
            <div className="text-2xl md:text-3xl">
                <Title text={"All Product"} />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 mt-6">
                {filterProducts.filter((product) => product.inStock && product.seller.status === "Active").map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
            </div>

        </div>
    )
}

export default AllProduct
