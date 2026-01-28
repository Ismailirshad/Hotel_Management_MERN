import { useState } from 'react'
import { facilityIcons } from '../assets/assets'
import { assets } from '../assets/assets'
import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { roomStore } from '../store/useRoomStore.js'
import React from 'react'

const AllRooms = () => {
    const [openFilter, setOpenFilter] = useState(false);
    const { fetchAllRooms, rooms } = roomStore();
    const [seletedeRoomTypes, setSelectedRoomTypes] = useState([])
    const [selectedPriceRange, setSelectedPriceRange] = useState("null")
    const [selectedSort, setSelectedSort] = useState("null")

    const { id } = useParams();

    const roomTypes = ["Single Bed", "Double Bed", "Suite", "Deluxe"]
    const priceRanges = ["$50 - $150", "$151 - $300", "$301 - $500", "$501+"]
    const sortOptions = ["Price: Low to High", "Price: High to Low", "Rating", "Popularity"]

    useEffect(() => {
        fetchAllRooms();
    }, [])

    let filteredRooms = [...rooms];

    if (id) {
        filteredRooms = filteredRooms.filter(room =>
            room.hotel._id === id
        )
    }

    if (seletedeRoomTypes.length > 0) {
        filteredRooms = filteredRooms.filter(room =>
            seletedeRoomTypes.includes(room.roomType)
        )
    }

    if (selectedPriceRange !== "null") {
        filteredRooms = filteredRooms.filter(room => {
            const price = room.pricePerNight;

            if (selectedPriceRange === "$50 - $150") {
                return price >= 50 && price <= 150;
            }

            if (selectedPriceRange === "$151 - $300") {
                return price >= 151 && price <= 300;
            }

            if (selectedPriceRange === "$301 - $500") {
                return price >= 301 && price <= 500;
            }

            if (selectedPriceRange === "$501+") {
                return price >= 501;
            }

            return true;
        });
    }

    if (selectedSort === "Price: Low to High") {
        filteredRooms.sort((a, b) => a.pricePerNight - b.pricePerNight)
    }

    if (selectedSort === "Price: High to Low") {
        filteredRooms.sort((a, b) => b.pricePerNight - a.pricePerNight)
    }

    if (selectedSort === "Rating") {
        filteredRooms.sort((a, b) => b.hotel.rating - a.hotel.rating)
    }




    console.log("rooms is", rooms)
    console.log("ROOM HOTEL:", rooms[0]?.hotel);

    // return (
    //     <div className='w-full min-h-screen'>
    //         <div className="max-w-7xl flex flex-row mx-auto pt-18 ">

    //             <div className="flex flex-col w-full  md:w-3/4 p-8 relative">
    //                 <div className="flex flex-col gap-5 pb-5">
    //                     <h1 className="text-4xl">Hotel Rooms</h1>
    //                     <p className="text-md">Take advantage of our limited-time offers and special package <br /> to enhance your stay and comfort in our hotel rooms.</p>
    //                 </div>
    //                 <div className="grid grid-rows-1 gap-4">
    //                     {filteredRooms.map((room, index) => (
    //                         <div className="flex flex-row gap-4 border-gray-400/40 border-b  p-5">
    //                             <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg my-4">
    //                                 <Link to={`/roomDetails/${room._id}`}>
    //                                     <img className="w-full h-48 object-cover cursor-pointer" src={room.images[0]} alt={room.name} />
    //                                 </Link>
    //                             </div>
    //                             <div className="flex flex-col justify-center items-start space-y-3 ">
    //                                 <p className="text-gray-800/40">{room.hotel.city || "Sam Diego, USA"}</p>
    //                                 <Link to={`/hotelDetails/${room?.hotel?._id}`}>
    //                                     <h2 className="text-2xl font-bold cursor-pointer">{room.hotel.name}</h2>
    //                                 </Link>
    //                                 <p >
    //                                     {[1, 2, 3, 4, 5].map((star) => (
    //                                         <span key={star}
    //                                             className={`cursor-pointer text-2xl ${star <= room.hotel.rating ? "text-yellow-400" : "text-gray-300"}`}
    //                                         >
    //                                             ★
    //                                         </span>
    //                                     ))}
    //                                     <span className='text-black px-2'>{room.hotel.ratingCount}+ reviews</span>
    //                                 </p>
    //                                 <p className='text-gray-800/40'>{room.hotel.address}</p>
    //                                 <div className="flex flex-row gap-2">
    //                                     {room.amenities.map((item, idx) => (
    //                                         <div key={idx} className="flex flex-row items-center gap-1 border-gray-400/40 border p-1 rounded">
    //                                             <img
    //                                                 src={facilityIcons[item]}
    //                                                 alt={item}
    //                                                 className="w-4 h-4 object-contain"
    //                                             />
    //                                             <span>{item} </span>
    //                                         </div>
    //                                     ))}
    //                                 </div>
    //                                 <p className="text-lg mt-2">Price per night: <span className="font-bold text-xl">${room.pricePerNight}</span></p>
    //                             </div>

    //                         </div>

    //                     ))}
    //                 </div>
    //             </div>

    //             {/* filter section  */}
    //             <button
    //                 className="md:hidden px-4 py-10 absolute top-4 right-4 text-black rounded w-fit  "
    //                 onClick={() => setOpenFilter(!openFilter)}
    //             >
    //                 <img src={assets.listIcon} className={`p-2 ${openFilter ? "hidden" : "block"}`} alt="" />
    //             </button>

    //             <div className={` ${openFilter ? "block" : "hidden"} bg-white shadow-lg transition-all  duration-300  ease-in-out absolute  overflow-hidden md:flex  md:w-1/4  md:text-lg 
    //              right-5 h-full flex justify-between border-b  flex-col p-10 gap-6 border`}>
    //                 <div className="flex flex-row justify-between items-center border-b pb-4">
    //                     <h2 className="text-xl md:text-3xl">Filters</h2>
    //                     <p o className='text-lg '>Clear</p>
    //                     <p className='md:hidden absolute top-0 right-2' onClick={() => setOpenFilter(!openFilter)}>Close</p>
    //                 </div>

    //                 {/* Room Type (Checkbox) */}
    //                 <div className="flex flex-col gap-2 justify-center">
    //                     <p className="font-semibold">Room Type</p>

    //                     {roomTypes.map((type, i) => (
    //                         <label key={i} className="flex items-center gap-2 cursor-pointer">
    //                             <input
    //                                 type="checkbox"
    //                                 className="w-4 h-4"
    //                                 checked={seletedeRoomTypes.includes(type)}
    //                                 onChange={() => {
    //                                     setSelectedRoomTypes(prev => {
    //                                         if (prev.includes(type)) {
    //                                             return prev.filter(t => t !== type)
    //                                         } else {
    //                                             return [...prev, type]
    //                                         }
    //                                     })
    //                                 }}
    //                             />
    //                             <span>{type}</span>
    //                         </label>
    //                     ))}
    //                 </div>

    //                 {/* Price Range (Radio Button) */}
    //                 <div className="flex flex-col gap-2">
    //                     <p className="font-semibold">Price Range</p>

    //                     {priceRanges.map((range, i) => (
    //                         <label key={i} className="flex items-center gap-2 cursor-pointer">
    //                             <input
    //                                 type="radio"
    //                                 name="priceRange"
    //                                 className="w-4 h-4"
    //                                 checked={selectedPriceRange === range}
    //                                 onChange={() => { setSelectedPriceRange(range) }}
    //                             />
    //                             <span>{range}</span>
    //                         </label>
    //                     ))}
    //                 </div>

    //                 {/* Sort By (Radio Button) */}
    //                 <div className="flex flex-col gap-2">
    //                     <p className="font-semibold">Sort By</p>

    //                     {sortOptions.map((sort, i) => (
    //                         <label key={i} className="flex items-center gap-2 cursor-pointer">
    //                             <input
    //                                 type="radio"
    //                                 name="sort"
    //                                 className="w-4 h-4"
    //                                 checked={selectedSort === sort}
    //                                 onChange={() => { setSelectedSort(sort) }}
    //                             />
    //                             <span>{sort}</span>
    //                         </label>
    //                     ))}
    //                 </div>

    //             </div>

    //         </div>


    //     </div>
    // )
    return (
        <section className="bg-slate-50 min-h-screen pt-24">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* ================= FILTER PANEL (DESKTOP) ================= */}
                <aside className="hidden lg:block bg-white rounded-2xl shadow-sm p-6 h-fit sticky top-28">
                    <h2 className="text-xl font-semibold text-slate-800 mb-6">
                        Filters
                    </h2>
                    

                    <button
                        className="md:hidden px-4 py-10 absolute top-4 right-4 text-black rounded w-fit  "
                        onClick={() => setOpenFilter(!openFilter)}
                    >
                        <img src={assets.listIcon} className={`p-2 ${openFilter ? "hidden" : "block"}`} alt="" />
                    </button>

                    {/* Room Type */}
                    <div className="space-y-3 mb-6">
                        <p className="font-medium text-slate-700">Room Type</p>
                        {roomTypes.map(type => (
                            <label key={type} className="flex items-center gap-2 text-sm text-slate-600">
                                <input
                                    type="checkbox"
                                    checked={seletedeRoomTypes.includes(type)}
                                    onChange={() =>
                                        setSelectedRoomTypes(prev =>
                                            prev.includes(type)
                                                ? prev.filter(t => t !== type)
                                                : [...prev, type]
                                        )
                                    }
                                />
                                {type}
                            </label>
                        ))}
                    </div>

                    {/* Price */}
                    <div className="space-y-3 mb-6">
                        <p className="font-medium text-slate-700">Price Range</p>
                        {priceRanges.map(range => (
                            <label key={range} className="flex items-center gap-2 text-sm text-slate-600">
                                <input
                                    type="radio"
                                    name="price"
                                    checked={selectedPriceRange === range}
                                    onChange={() => setSelectedPriceRange(range)}
                                />
                                {range}
                            </label>
                        ))}
                    </div>

                    {/* Sort */}
                    <div className="space-y-3">
                        <p className="font-medium text-slate-700">Sort By</p>
                        {sortOptions.map(sort => (
                            <label key={sort} className="flex items-center gap-2 text-sm text-slate-600">
                                <input
                                    type="radio"
                                    name="sort"
                                    checked={selectedSort === sort}
                                    onChange={() => setSelectedSort(sort)}
                                />
                                {sort}
                            </label>
                        ))}
                    </div>
                </aside>

                {/* ================= ROOM LIST ================= */}
                <main className="lg:col-span-3 space-y-6">

                    {/* HEADER */}
                    <div className="space-y-2">
                        <h1 className="text-3xl font-semibold text-slate-900">
                            Available Rooms
                        </h1>
                        <p className="text-slate-600">
                            Choose from the best rooms available for your stay
                        </p>
                    </div>

                    {/* ROOMS */}
                    <div className="space-y-5">
                        {filteredRooms.map(room => (
                            <Link
                                to={`/roomDetails/${room._id}`}
                                key={room._id}
                                className="group block"
                            >
                                <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition flex gap-5 p-5">

                                    {/* IMAGE */}
                                    <div className="w-40 h-32 rounded-xl overflow-hidden flex-shrink-0">
                                        <img
                                            src={room.images[0]}
                                            alt={room.roomType}
                                            className="w-full h-full object-cover group-hover:scale-105 transition"
                                        />
                                    </div>

                                    {/* INFO */}
                                    <div className="flex-1 space-y-2">
                                        <h2 className="text-lg font-semibold text-slate-900">
                                            {room.roomType}
                                        </h2>

                                        <p className="text-sm text-slate-500">
                                            📍 {room.hotel.city} · {room.hotel.name}
                                        </p>

                                        {/* Rating */}
                                        <div className="flex items-center gap-1 text-sm">
                                            {[1, 2, 3, 4, 5].map(star => (
                                                <span
                                                    key={star}
                                                    className={star <= room.hotel.rating ? "text-amber-400" : "text-slate-300"}
                                                >
                                                    ★
                                                </span>
                                            ))}
                                            <span className="text-slate-500 ml-2">
                                                {room.hotel.ratingCount}+ reviews
                                            </span>
                                        </div>

                                        {/* Amenities */}
                                        <div className="flex flex-wrap gap-2 pt-2">
                                            {room.amenities.slice(0, 3).map((item, idx) => (
                                                <span
                                                    key={idx}
                                                    className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600"
                                                >
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* PRICE */}
                                    <div className="text-right flex flex-col justify-between">
                                        <p className="text-xl font-semibold text-slate-900">
                                            ₹{room.pricePerNight}
                                        </p>
                                        <span className="text-sm text-slate-500">per night</span>

                                        <span className="mt-2 inline-block px-4 py-1.5 rounded-full text-sm bg-emerald-100 text-emerald-700">
                                            View Room
                                        </span>
                                    </div>

                                </div>
                            </Link>
                        ))}
                    </div>

                </main>

                
            </div>
        </section>
    )

}

export default AllRooms
