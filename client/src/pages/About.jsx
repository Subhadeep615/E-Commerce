import React from 'react'
import { assets } from '../assets/assets'
import Title from '../components/Title'

const About = () => {
    return (
        <div>
            <div className="text-2xl text-center pt-8">
                <Title text={"ABOUT US"} />
            </div>

            <div className="my-10 flex flex-col lg:flex-row gap-16">
                <img className="w-full lg:max-w-[450px] rounded" src={assets.about_img} alt="" />
                <div className="flex flex-col justify-center gap-6 lg:w-2/4 text-gray-600">

                    <p>At ZippyMall, we believe shopping should be fast, simple, and enjoyable. As a one-stop online marketplace, we bring together a wide range of products—from fashion and electronics to home essentials and lifestyle items—making it easy for customers to find everything they need in one place. With a user-friendly interface, secure payments, and reliable delivery services, ZippyMall ensures a seamless shopping experience for everyone.</p>

                    <b className="text-gray-800">Our Mission</b>

                    <p>Our mission is to deliver quality products at affordable prices while building trust and convenience for our customers. We are constantly expanding our collections, offering exciting deals, and partnering with trusted brands to keep your shopping experience fresh and valuable. At ZippyMall, its not just about buying—its about enjoying the journey of discovering new trends, smart choices, and unbeatable value, all from the comfort of your home.</p>

                </div>
            </div>
            <div className="text-xl py-4">
                <Title text={"WHY CHOOSE US"} />
            </div>
            <div className="flex flex-col lg:flex-row text-sm mb-20">

                <div className="border border-gray-300 px-10 lg:px-16 py-20 flex flex-col gap-5">
                    <b className="text-base">Quality Assurance:</b>
                    <p className="text-gray-600">At ZippyMall, every product goes through strict quality checks to ensure you receive only the best. We are committed to offering reliable and durable items that meet your expectations.</p>
                </div>

                <div className="border border-gray-300 px-10 lg:px-16 py-20 flex flex-col gap-5">
                    <b className="text-base">Convenience:</b>
                    <p className="text-gray-600">Shop anytime, anywhere with ZippyMall’s easy-to-use platform. From browsing to checkout, we make your shopping journey smooth, fast, and hassle-free.</p>
                </div>

                <div className="border border-gray-300 px-10 lg:px-16 py-20 flex flex-col gap-5">
                    <b className="text-base">Exceptional Customer Service:</b>
                    <p className="text-gray-600">Our support team is always ready to help. At ZippyMall, we believe in building trust through quick responses, personalized assistance, and customer-first service.</p>
                </div>
            </div>
        </div>
    )
}

export default About
