import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { hotelStore } from "../store/useHotelStore.js";
import HotelCardsSkeleton from "./skeletones/HotelCardSkeleton";

const HotelCards = () => {
  const { featuredHotels, hotels, loading } = hotelStore();

  useEffect(() => {
    featuredHotels();
  }, [featuredHotels]);

  if(loading){
    return <HotelCardsSkeleton />
  }

  return (
    <section
      id="hotels"
      className="relative py-28 bg-gradient-to-b from-white via-slate-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-6 space-y-20">

        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-6 font-sans">
          <span className="inline-flex items-center px-6 py-2 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold tracking-[0.35em] uppercase">
            Handpicked Excellence
          </span>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            Featured{" "}
            <span className="font-serif italic font-medium text-slate-600">
              Hotels
            </span>
          </h1>

          <p className="text-slate-600 text-lg leading-relaxed max-w-2xl mx-auto">
            Discover carefully selected hotels offering refined comfort,
            elegant design, and exceptional hospitality for a truly memorable stay.
          </p>
        </div>

        {/* HOTEL GRID */}
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {hotels.map((hotel) => (
            <Link
              key={hotel._id}
              to={`/hotelDetails/${hotel._id}`}
              className="group"
            >
              <div className="relative bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">

                {/* IMAGE */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                {/* CONTENT */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 truncate">
                      {hotel.name}
                    </h3>
                    <p className="text-sm text-slate-500">📍 {hotel.city}</p>
                  </div>

                  {/* RATING */}
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={
                          star <= hotel.rating
                            ? "text-amber-400"
                            : "text-slate-300"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  {/* PRICE + CTA */}
                  <div className="flex items-center justify-between pt-4">
                    <p className="text-slate-900 font-semibold">
                      ₹{hotel.startingPrice}
                      <span className="text-sm text-slate-500"> / night</span>
                    </p>

                    <span className="px-5 py-1.5 rounded-full text-sm bg-emerald-50 text-emerald-700 border border-emerald-200 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      View Details
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

export default React.memo(HotelCards);
