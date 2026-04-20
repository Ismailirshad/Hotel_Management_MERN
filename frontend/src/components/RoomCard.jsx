import React from "react";
import { Link } from "react-router-dom";
import { memo } from "react";

const RoomCard = ({ room }) => {
  return (
    <div>
      <Link to={`/roomDetails/${room._id}`} className="group block">
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition flex flex-col md:flex-row gap-4 p-4 md:p-5">
          {/* IMAGE */}
          <div className="w-full md:w-40 h-48 md:h-32 rounded-xl overflow-hidden shrink-0">
            <img
              src={room.images[0]}
              alt={room.roomType}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />
          </div>

          {/* INFO */}
          <div className="flex-1 space-y-2 text-left">
            <h2 className="text-xl font-semibold text-slate-900">
              {room.roomType}
            </h2>

            <p className="text-sm text-slate-500">
              📍 {room.hotel.city} · {room.hotel.name}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-1 text-sm">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={
                    star <= room.hotel.rating
                      ? "text-amber-400"
                      : "text-slate-300"
                  }
                >
                  ★
                </span>
              ))}
              <span className="text-slate-500 ml-2">
                {room.hotel.ratingCount}+ reviews
              </span>
            </div>

            {/* Amenities */}
            <div className="flex flex-wrap gap-2 pt-1">
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
          <div className="border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-4 flex flex-col justify-center items-start md:items-end gap-2">
            <p className="text-2xl font-bold text-slate-900">
              ₹{room.pricePerNight}
            </p>

            <span className="text-sm text-slate-500">per night</span>

            <span className="w-full md:w-auto text-center px-4 py-2 rounded-xl text-sm font-medium bg-emerald-500 text-white hover:bg-emerald-600 transition">
              View Room
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default memo(RoomCard);
