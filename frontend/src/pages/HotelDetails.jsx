import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { hotelStore } from "../store/useHotelStore.js";
import { roomStore } from "../store/useRoomStore.js";
import { facilityIcons } from "../assets/assets.js";

const HotelDetails = () => {
  const { id } = useParams();
  const { hotel, hotelDetails, loading } = hotelStore()
  const { fetchFeaturedRooms, featuredRooms } = roomStore()

  useEffect(() => {
    hotelDetails(id)
    fetchFeaturedRooms(id)
  }, []);

  console.log("Featured Rooms:", featuredRooms);
  if (loading || !hotel) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Loading hotel details...
      </p>
    );
  }


  return (
    <div className="min-h-screen bg-liniear-to-b from-slate-50 to-stone-100 pt-24">

      <div className="max-w-6xl mx-auto px-4 ">


        {/* Hotel Info */}
        <div className="flex justify-center items-center w-full h-full  space-x-4 flex-col md:flex-row bg-white/80 backdrop-blur rounded-2xl shadow-lg p-8">
          <div className="w-1/2">
            <img
              src={hotel?.image}
              alt={hotel?.name}
              className="object-cover rounded-xl shadow-lg"
            />
          </div>

          <div className="w-1/2 ">
            <h1 className="text-4xl font-serif font-bold text-gray-800">
              {hotel?.name}
            </h1>

            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map(star => (
                <span
                  key={star}
                  className={`text-xl ${star <= hotel.rating ? "text-amber-400" : "text-gray-300"}`}
                >
                  ★
                </span>
              ))}
            </div>

            <p className="text-gray-600">📍 {hotel.city}</p>
            <p className="text-gray-600">📞 {hotel.contact}</p>
            <p className="text-gray-600">{hotel.address}</p>

            <div>
              <h2 className="text-lg font-semibold text-gray-800">About the Hotel</h2>
              <p className="text-gray-600 leading-relaxed">
                {hotel.description}
              </p>
            </div>
          </div>


        </div>


        {/* Rooms Section */}
        <h2 className="text-3xl font-serif font-semibold py-4">
          Featured Rooms
        </h2>

        <div className="grid md:grid-cols-2 grid-cols-1 gap-5 ">
          {featuredRooms?.map((room) => (
            <div
              key={room?._id}
              className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition duration-300 overflow-hidden flex gap-4 p-4">

              <div className="w-1/3 rounded-xl overflow-hidden">
                <img
                  src={room.images?.[0]}
                  alt={room.roomType}
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
              </div>

              <div className="flex-1 space-y-3">
                <h3 className="text-xl font-semibold text-gray-800">
                  {room.roomType}
                </h3>

                <p className="text-emerald-600 font-medium">
                  ₹{room.pricePerNight} / night
                </p>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  {room.amenities.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 bg-slate-100 rounded-lg px-2 py-1"
                    >
                      <img src={facilityIcons[item]} className="w-4 h-4" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>


                <Link
                  to={`/roomDetails/${room._id}`}
                  className="inline-block mt-3 px-5 py-2 rounded-full bg-emerald-600 text-white text-sm hover:bg-emerald-700 transition"
                >
                  View Room
                </Link>

              </div>

            </div>
          ))}
        </div>

        {/* View All Rooms Button */}
        <div className="text-center mt-8">
          <Link
            to={`/hotel/${id}/rooms`}
            className="inline-block px-8 py-3 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition"
          >
            View All Rooms
          </Link>

        </div>

      </div>
    </div>
  );
};

export default HotelDetails;
