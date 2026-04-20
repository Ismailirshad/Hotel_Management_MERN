import { useEffect } from "react";
import { memo } from "react";
import { offerStore } from "../store/useOfferStore.js";
import ExclusiveOfferSkeleton from "./skeletones/ExclusiveOfferSkeleton.jsx";
import { BadgePercent, Gift, Sparkles } from "lucide-react";

const ExclusiveOffer = () => {
  const { fetchAllOffers, offers, loading } = offerStore();

  useEffect(() => {
    fetchAllOffers();
  }, [fetchAllOffers]);

  if (loading) {
    return <ExclusiveOfferSkeleton />;
  }

  return (
    <section
      id="offers"
      className="relative w-full min-h-screen bg-linear-to-b from-[#0b1120] via-[#0f172a] to-black"
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
        {/* {!offers || offers.length === 0} && ( */}
        {/* { */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl px-8 py-16 text-center">
          {/* Glow Background */}
          <div className="absolute inset-0 bg-linear-to-br from-amber-400/10 via-transparent to-cyan-400/5 pointer-events-none" />
          <div className="absolute -top-16 -left-16 w-40 h-40 bg-amber-400/20 blur-3xl rounded-full" />
          <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-blue-500/10 blur-3xl rounded-full" />

          {offers.length === 0 && (
            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              {/* Icon */}
              <div className="relative z-10 flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shadow-lg">
                  <Gift className="w-10 h-10 text-amber-400" />
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                No Exclusive Offers Right Now
              </h2>

              <p className="text-slate-300 text-lg leading-relaxed">
                Our luxury deals are currently being refreshed. Check back soon
                for curated seasonal packages, premium discounts, and exclusive
                guest experiences.
              </p>
            </div>
          )}
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div
                className={`grid gap-6 ${
                  offers.length === 1
                    ? "grid-cols-1 place-items-center max-w-2xl mx-auto"
                    : offers.length === 2
                      ? "grid-cols-1 sm:grid-cols-2"
                      : "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                }`}
              >
                {offers.map((offer, index) => (
                  <div
                    key={index}
                    className="group relative w-full overflow-hidden rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl hover:shadow-amber-500/10 transition-all duration-500"
                  >
                    {/* Image */}
                    <div className="overflow-hidden">
                      <img
                        src={offer?.hotel?.image}
                        alt={offer.title}
                        loading="lazy"
                        className="h-56 sm:h-64 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

                    {/* Content */}
                    <div className="absolute bottom-0 p-6 space-y-2 w-full">
                      <h2 className="text-white text-xl font-bold">
                        {offer.title}
                      </h2>

                      <p className="text-slate-300 text-sm line-clamp-2">
                        {offer.description}
                      </p>

                      <div className="flex items-center justify-between pt-2 flex-wrap gap-2">
                        <span className="text-amber-400 font-semibold text-xl">
                          {offer.hotel.name}
                        </span>

                        <span className="text-xs text-slate-400">
                          <span className="text-red-400 font-bold">

                          Expires:{" "}
                          </span>
                          {new Date(offer.expiryDate).toLocaleDateString("en-GB")}
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
          </div>

          <div className="relative z-10 mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className="rounded-2xl bg-white/5 border border-white/10 p-5 text-center">
              <Sparkles className="w-6 h-6 text-amber-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold">Luxury Packages</h3>
              <p className="text-slate-400 text-sm mt-1">
                Premium experiences designed for unforgettable stays.
              </p>
            </div>

            <div className="rounded-2xl bg-white/5 border border-white/10 p-5 text-center">
              <BadgePercent className="w-6 h-6 text-amber-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold">Special Discounts</h3>
              <p className="text-slate-400 text-sm mt-1">
                Enjoy limited-time savings on selected hotel stays.
              </p>
            </div>

            <div className="rounded-2xl bg-white/5 border border-white/10 p-5 text-center">
              <Gift className="w-6 h-6 text-amber-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold">Member Perks</h3>
              <p className="text-slate-400 text-sm mt-1">
                Unlock value-added perks and seasonal benefits.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(ExclusiveOffer);
