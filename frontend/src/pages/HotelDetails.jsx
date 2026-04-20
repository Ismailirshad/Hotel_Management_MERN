import React, { useEffect } from "react";
import { memo } from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin, Phone, Star, Building2 } from "lucide-react";
import { facilityIcons } from "../assets/assets.js";
import { hotelStore } from "../store/useHotelStore.js";
import { roomStore } from "../store/useRoomStore.js";
import HotelDetailsSkeleton from "../components/skeletones/HotelDetailsSkeleton.jsx";

const HotelDetails = () => {
  const { id } = useParams();

  const hotel = hotelStore((h) => h.hotel);
  const hotelDetails = hotelStore((h) => h.hotelDetails);
  const loading = hotelStore((h) => h.loading);

  const fetchFeaturedRooms = roomStore((r) => r.fetchFeaturedRooms);
  const featuredRooms = roomStore((r) => r.featuredRooms);

  useEffect(() => {
    window.scrollTo(0, 0);

    hotelDetails(id);
    fetchFeaturedRooms(id);
  }, [id, hotelDetails, fetchFeaturedRooms]);

  if (loading || !hotel) {
    return <HotelDetailsSkeleton />;
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Hotel Info */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-6 md:p-8">
            {/* Hotel Image */}
            <div className="w-full">
              <img
                src={hotel?.image}
                alt={hotel?.name}
                loading="lazy"
                className="w-full h-[300px] md:h-[450px] object-cover rounded-2xl shadow-sm"
              />
            </div>

            {/* Hotel Content */}
            <div className="flex flex-col justify-center space-y-5">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-amber-500 font-semibold mb-3">
                  Luxury Stay
                </p>

                <h1 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
                  {hotel?.name}
                </h1>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-2xl ${
                      star <= hotel.rating ? "text-amber-400" : "text-slate-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
                <span className="ml-2 text-sm text-slate-500">
                  {hotel.rating.toFixed(1)}
                </span>
                <span className="text-sm">({hotel.ratingCount}+ reviews)</span>
              </div>

              {/* Info */}
              <div className="space-y-3 text-slate-600">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-500 mt-1 shrink-0" />
                  <p>
                    {hotel.city}, {hotel.address}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-amber-500 shrink-0" />
                  <p>{hotel.contact}</p>
                </div>
              </div>

              {/* About */}
              <div className="pt-2">
                <h2 className="text-xl font-semibold text-slate-900 mb-2">
                  About the Hotel
                </h2>
                <p className="text-slate-600 leading-7">{hotel.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Rooms Section Header */}
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.25em] text-amber-500 font-semibold">
            Stay Options
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Featured Rooms
          </h2>
          <p className="text-slate-600 max-w-2xl">
            Explore some of the most comfortable and thoughtfully designed rooms
            available at this property.
          </p>
        </div>

        {/* Rooms Grid */}
        {featuredRooms?.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-10 md:p-14 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center">
                <Building2 className="w-10 h-10 text-amber-500" />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-slate-900">
              No featured rooms available
            </h3>
            <p className="text-slate-600 mt-3 max-w-xl mx-auto">
              This hotel currently doesn’t have featured rooms to display.
              Please check again later or explore all available room options.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {featuredRooms?.map((room) => (
              <div
                key={room?._id}
                className="group bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition duration-300 overflow-hidden p-4 md:p-5"
              >
                <div className="flex flex-col sm:flex-row gap-5">
                  {/* Room Image */}
                  <div className="w-full sm:w-1/3 rounded-2xl overflow-hidden">
                    <img
                      src={room.images?.[0]}
                      alt={room.roomType}
                      loading="lazy"
                      className="w-full h-56 sm:h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>

                  {/* Room Content */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-2xl font-semibold text-slate-900">
                        {room.roomType}
                      </h3>
                      <p className="text-amber-500 font-semibold text-lg mt-1">
                        ₹{room.pricePerNight}
                        <span className="text-sm text-slate-500 font-normal">
                          {" "}
                          / night
                        </span>
                      </p>
                    </div>

                    {/* Amenities */}
                    <div className="grid grid-cols-2 gap-2">
                      {console.log(room.amenities)}
                      {room.amenities.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2"
                        >
                          {console.log(facilityIcons[item])}
                          <img
                            src={facilityIcons[item]}
                            alt={item}
                            loading="lazy"
                            className="w-4 h-4"
                          />
                          <span className="text-sm text-slate-700 truncate">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <Link
                      to={`/roomDetails/${room._id}`}
                      className="inline-block mt-2 px-5 py-2.5 rounded-full bg-amber-500 text-white text-sm font-medium hover:bg-amber-600 transition"
                    >
                      View Room
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All Rooms */}
        <div className="text-center pt-4">
          <Link
            to={`/hotel/${id}/rooms`}
            className="inline-block px-8 py-3 text-xs md:text-base rounded-full bg-slate-900 text-white hover:bg-slate-800 transition font-medium"
          >
            View All{" "}
            <span className="text-amber-500">{hotel?.name?.toUpperCase()}</span>{" "}
            Hotel Rooms
          </Link>
        </div>
      </div>
    </div>
  );
};

export default memo(HotelDetails);
