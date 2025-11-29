import React from 'react'
import { Link } from 'react-router-dom'

const hotels = [{
    _id:'221222',
    name: 'Hotel 1',
    location: 'New York',
    pricePerNight: 150,
    imageUrl: 'https://tse1.mm.bing.net/th/id/OIP.434zpISOb40RJ--ePvgsJgHaE8?pid=Api&P=0&h=180',
    rating: 4.5,
},
{
    _id:'221w2w22w',
    name: 'Hotel 1',
    location: 'New York',
    pricePerNight: 150,
    imageUrl: 'https://tse1.mm.bing.net/th/id/OIP.434zpISOb40RJ--ePvgsJgHaE8?pid=Api&P=0&h=180',
    rating: 4.5,
},
{
    _id:'221w2w22w',
    name: 'Hotel 1',
    location: 'New York',
    pricePerNight: 150,
    imageUrl: 'https://tse1.mm.bing.net/th/id/OIP.434zpISOb40RJ--ePvgsJgHaE8?pid=Api&P=0&h=180',
    rating: 4.5,
},
{
    _id:'221w2w22w',
    name: 'Hotel 1',
    location: 'New York',
    pricePerNight: 150,
    imageUrl: 'https://tse1.mm.bing.net/th/id/OIP.434zpISOb40RJ--ePvgsJgHaE8?pid=Api&P=0&h=180',
    rating: 4.5,
},
]
const HotelCards = () => {
  return (
    <div id="hotels" className='min-h-screen bg-slate-50 pt-16 '>
        <div className="max-w-7xl mx-auto ">
            <div className="flex flex-col items-center">
                <div className="max-w-3xl text-center space-y-5">
                <h1 className="text-4xl">Featured Hotels</h1>
                <p className="text-lg">Our featured hotels provide modern rooms, friendly service, and great access to attractions, ensuring a smooth and enjoyable travel experience always.</p>
                </div>
            </div>

            
            <div className="grid md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 mt-10">
            {hotels.map((hotel, index) => (
            <Link to={`/hotelDetails/${hotel._id}`} key={index} >
                <div className="bg-white rounded-lg shadow-lg overflow-hidden   bg-liniear-to-t from-black/70 to-transparent transition-transform duration-300
                hover:scale-105">
                    <img src={hotel.imageUrl} alt={hotel.name} className="w-full h-48 object-cover"/>
                    <div className="p-4">
                        <h2 className="text-xl font-semibold mb-2">{hotel.name}</h2>
                        <p className="text-gray-600 mb-2">{hotel.location}</p>
                        <p className="text-gray-800 font-bold mb-2">${hotel.pricePerNight} per night</p>
                        <p className="text-yellow-500">Rating: {hotel.rating} ⭐</p>
                        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Book Now</button>
                        </div>
                </div>
            </Link>
            ))}
            </div>
        </div>
      
    </div>
  )
}

export default HotelCards
