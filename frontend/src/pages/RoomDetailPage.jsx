import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { facilityIcons, roomCommonData } from '../assets/assets'
import { roomStore } from '../store/useRoomStore.js';
import BookingCard from '../components/BookingCard.jsx';

const RoomDetails = () => {
  const { id } = useParams();
  const [mainImage, setMainImage] = useState(null);
  const { fetchRoom, room, loading } = roomStore()

  useEffect(() => {
    fetchRoom(id)
  }, [id])

  useEffect(() => {
    if (room?.images?.length) {
      setMainImage(room?.images[0])
    }
  }, [room])

  return (
  <div className="min-h-screen bg-slate-50 pt-24 pb-16">
    <div className="max-w-6xl mx-auto px-4 space-y-10">

      {/* HEADER */}
      <div className="bg-white rounded-2xl shadow-sm p-6 space-y-3">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-2xl font-semibold text-slate-900">
            {room?.hotel?.name}
          </h1>
          <span className="text-sm px-3 py-1 rounded-full bg-emerald-100 text-emerald-700">
            {room?.roomType}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-600">
          {[1, 2, 3, 4, 5].map(star => (
            <span
              key={star}
              className={star <= room?.hotel?.rating ? "text-amber-400" : "text-slate-300"}
            >
              ★
            </span>
          ))}
          <span>({room?.hotel?.ratingCount} reviews)</span>
        </div>

        <p className="text-slate-500">{room?.hotel?.address}</p>
      </div>

      {/* IMAGES */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <img
            src={mainImage}
            alt="Room"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {room?.images?.map((img, index) => (
            <div
              key={index}
              onClick={() => setMainImage(img)}
              className={`cursor-pointer rounded-xl overflow-hidden border
                ${mainImage === img ? "border-emerald-500" : "border-transparent"}
              `}
            >
              <img src={img} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* DETAILS + BOOKING */}
<div className="bg-white rounded-3xl shadow-md p-6 lg:p-8 grid lg:grid-cols-3 gap-8">

  {/* LEFT: ROOM INFO */}
  <div className="lg:col-span-2 space-y-6">

    {/* Price */}
    <div className="flex items-end gap-2">
      <p className="text-4xl font-bold text-slate-900">
        ₹{room?.pricePerNight}
      </p>
      <span className="text-base text-slate-500 mb-1">/ night</span>
    </div>

    <div className="h-px bg-slate-200" />

    {/* Highlights */}
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-slate-900">
        Room Highlights
      </h2>

      <div className="flex flex-wrap gap-3">
        {room?.amenities?.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-sm text-slate-700 border border-slate-200"
          >
            <img
              src={facilityIcons[item]}
              alt={item}
              className="w-4 h-4 opacity-80"
            />
            <span className="whitespace-nowrap">{item}</span>
          </div>
        ))}
      </div>
    </div>
  </div>

  {/* RIGHT: BOOKING CARD */}
  <div className="lg:col-span-1">
    <div className="sticky top-28">
      <BookingCard roomId={id} />
    </div>
  </div>

</div>


      {/* DESCRIPTION */}
      <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
        <h2 className="text-xl font-semibold text-slate-900">Description</h2>
        <p className="text-slate-600 leading-relaxed">
          {room?.description}
        </p>

           <div className="flex flex-col  ">
            {roomCommonData.map((data, index) => (
              <div key={index} className="flex flex-row items-start space-x-3 py-3 ">
                <img src={data.icon} alt={data.title} className="w-6 h-6" />
                <div>
                  <h3 className="font-semibold text-lg">{data.title}</h3>
                  <p className="text-gray-600">{data.description}</p>
                </div>
              </div>
            ))}
          </div>
      </div>

     

      {/* HOST */}
      <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <img
            src={room?.hotel?.image}
            className="w-14 h-14 rounded-full object-cover"
          />
          <div>
            <p className="font-medium text-slate-900">
              Hosted by {room?.hotel?.name}
            </p>
            <p className="text-sm text-slate-500">
              {room?.hotel?.ratingCount}+ reviews
            </p>
          </div>
        </div>

        <a
          href={`tel:${room?.hotel?.contact}`}
          className="px-6 py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition"
        >
          📞 Contact Host
        </a>
      </div>

    </div>
  </div>
)

}

export default RoomDetails
