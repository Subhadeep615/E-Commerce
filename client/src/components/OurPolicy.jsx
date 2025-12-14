import React from 'react'
import { BadgeCheck, Headset, Repeat } from 'lucide-react'

const OurPolicy = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 mt-10 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700" >

            <div>
                <Repeat className="w-12 h-12 m-auto mb-5 text-gray-900" />
                <p className="font-semibold">Easy Exchange Policy</p>
                <p className="text-gray-400">We offer hasle free exchange policy</p>
            </div>

            <div>
                <BadgeCheck className="w-12 h-12 m-auto mb-5 text-gray-900" />
                <p className="font-semibold">7 Day Return Policy</p>
                <p className="text-gray-400">We provide 7 days free return policy</p>
            </div>

            <div>
                <Headset className="w-12 h-12 m-auto mb-5 text-gray-900" />
                <p className="font-semibold">Best Customer Support</p>
                <p className="text-gray-400">We provide 24/7 customer support</p>
            </div>

        </div>
    )
}

export default OurPolicy
