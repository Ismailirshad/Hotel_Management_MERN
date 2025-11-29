import React, { useState } from 'react'
import { assets, userBookingsDummyData } from '../assets/assets.js'

const MyBookings = () => {
    const [bookings, setBookings] = useState(userBookingsDummyData);
    return (
        <div className='w-full min-h-screen'>
            <div className="max-w-7xl flex flex-col mx-auto py-24 ">
                <div className="flex flex-col w-full  md:w-3/4 relative">
                    <div className="flex flex-col gap-5 pb-5">
                        <h1 className="text-4xl">My Bookings</h1>
                        <p className="text-md">Easily manage your past, current, and upcoming hotel reservations in one place<br />
                            Plan your trips seamlessly with just a few clicks.</p>
                    </div>
                </div>

                <div className=" mt-8 w-full   px-8 text-gray-800">
                    <div className="hidden md:grid grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-base py-3">
                        <div className="w-1/3">Hotels</div>
                        <div className="w-1/3">Date & Timings</div>
                        <div className="w-1/3">Payments</div>
                    </div>
                </div>

                {bookings.map((booking) => (
                    <div key={booking._id} className='grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] border-b     border-gray-300 py-6 first:border-t' >
                        {/* Hotel Details  */}
                        <div className='flex flex-col md:flex-row bg-white  ' >
                            <img src={booking.room.images[0]} alt="roomImage" className='md:w-44 rounded shadow object-cover ' />
                            <div className="flex flex-col gap-1.5 max-md:mt-3 md:ml-4">
                                <p className='text-2xl font-playfair'>{booking.hotel.name}
                                    <span className='font-inter text-sm'> [{booking.room.roomType}]</span>
                                </p>
                                <div className="flex">
                                    <img src={assets.locationIcon} alt="" />
                                    <span className='text-sm text-gray-400'>{booking.hotel.address}</span>
                                </div>
                                <div className="flex space-x-2 items-center">
                                    <img src={assets.guestsIcon} alt="" />
                                    <span className='text-sm text-gray-400'>Guests: {booking.guests}</span>
                                </div>
                                <p>Total: ${booking.totalPrice}</p>
                            </div>
                        </div>
                        {/* Date & Timings  */}
                        <div className='   flex justify-start items-center space-x-3 '>
                            <div className="flex flex-col ">
                                <p className='font-medium'>Check-In:</p>
                                <p className='text-gray-800/40'>{new Date(booking.checkInDate).toDateString()}</p>
                            </div>
                             <div className="flex flex-col">
                                <p className='font-medium'>Check-Out</p>
                                <p className='text-gray-800/40'>{new Date(booking.checkOutDate).toDateString()}</p>
                            </div>
                        </div>
                        {/* Payments  */}
                        <div className=' flex flex-col justify-start pt-8'>
                            <div className="flex items-center gap-2">
                                <div className={`h-3 w-3 rounded-full ${booking.isPaid ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                <p className={`text-sm ${booking.isPaid ? 'text-green-600' : 'text-red-600'}`}>{booking.isPaid ? 'Paid' : 'Pending'}</p>
                                {!booking.isPaid && (
                                     <button className='bg-green-500 px-2 py-1  rounded-xl text-sm'>Pay Now</button>
                                )}
                            </div>
                        </div>
                    </div>

                ))}


            </div>
        </div>
    )
}

export default MyBookings
