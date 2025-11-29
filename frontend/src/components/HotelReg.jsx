import React from 'react'
import { assets, cities } from '../assets/assets'

const HotelReg = () => {
  return (
    <div className='fixed z-100 top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black/70'>
        <form className="flex bg-white rounded-xl max-w-4xl max-md:mx-2">
            <img src={assets.regImage} alt="" className='w-1/2 rounded-xl hidden md:block' />

            <div className="relative  flex flex-col items-center md:w-1/2 p-8 md:p-10 ">
                <img src={assets.closeIcon} alt="close-icon" className='absolute top-4 right-4 h-4 w-4 cursor-pointer'/>
                <p className="text-2xl font-semibold mt-6">Register Your Hotel</p>
      

            <div className="flex flex-col w-full justify-start pt-5 py-2   items-start ">
                <label htmlFor="name" className='px-2 text-md text-gray-600'>Hotel Name</label>
                <input type="text" className='border border-gray-400/40 text-sm outline-indigo-500/70 font-light w-full p-2' placeholder='Enter Hotel Name' />
            </div>
            <div className="flex flex-col w-full justify-start py-2  items-start ">
                <label htmlFor="number" className='px-2 text-md text-gray-600'>Phone</label>
                <input type="number" className='border border-gray-400/40 text-sm outline-indigo-500/70 font-light w-full p-2' placeholder='Enter Phone Number' />
            </div>
            <div className="flex flex-col w-full justify-start  items-start ">
                <label htmlFor="address" className='px-2 text-md text-gray-600'>Address</label>
                <input type="text" className='border border-gray-400/40 text-sm outline-indigo-500/70 font-light w-full p-2' placeholder='Enter address' />
            </div>
            <div className="flex flex-col w-full justify-start py-2  items-start ">
                <label htmlFor="city" className='px-2 text-md text-gray-600'>City</label>
                <select name="city" id="city" className='border border-gray-400/40 text-sm outline-indigo-500/70 font-light w-full p-2'>
                    <option value="" className='text-gray-400'>Select City</option>
                    {cities.map((city) => (
                          <option key={{city}} value={city}>{city}</option>
                    ))}
                </select>
            </div>
            <button className='bg-indigo-500 hover:bg-indigo-600 transition-all text-white mr-auto cursor-pointer px-6 py-2 rounded-xl mt-6'>Register</button>
       </div>
           
        </form>
      
    </div>
  )
}

export default HotelReg
