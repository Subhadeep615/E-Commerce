import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import { MoveRight } from 'lucide-react'

const Hero = () => {
    return (
        <div className="flex flex-col justify-between sm:flex-row border border-gray-400">

            {/* Lift Side */}
            <div className="w-full sm:w-1/2 flex flex-col items-center justify-center py-10 sm:py-0">
                <div className="flex flex-col items-center justify-center">

                    <div className="flex items-center gap-2">
                        <p className="w-8 md:w-11 h-0.5 bg-gray-800"></p>
                        <p className="font-medium text-sm md:text-base">NEW SEASON</p>
                    </div>

                    <h1 className="text-3xl sm:py-3 lg:text-5xl leading-relaxed">Fresh Style</h1>

                </div>

                <Link to={"/products"} className="group flex items-center gap-2 px-7 md:px-9 py-3 bg-primary hover:bg-primary-dull transition rounded text-white cursor-pointer">
                    Shop Now
                    <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            {/* Right Side */}
            <img className="w-full sm:w-1/2" src={assets.hero_img} alt="" />
        </div>
    )
}

export default Hero
