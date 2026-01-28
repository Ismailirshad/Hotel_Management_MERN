import React, { useEffect } from "react";
import { offerStore } from "../store/useOfferStore.js";
import ExclusiveOfferSkeleton from "./skeletones/ExclusiveOfferSkeleton.jsx";

const ExclusiveOffer = () => {
  const { fetchAllOffers, offers, loading } = offerStore();

  useEffect(() => {
    fetchAllOffers();
  }, [fetchAllOffers]);

  if(loading){
    return <ExclusiveOfferSkeleton />
  }

  if (!offers || offers.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-slate-400">
        No offers available at the moment
      </div>
    );
  }

  return (
    <section
      id="offers"
      className="relative w-full min-h-screen bg-gradient-to-b from-[#0b1120] via-[#0f172a] to-black"
    >
      <div className="max-w-7xl mx-auto px-6 pt-40 pb-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-14">
          <div className="space-y-4">
            <span className="text-xs tracking-[0.35em] text-amber-400 font-semibold uppercase">
              Handpicked Deals
            </span>

            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Exclusive{" "}
              <span className="text-amber-400 italic font-light">Offers</span>
            </h1>

            <p className="text-slate-300 max-w-xl text-lg leading-relaxed">
              Discover limited-time luxury packages crafted to enhance your stay
              with exceptional comfort, elegance, and value.
            </p>
          </div>

          <button className="group relative px-8 py-3 rounded-full bg-amber-400 text-black font-semibold tracking-wide shadow-lg hover:bg-amber-300 transition-all duration-300">
            Explore All Offers
            <span className="absolute inset-0 rounded-full ring-2 ring-amber-400/40 opacity-0 group-hover:opacity-100 transition" />
          </button>
        </div>

        {/* Offer Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers
            .filter((offer) => offer.isActive)
            .map((offer, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl hover:shadow-amber-500/10 transition-all duration-500"
              >
                {/* Image */}
                <div className="overflow-hidden">
                  <img
                    src={offer?.hotel?.image}
                    alt={offer.title}
                    className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 p-6 space-y-2">
                  <h2 className="text-white text-xl font-bold">
                    {offer.title}
                  </h2>

                  <p className="text-slate-300 text-sm line-clamp-2">
                    {offer.description}
                  </p>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-amber-400 font-semibold text-sm">
                      Save {offer.priceOff}%
                    </span>

                    <span className="text-xs text-slate-400">
                      Expires{" "}
                      {new Date(offer.expiryDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Discount Badge */}
                <div className="absolute top-4 left-4 bg-amber-400 text-black px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                  {offer.priceOff}% OFF
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default ExclusiveOffer;

