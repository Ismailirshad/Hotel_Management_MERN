import React, { memo, useEffect, useState } from "react";
import {
  Search,
  MapPin,
  Phone,
  Star,
  Hotel,
  Loader2,
  Building2,
  Eye,
} from "lucide-react";
import toast from "react-hot-toast";
import api from "../../lib/axios.js";
import SuperAdminAllHotelsSkeleton from "../../components/skeletones/superAdminSkeleton/AllHotelsSkeleton.jsx";

const SuperAdminAllHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchAllHotels = async () => {
    try {
      const res = await api.get("/superAdmin/allHotels");
      setHotels(res.data);
      setFilteredHotels(res.data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllHotels();
  }, []);

  const toggleHotel = async (hotelId) => {
    try {
      await api.patch(`/superAdmin/toggleHotel/${hotelId}`, {
        withCredentials: true,
      });
      setHotels((prev) => {
        return prev.map((hotel) =>
          hotel._id === hotelId
            ? { ...hotel, is_hotelAvailable: !hotel.is_hotelAvailable }
            : hotel,
        );
      });
      toast.success("Hotel availability updated");
    } catch (error) {
      console.log("Error in toggling hotel availability", error);
      toast.error("Error in toggling hotel availability");
    }
  };

  useEffect(() => {
    const filtered = hotels.filter(
      (hotel) =>
        hotel.name.toLowerCase().includes(search.toLowerCase()) ||
        hotel.city.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredHotels(filtered);
  }, [search, hotels]);

  if (loading) {
    return <SuperAdminAllHotelsSkeleton />;
  }

  return (
    <div className="p-0 sm:p-6 bg-[#f8f6f1] min-h-screen">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1e1e1e]">All Hotels</h1>
          <p className="text-gray-500 mt-1">
            Manage and monitor all registered hotels
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-[350px]">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by hotel or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 bg-white shadow-sm outline-none focus:ring-2 focus:ring-[#c49b3f]"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Total Hotels</p>
          <h2 className="text-2xl font-bold mt-1">{hotels?.length}</h2>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Active Cities</p>
          <h2 className="text-2xl font-bold mt-1">
            {[...new Set(hotels.map((item) => item.city))].length}
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Total Ratings</p>
          <h2 className="text-2xl font-bold mt-1">
            {hotels.reduce((acc, item) => acc + item.ratingCount, 0)}
          </h2>
        </div>
      </div>

      {/* Loading */}
      {filteredHotels.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
          <Building2 className="mx-auto text-gray-400 mb-3" size={40} />
          <p className="text-lg font-semibold">No Hotels Found</p>
          <p className="text-gray-500 text-sm">
            Try searching with another keyword
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredHotels.map((hotel) => (
            <div
              key={hotel._id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100"
            >
              {/* Image */}
              <div className="h-52 w-full overflow-hidden">
                <img
                  src={hotel?.image}
                  alt={hotel?.name}
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="text-xl font-bold text-[#1e1e1e]">
                    {hotel?.name}
                  </h2>

                  <div className="bg-[#fff7e8] text-[#c49b3f] px-2 py-1 rounded-xl text-sm font-semibold flex items-center gap-1">
                    <Star size={14} fill="currentColor" />
                    {hotel?.rating?.toFixed(1) || 0}
                  </div>
                </div>

                <div className="mt-3 space-y-2 text-sm text-gray-600">
                  <p className="flex items-center gap-2">
                    <MapPin size={15} className="text-[#c49b3f]" />
                    {hotel?.city}, {hotel?.address}
                  </p>

                  <p className="flex items-center gap-2">
                    <Phone size={15} className="text-[#c49b3f]" />
                    {hotel?.contact}
                  </p>

                  <p className="flex items-center gap-2">
                    <Hotel size={15} className="text-[#c49b3f]" />
                    {hotel?.ratingCount} Reviews
                  </p>
                </div>

                {/* Footer */}
                <div className="mt-5 flex justify-between items-center">
                  <span className="text-xs text-gray-400">
                    Added {new Date(hotel?.createdAt).toLocaleDateString()}
                  </span>

                  <div className="px-4 py-4 text-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={hotel?.is_hotelAvailable}
                        onChange={() => toggleHotel(hotel._id)}
                      />
                      <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-emerald-500 transition-colors"></div>
                      <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(SuperAdminAllHotels);
