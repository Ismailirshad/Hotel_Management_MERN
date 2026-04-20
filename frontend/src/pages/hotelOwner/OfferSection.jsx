import { useEffect, useState } from "react";
import { offerStore } from "../../store/useOfferStore.js";
import { hotelStore } from "../../store/useHotelStore.js";
import OfferSkeleton from "../../components/skeletones/adminSkeleton/OfferSkeleton";

const OfferSection = () => {
  const [manageOffer, setManageOffer] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const [offerData, setOfferData] = useState({
    title: "",
    description: "",
    priceOff: 20,
    expiryDate: "",
    isActive: true,
  });

  const { offer, createOffer, fetchOffer, loading } = offerStore();
  const { hotel } = hotelStore();

  useEffect(() => {
    fetchOffer();
  }, [fetchOffer]);

  useEffect(() => {
    if (offer) {
      setOfferData({
        title: offer.title,
        description: offer.description,
        priceOff: offer.priceOff,
        expiryDate: offer.expiryDate,
        isActive: offer.isActive,
      });
    }
  }, [offer]);

  const handleSubmit = (e) => {
    e.preventDefault();
    createOffer(offerData);
    setManageOffer(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#0f1220] to-[#111827] text-gray-200 p-8">
        <div className="max-w-5xl mb-10">
          <h1 className="text-4xl font-semibold">Offer Management</h1>
          <p className="text-gray-400 mt-1">Control promotional discounts...</p>
        </div>
        <OfferSkeleton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0f1220] to-[#111827] text-gray-200 p-0 sm:p-6 md:p-10">
      {/* Header */}
      <div className="max-w-5xl mb-10">
        <h1 className="text-4xl font-semibold">Offer Management</h1>
        <p className="text-gray-400 mt-1">
          Control promotional discounts visible to customers
        </p>
      </div>

      {/* Active Offer Status */}

      {offer && !manageOffer && (
        <div className="max-w-5xl mb-6 flex items-center justify-between rounded-xl border border-cyan-400/30 bg-cyan-500/10 p-4">
          <div>
            <p className="text-cyan-400 font-semibold">
              {offer.isActive ? "🟢 Active Offer" : "🔴 Inactive Offer"}
            </p>
            <p className="text-sm text-gray-300">
              {offer.title} — {offer.priceOff}% OFF
            </p>
          </div>

          <button
            onClick={() => setManageOffer(true)}
            className="px-4 py-2 rounded-lg bg-cyan-500 text-black font-semibold hover:bg-cyan-600"
          >
            Manage Offer
          </button>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8 max-w-5xl">
        {/* Offer Form */}
        {(!offer || manageOffer) && (
          <div className="bg-[#1a1d2e]/90 border border-white/5 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-6">
              {offer ? "Update Offer" : "Create Offer"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm text-gray-400">Offer Title</label>
                <input
                  value={offerData.title}
                  onChange={(e) => {
                    setOfferData({ ...offerData, title: e.target.value });
                    setHasChanges(true);
                  }}
                  className="w-full mt-1 p-3 rounded-xl bg-[#0f1220] border border-white/10 focus:border-cyan-400 outline-none"
                  placeholder="Festival Special"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">Description</label>
                <textarea
                  rows="3"
                  value={offerData.description}
                  onChange={(e) => {
                    setOfferData({ ...offerData, description: e.target.value });
                    setHasChanges(true);
                  }}
                  className="w-full mt-1 p-3 rounded-xl bg-[#0f1220] border border-white/10 focus:border-cyan-400 outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">
                  Discount ({offerData.priceOff}%)
                </label>
                <input
                  type="range"
                  min="1"
                  max="80"
                  value={offerData.priceOff}
                  onChange={(e) => {
                    setOfferData({
                      ...offerData,
                      priceOff: Number(e.target.value),
                    });
                    setHasChanges(true);
                  }}
                  className="w-full accent-cyan-400"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">Expiry Date</label>
                <input
                  type="date"
                  value={offerData.expiryDate}
                  onChange={(e) => {
                    setOfferData({
                      ...offerData,
                      expiryDate: e.target.value,
                    });
                    setHasChanges(true);
                  }}
                  className="w-full mt-1 p-3 rounded-xl bg-[#0f1220] border border-white/10 focus:border-cyan-400 outline-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-sm text-gray-400">Offer Status</span>

                <label className="relative inline-flex cursor-pointer">
                  <input
                    type="checkbox"
                    checked={offerData.isActive}
                    onChange={() => {
                      setOfferData({
                        ...offerData,
                        isActive: !offerData.isActive,
                      });
                      setHasChanges(true);
                    }}
                    className="sr-only peer"
                  />
                  <div className="w-12 h-6 bg-gray-600 rounded-full peer-checked:bg-cyan-500 transition" />
                  <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-6 transition" />
                </label>
              </div>

              <button
                type="submit"
                disabled={!hasChanges}
                className={`w-full mt-4 py-3 rounded-xl font-semibold
    ${
      hasChanges
        ? "bg-cyan-500 hover:bg-cyan-600 text-black"
        : "bg-gray-600 cursor-not-allowed text-gray-300"
    }`}
              >
                {offer ? "Update Offer" : "Create Offer"}
              </button>
            </form>
          </div>
        )}

        {/* Live Preview */}
        {offer && (
          <div className="bg-[#1a1d2e]/90 border border-white/5 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Live Preview</h2>

            <div className="relative rounded-xl overflow-hidden">
              <img
                src={hotel.image}
                alt={offer.title}
                loading="lazy"
                className="w-full h-56 object-cover"
              />

              <div className="absolute inset-0 bg--to-t from-black/80 to-transparent p-4 flex flex-col justify-end">
                <h3 className="text-white text-xl font-semibold">
                  {offer.title}
                </h3>
                <p className="text-gray-200 text-sm">{offer.description}</p>
                <p className="text-yellow-300 font-bold">
                  {offer.priceOff}% OFF
                </p>
              </div>

              <span className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-md text-sm font-semibold">
                {offer.priceOff}% OFF
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OfferSection;
