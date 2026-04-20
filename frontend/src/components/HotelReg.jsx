import { useState } from 'react'
import { assets, cities } from '../assets/assets'
import { hotelStore } from '../store/useHotelStore.js'
import { useRef } from 'react'

const HotelReg = () => {
    const { registerHotel } = hotelStore()
    const imgRef = useRef(null)
    const [hotel, setHotel] = useState({
        name: '',
        phone: '',
        address: '',
        description: '',
        contact: '',
        image: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        registerHotel(hotel)
    }

    const handleImageSubmit = (e) => {
        const file = e.target.files[0];
        if(!file) return;

            const reader = new FileReader();
            reader.onloadend = () => {
                setHotel((prev) => ({ ...prev, image: reader.result }));
            };
            reader.readAsDataURL(file); 
    }


    return (
        <div className='fixed z-100 top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black/70'>
            <form onSubmit={handleSubmit} className="flex bg-white rounded-xl max-w-4xl max-md:mx-2">
                <img src={assets.regImage} alt="Register Image" loading="lazy" className='w-1/2 rounded-xl hidden md:block' />

                <div className="relative  flex flex-col items-center md:w-1/2 p-8 md:p-10 ">
                    <img src={assets.closeIcon} alt="close-icon" loading="lazy" className='absolute top-4 right-4 h-4 w-4 cursor-pointer' />
                    <p className="text-2xl font-semibold mt-6">Register Your Hotel</p>


                    <div className="flex flex-col w-full justify-start pt-5 py-2   items-start ">
                        <label htmlFor="name" className='px-2 text-md text-gray-600'>Hotel Name</label>
                        <input value={hotel.name} onChange={(e) => setHotel({ ...hotel, name: e.target.value })} type="text" className='border border-gray-400/40 text-sm outline-indigo-500/70 font-light w-full p-2' placeholder='Enter Hotel Name' />
                    </div>
                    <div className="flex flex-col w-full justify-start py-2  items-start ">
                        <label htmlFor="number" className='px-2 text-md text-gray-600'>Phone</label>
                        <input value={hotel.contact} onChange={(e) => setHotel({ ...hotel, contact: e.target.value })} type="number" className='border border-gray-400/40 text-sm outline-indigo-500/70 font-light w-full p-2' placeholder='Enter Phone Number' />
                    </div>
                    <div className="flex flex-col w-full justify-start  items-start ">
                        <label htmlFor="address" className='px-2 text-md text-gray-600'>Address</label>
                        <input value={hotel.address} onChange={(e) => setHotel({ ...hotel, address: e.target.value })} type="text" className='border border-gray-400/40 text-sm outline-indigo-500/70 font-light w-full p-2' placeholder='Enter address' />
                    </div>
                     <div className="flex flex-col w-full justify-start  items-start ">
                        <label htmlFor="address" className='px-2 text-md text-gray-600'>Description</label>
                        <input value={hotel.description} onChange={(e) => setHotel({ ...hotel, description: e.target.value })} type="text" className='border border-gray-400/40 text-sm outline-indigo-500/70 font-light w-full p-2' placeholder='Enter description' />
                    </div>
                    <div className="flex flex-col w-full justify-start py-2  items-start ">
                        <label htmlFor="city" className='px-2 text-md text-gray-600'>City</label>
                        <select name="city" id="city" value={hotel.city} onChange={(e) => setHotel({ ...hotel, city: e.target.value })} className='border border-gray-400/40 text-sm outline-indigo-500/70 font-light w-full p-2'>
                            <option className='text-gray-400'>Select City</option>
                          {cities.map((city) => (   
                                <option key={{ city }} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col w-full justify-start py-2  items-start ">
                        <label htmlFor="image" className='px-2 text-md text-gray-600' >Hotel Image</label>
                        <div onClick={() => imgRef.current.click()} className='border border-gray-400/40 text-sm outline-indigo-500/70 font-light w-1/3 p-2'>
                             <img  className='max-h-13 cursor-pointer opacity-80'  src={hotel.image || assets.uploadArea} alt="Hotel Image" loading="lazy"  required />
                            <input onChange={handleImageSubmit} type="file" accept='image/*' ref={imgRef} className='sr-only' />
                        </div>
                    </div>
                    <button type="submit" className='bg-indigo-500 hover:bg-indigo-600 transition-all text-white mr-auto cursor-pointer px-6 py-2 rounded-xl mt-6'>Register</button>
                </div>

            </form>

        </div>
    )
}

export default HotelReg
