import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useParams } from 'react-router-dom'
import { categories } from '../assets/assets'
import Title from '../components/Title'
import ProductCard from '../components/ProductCard'

const ProductCategory = () => {

    const { products } = useContext(ShopContext)
    const { category } = useParams()

    const searchCategory = categories.find((item) => item.path.toLowerCase() === category)

    const filteredProducts = products.filter((product) => product.category.toLowerCase() === category)

    return (
        <div className="mt-16">

            {/* heading */}
            {searchCategory && (
                <div className="text-2xl md:text-3xl capitalize">
                    <Title text={searchCategory.text.toLowerCase()} />
                </div>
            )}

            {/* product card */}
            {filteredProducts.length > 0 ? (

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 mt-6">
                    {filteredProducts.filter((product) => product.inStock && product.seller.status === "Active").map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}
                </div>

            ) : (

                <div className="flex items-center justify-center h-[60vh]">
                    <p className="text-2xl font-medium text-primary ">No Product found in this category.</p>
                </div>

            )}
        </div>
    )
}

export default ProductCategory
