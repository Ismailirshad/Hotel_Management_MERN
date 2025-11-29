import React from 'react'
import { exclusiveOffers } from '../assets/assets.js'

const ExclusiveOffer = () => {
    return (
        <div id="offers" className='min-h-screen bg-slate-200/70 w-full '>
            <div className="max-w-7xl pt-52 pb-16 flex flex-col mx-auto ">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <h1 className="text-4xl font-bold text-white">Exclusive Offer</h1>
                        <p>Take advantage of our special limited-offer and special packages <br /> to enhance your stay with us</p>
                    </div>
                    <button className="px-3 py-1.5 bg-white rounded-full text-sm ">View All Offers</button>

                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
                    {exclusiveOffers.map((offer, index) => (

                        <div
                            key={index}
                            className="relative rounded-xl overflow-hidden shadow-lg group"
                        >
                            {/* Image */} 
                            <img
                                src={offer.image}
                                alt={offer.title}
                                className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                            />

                            {/* Gradient + Text Overlay */}
                            <div className="absolute inset-0 bg-liniear-to-t from-black/70 to-transparent p-4 flex flex-col justify-end">
                                <h2 className="text-white text-xl font-semibold">
                                    {offer.title}
                                </h2>

                                <p className="text-gray-200 text-sm">
                                    {offer.description}
                                </p>

                                <p className="text-yellow-300 font-bold text-sm mt-1">
                                    Get {offer.priceOff}% Off
                                </p>

                                <p className="text-red-300 text-xs">
                                    Expires on: {offer.expiryDate}
                                </p>
                            </div>

                            {/* Optional Badge */}
                            <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-md text-sm font-semibold shadow-md">
                                {offer.priceOff}% OFF
                            </div>
                        </div>

                    ))}
                </div>


            </div>
        </div>
    )
}

export default ExclusiveOffer
