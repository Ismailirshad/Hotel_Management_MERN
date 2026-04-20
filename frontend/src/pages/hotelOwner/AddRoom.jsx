import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { roomStore } from '../../store/useRoomStore.js'

const AddRoom = () => {
  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null
  })
  const [inputs, setInputs] = useState({
    roomType: "",
    roomNumber: "000",
    pricePerNight: 0,
    description: ""
  })
  const amenityList = ["Free wifi", "Free Breakfast", "Mountain View", "Pool Access"];
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const { createRoom , loading} = roomStore()


  const handleImageChange = (key, e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(prev => ({ ...prev, [key]: reader.result }))
      };
      reader.readAsDataURL(file)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const roomData = ({
      ...inputs,
      amenities: selectedAmenities,
      images: Object.values(images)  //converts object to array because backend expects array of images
    })
    await createRoom(roomData)

    setImages({ 1: null, 2: null, 3: null, 4: null })
    setInputs({ roomType: "", roomNumber: "000", pricePerNight: 0, description: "" })
    setSelectedAmenities([])

  }
  return (
    <div className="min-h-screen bg-linear-to-br from-[#0f1220] to-[#111827] text-gray-200 p-0 sm:p-6 md:p-10">

      {/* Header */}
      <div className="max-w-4xl mb-8">
        <h1 className="text-4xl font-semibold tracking-tight">
          Add New Room
        </h1>
        <p className="text-gray-400 mt-2">
          Create and manage room listings with images, pricing and amenities.
        </p>
      </div>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl bg-[#1a1d2e]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-8 space-y-8 shadow-lg"
      >

        {/* Images */}
        <div>
          <p className="text-sm text-gray-400 mb-3">Room Images</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Object.keys(images).map((key) => (
              <label
                key={key}
                htmlFor={`roomImages${key}`}
                className="cursor-pointer group"
              >
                <div className="rounded-xl overflow-hidden border border-white/10 bg-white/5 hover:bg-white/10 transition">
                  <img
                    src={images[key] || assets.uploadArea}
                    alt="Room Image"
                    loading="lazy"
                    className="h-28 w-full object-cover opacity-80 group-hover:opacity-100"
                  />
                </div>
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  id={`roomImages${key}`}
                  onChange={(e) => handleImageChange(key, e)}
                />
              </label>
            ))}
          </div>
        </div>

        {/* Inputs Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

          {/* Room Type */}
          <div>
            <label className="text-sm text-gray-400 mb-1 block">
              Room Type
            </label>
            <select
              value={inputs.roomType}
              onChange={e => setInputs({ ...inputs, roomType: e.target.value })}
              className="w-full bg-[#0f1220] border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7de2d1]"
            >
              <option value="">Select Room Type</option>
              <option value="Single Bed">Single Bed</option>
              <option value="Double Bed">Double Bed</option>
              <option value="Deluxe">Deluxe</option>
              <option value="Suite">Suite</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="text-sm text-gray-400 mb-1 block">
              Price / Night
            </label>
            <input
              type="number"
              value={inputs.pricePerNight}
              onChange={e => setInputs({ ...inputs, pricePerNight: e.target.value })}
              className="w-full bg-[#0f1220] border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
              placeholder="0"
            />
          </div>

          {/* Room Number */}
          <div>
            <label className="text-sm text-gray-400 mb-1 block">
              Room Number / ID
            </label>
            <input
              type="text"
              value={inputs.roomNumber}
              onChange={e => setInputs({ ...inputs, roomNumber: e.target.value })}
              className="w-full bg-[#0f1220] border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7de2d1]"
              placeholder="000"
              required
            />
          </div>

        </div>

        {/* Description */}
        <div>
          <label className="text-sm text-gray-400 mb-1 block">
            Description
          </label>
          <textarea
            rows="4"
            value={inputs.description}
            onChange={e => setInputs({ ...inputs, description: e.target.value })}
            className="w-full bg-[#0f1220] border border-white/10 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#7de2d1]"
            placeholder="Describe the room (view, size, special features)"
          />
        </div>

        {/* Amenities */}
        <div>
          <p className="text-sm text-gray-400 mb-3">Amenities</p>

          <div className="grid grid-cols-2 gap-3 text-sm">
            {amenityList.map((amenity, i) => (
              <label
                key={i}
                className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2 cursor-pointer hover:bg-white/10 transition"
              >
                <input
                  type="checkbox"
                  checked={selectedAmenities.includes(amenity)}
                  onChange={() => {
                    setSelectedAmenities(prev =>
                      prev.includes(amenity)
                        ? prev.filter(a => a !== amenity)
                        : [...prev, amenity]
                    )
                  }}
                />
                <span>{amenity}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button
            type="submit"
            className="px-8 py-3 rounded-full bg-linear-to-r from-[#7de2d1] to-[#38bdf8] text-black font-medium hover:opacity-90 transition"
          >
           {loading? "Proceeding" : "Add Room"} 
          </button>
        </div>

      </form>
    </div>
  )
}

export default AddRoom
