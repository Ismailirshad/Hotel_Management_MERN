import React, { useState } from 'react'
import { assets } from '../../assets/assets'

const AddRoom = () => {
  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null
  })
  const [inputs, setInputs] = useState({
    roomType: "",
    pricePerNight: 0,
  })
  const amenityList = ["free wifi", "free breakfast", "mountain view", "pool access"];
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  return (
    <div className='flex flex-col'>

      <div className="max-w-3xl space-y-5">
        <h1 className="text-4xl">Add Room</h1>
        <p className="text-md">Monitor your room listings, track bookings and analyze revenue-all in one place <br />
          Stay updated with real time insights to ensure smooth operation</p>
      </div>

      <form action="">
        <div className="flex flex-col gap-4 ">
          <p className="text-gray-800 mt-10">Images</p>
          <div className="grid grid-cols-2 sm:flex gap-4 flex-wrap ">
            {Object.keys(images).map((key) => (
              <label htmlFor={`roomImages${key}`} key={key}>
                <img className='max-h-13 cursor-pointer opacity-80'
                  src={images[key] ? URL.createObjectURL(images[key]) : assets.uploadArea} alt="" />
                <input hidden type="file" accept='image/*' id={`roomImages${key}`}
                  onChange={e => setImages({ ...images, [key]: e.target.files[0] })} />
              </label>
            ))}
          </div>
        </div>

        <div className='flex   w-full  gap-4  py-5 '>
          <div className="max-w-48 ">
            <p className='text-center pb-1'>Room Type</p>
            <select value={inputs.roomType} onChange={e => setInputs({ ...inputs, roomType: e.target.value })} className='border p-2 text-start text-sm  border-gray-400/40'>
              <option value="">Select Room Type</option>
              <option value="Single Bed">Single Bed</option>
              <option value="Double Bed">Double Bed</option>
              <option value="Luxury Room">Luxury Room</option>
              <option value="Family Delux">Family Delux</option>
            </select>
          </div>
          <div className='max-w-48' >
            <p className='pb-1 text-center'>Price /night</p>
            <input value={inputs.pricePerNight} onChange={e => setInputs({ ...inputs, pricePerNight: e.target.value })} className='border p-2 text-center w-28 text-sm  border-gray-400/40' type="number" placeholder='0' />

          </div>
        </div>

        <div>
          <p className="text-gray-800 mt-4">Amenities      </p>
          <div className="flex flex-col flex-wrap mt-1 text-gray-400 max-w-sm">
            {amenityList.map((amenity, i) => (
              <label key={i}>
                <input
                  type="checkbox"
                  checked={selectedAmenities.includes(amenity)}
                  onChange={() => {
                    if (selectedAmenities.includes(amenity)) {
                      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
                    } else {
                      setSelectedAmenities([...selectedAmenities, amenity]);
                    }
                  }}
                />
                 {amenity}
              </label>
            ))}
            {/* {Object.keys(inputs.amenities).map((amenity, index) => (
              <div key={index}>
                <input type="checkbox" id={`amenities${index + 1}`} checked={inputs.amenities[amenity]}
                  onChange={() => setInputs({ ...inputs, amenities: { ...inputs.amenities, [amenity]: !inputs.amenities[amenity] } })}
                />
                <label htmlFor={`amenities${index + 1}`}> {amenity}</label>
              </div>
            ))} */}
          </div>
          <button className="bg-primary text-white px-8 py-2 rounded mt-8 cursor-pointer">Add Room</button>
        </div>

      </form>

    </div>
  )
}

export default AddRoom
