import React, { useState } from 'react'
import { roomsDummyData } from '../assets/assets'
import { facilityIcons } from '../assets/assets'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const AllRooms = () => {
    const [openFilter, setOpenFilter] = useState(false);

    const roomTypes = ["Single Bed", "Double Bed", "Suite", "Family Room"]
    const priceRanges = ["$50 - $150", "$151 - $300", "$301 - $500", "$501+"]
    const sortOptions = ["Price: Low to High", "Price: High to Low", "Rating", "Popularity"]

    return (
        <div className='w-full min-h-screen'>
            <div className="max-w-7xl flex flex-row mx-auto pt-18 ">
                <div className="flex flex-col w-full  md:w-3/4 p-8 relative">
                    <div className="flex flex-col gap-5 pb-5">
                        <h1 className="text-4xl">Hotel Rooms</h1>
                        <p className="text-md">Take advantage of our limited-time offers and special package <br /> to enhance your stay and comfort in our hotel rooms.</p>
                    </div>
                    <div className="grid grid-rows-1 gap-4">
                        {roomsDummyData.map((room, index) => (
                            <div className="flex flex-row gap-4 border-gray-400/40 border-b  p-5">
                                <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg my-4">
                                    <Link to={`/roomDetails/${room._id}`}>
                                    <img className="w-full h-48 object-cover cursor-pointer" src={room.images[0]} alt={room.name} />
                                    </Link>
                                </div>
                                <div className="flex flex-col justify-center items-start space-y-3 ">
                                    <p className="text-gray-800/40">{room.hotel.city || "Sam Diego, USA"}</p>
                                    <Link to={`/hotelDetails/${room._id}`}>
                                    <h2 className="text-2xl font-bold cursor-pointer">{room.hotel.name}</h2>
                                    </Link>
                                    <p className='text-bold text-red-400'>{room.rating || "5"} ⭐ <span className='text-black'>{room.reviews || "233"}+ reviews</span>  </p>
                                    <p className='text-gray-800/40'>{room.hotel.address}</p>
                                    <div className="flex flex-row gap-2">
                                        {room.amenities.map((item, idx) => (
                                            <div key={idx} className="flex flex-row items-center gap-1 border-gray-400/40 border p-1 rounded">
                                                <img
                                                    src={facilityIcons[item]}
                                                    alt={item}
                                                    className="w-4 h-4 object-contain"
                                                />
                                                <span>{item} </span>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-lg mt-2">Price per night: <span className="font-bold text-xl">${room.pricePerNight || "150"}</span></p>
                                </div>

                            </div>

                        ))}
                    </div>
                </div>

                {/* filter section  */}
                <button
                    className="md:hidden px-4 py-10 absolute top-4 right-4 text-black rounded w-fit  "
                    onClick={() => setOpenFilter(!openFilter)}
                >
                   <img src={assets.listIcon} className={`p-2 ${openFilter ? "hidden" : "block"}`} alt="" />  
                </button>

                <div className={` ${openFilter ? "block" : "hidden"} bg-white shadow-lg transition-all  duration-300  ease-in-out absolute  overflow-hidden md:flex  md:w-1/4  md:text-lg 
                 right-5 h-full flex justify-between border-b  flex-col p-10 gap-6 border`}>
                    <div className="flex flex-row justify-between items-center border-b pb-4">
                    <h2 className="text-xl md:text-3xl">Filters</h2>
                    <p o className='text-lg '>Clear</p>
                    <p  className='md:hidden absolute top-0 right-2' onClick={() => setOpenFilter(!openFilter)}>Close</p>
                    </div>

                    {/* Room Type (Checkbox) */}
                    <div className="flex flex-col gap-2 justify-center">
                        <p className="font-semibold">Room Type</p>

                        {roomTypes.map((type, i) => (
                            <label key={i} className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4"
                                // onChange={() => {}}
                                />
                                <span>{type}</span>
                            </label>
                        ))}
                    </div>

                    {/* Price Range (Radio Button) */}
                    <div className="flex flex-col gap-2">
                        <p className="font-semibold">Price Range</p>

                        {priceRanges.map((range, i) => (
                            <label key={i} className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="priceRange"
                                    className="w-4 h-4"
                                // onChange={() => {}}
                                />
                                <span>{range}</span>
                            </label>
                        ))}
                    </div>

                    {/* Sort By (Radio Button) */}
                    <div className="flex flex-col gap-2">
                        <p className="font-semibold">Sort By</p>

                        {sortOptions.map((sort, i) => (
                            <label key={i} className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="sort"
                                    className="w-4 h-4"
                                // onChange={() => {}}
                                />
                                <span>{sort}</span>
                            </label>
                        ))}
                    </div>

                </div>

            </div>


        </div>
    )
}

export default AllRooms
