import React from 'react'
import Hero from '../components/Hero'
import Categories from '../components/Categories'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'

const Home = () => {
    return (
        <div>
            <Hero />
            <Categories />
            <BestSeller />
            <OurPolicy />
        </div>
    )
}

export default Home
