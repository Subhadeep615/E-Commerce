import React, { useContext } from 'react'
import { categories } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'

const Categories = () => {

    const { navigate } = useContext(ShopContext);

    return (
        <div className="mt-16 ">

            <div className="text-2xl md:text-3xl">
                <Title text={"Categories"} />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 mt-6 gap-6">

                {categories.map((category, index) => (

                    <div key={index} className="group cursor-pointer py-5 px-3 gap-2 rounded-lg flex flex-col justify-center items-center" style={{ backgroundColor: category.bgColor }} onClick={() => { navigate(`/products/${category.path.toLowerCase()}`); scrollTo(0, 0) }}>
                        <img src={category.image} className="group-hover:scale-108 translate-max-w-28" alt="" />
                        <p className="text-sm font-medium text-center">{category.text}</p>
                    </div>

                ))}

            </div>
        </div>
    )
}

export default Categories
