import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { hotelStore } from "../store/useHotelStore.js";
import HotelCardsSkeleton from "./skeletones/HotelCardSkeleton";
import { MapPin } from "lucide-react";
import { memo } from "react";

const HotelCards = () => {
  const { featuredHotels, hotels, loading } = hotelStore();

  useEffect(() => {
    featuredHotels();
  }, []);

  if (loading) {
    return <HotelCardsSkeleton />;
  }

  return (
    <section
      id="hotels"
      className="relative py-28 bg-linear-to-b from-slate-950 via-[#020c2b] to-slate-950 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-5">
          <span className="inline-flex items-center px-5 py-2 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-semibold tracking-[0.3em] uppercase">
            Handpicked Excellence
          </span>

          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Featured{" "}
            <span className="italic font-light text-amber-400">Hotels</span>
          </h1>

          <p className="text-slate-400 text-lg leading-relaxed">
            Discover carefully selected hotels offering refined comfort, elegant
            design, and exceptional hospitality.
          </p>
        </div>

        {/* GRID */}
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {hotels.map((hotel) => (
            <Link
              key={hotel._id}
              to={`/hotelDetails/${hotel._id}`}
              className="group"
            >
              <div className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-500 hover:-translate-y-1">
                {/* IMAGE */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent" />
                </div>

                {/* CONTENT */}
                <div className="p-5 space-y-3">
                  {/* TITLE */}
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-amber-400 transition">
                      {hotel.name}
                    </h3>

                    <p className="text-sm text-slate-400 flex items-center gap-1 mt-1">
                      <MapPin className="w-4 h-4 text-amber-400" />
                      {hotel.city}
                    </p>
                  </div>

                  {/* RATING */}
                  <div className="flex items-center gap-1 text-lg">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={
                          star <= hotel.rating
                            ? "text-amber-400"
                            : "text-slate-600"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  {/* PRICE */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <p className="text-white font-semibold">
                      ₹{hotel.startingPrice}
                      <span className="text-sm text-slate-400"> / night</span>
                    </p>

                    <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-amber-400/10 text-amber-400 border border-amber-400/20 group-hover:bg-amber-500 group-hover:text-white group-hover:border-amber-500 transition">
                      View
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(HotelCards);
