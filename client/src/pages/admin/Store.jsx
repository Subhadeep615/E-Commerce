import React, { useContext } from 'react'
import StoreCard from '../../components/admin/ShopCard'
import { ShopContext } from '../../context/ShopContext';

const Store = () => {
    const { allShop } = useContext(ShopContext);
    return (
        <div className="flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between bg-slate-50">
            <div className="w-full md:p-10 p-4">
                <h2 className="pb-4 text-lg font-medium">Live Store</h2>

                <div className="flex flex-col items-start gap-3 py-4 max-w-4xl w-full overflow-hidden rounded-md border-t border-gray-500/20">
                    {
                        allShop.filter((seller) => seller.isApproved).map((shop, idx) => (
                            <StoreCard key={idx} shop={shop} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Store
