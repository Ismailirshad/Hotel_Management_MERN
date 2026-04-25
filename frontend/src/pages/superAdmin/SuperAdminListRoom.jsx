import React, { memo, useEffect, useState } from "react";
import api from "../../lib/axios.js";
import {
  BedDouble,
  BadgeIndianRupee,
  CircleCheck,
  CircleX,
} from "lucide-react";
import SuperAdminListRoomSkeleton from "../../components/skeletones/superAdminSkeleton/ListRoomSkeleton.jsx";

const SuperAdminListRoom = () => {
  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRooms, setTotalRooms] = useState(0);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/superAdmin/allRooms?page=${page}&limit=10`, {
        withCredentials: true,
      });
      setRooms(res.data.availableRooms);
      setTotalPages(res.data.totalPages);
      setTotalRooms(res.data.totalRooms);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [page]);

  if (loading) {
    return <SuperAdminListRoomSkeleton />;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#f8f4ea] via-[#fdfaf4] to-[#efe7d6] text-slate-800 p-0 sm:p-6 md:p-10">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center gap-4">
        <div>
          <p className="uppercase tracking-[0.35em] text-xs font-semibold text-[#b88917] mb-3">
            Property Control Center
          </p>
          <h1 className="text-4xl font-bold text-slate-900">Room Listings</h1>
          <p className="text-slate-500 mt-2 max-w-2xl">
            View and monitor all rooms, pricing, occupancy and availability
            across the platform.
          </p>
        </div>

        <div className="px-5 py-3 rounded-2xl bg-white border border-[#eadfca] shadow-md text-sm font-semibold text-slate-700 w-fit">
          Total: {totalRooms} Rooms
        </div>
      </div>

      {/* Table Card */}
      <div className="rounded-3xl bg-white border border-[#eadfca] shadow-lg p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-3 rounded-2xl bg-[#fff7e6]">
            <BedDouble className="w-6 h-6 text-[#b88917]" />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900">All Rooms</h2>
            <p className="text-sm text-slate-500">
              Complete inventory overview
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#eadfca] text-slate-500">
                <th className="text-left px-4 py-3">Room No</th>
                <th className="text-left px-4 py-3">Room Type</th>
                <th className="text-left px-4 py-3">Amenities</th>
                <th className="text-left px-4 py-3">Price / Night</th>
                <th className="text-center px-4 py-3">Status</th>
                <th className="text-center px-4 py-3">Available</th>
              </tr>
            </thead>

            <tbody>
              {rooms?.length > 0 ? (
                rooms.map((room) => (
                  <tr
                    key={room._id}
                    className="border-b border-[#f2ead9] hover:bg-[#fdfaf4] transition"
                  >
                    <td className="px-4 py-4 font-semibold">
                      #{room?.roomNumber}
                    </td>

                    <td className="px-4 py-4">{room?.roomType}</td>

                    <td className="px-4 py-4 text-slate-500 max-w-xs">
                      {room?.amenities?.join(", ")}
                    </td>

                    <td className="px-4 py-4">
                      <div className="inline-flex items-center gap-1 font-semibold text-emerald-600">
                        <BadgeIndianRupee className="w-4 h-4" />
                        {room?.pricePerNight}
                      </div>
                    </td>

                    {/* Occupied/Vacant */}
                    <td className="px-4 py-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                          room?.isOccupied
                            ? "bg-amber-100 text-amber-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {room?.isOccupied ? (
                          <CircleX className="w-3.5 h-3.5" />
                        ) : (
                          <CircleCheck className="w-3.5 h-3.5" />
                        )}
                        {room?.isOccupied ? "Occupied" : "Vacant"}
                      </span>
                    </td>

                    {/* Available */}
                    <td className="px-4 py-4 text-center">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                          room?.isAvailable
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-rose-100 text-rose-700"
                        }`}
                      >
                        {room?.isAvailable ? "Yes" : "No"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-slate-400">
                    No rooms found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6 py-5 border-t border-[#eadfca] bg-[#fdfaf4] rounded-b-3xl">
          {/* Left Info */}
          <div className="text-sm text-slate-500 font-medium">
            Page <span className="text-slate-900 font-semibold">{page}</span> of{" "}
            <span className="text-slate-900 font-semibold">{totalPages}</span>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3 self-end sm:self-auto">
            {/* Prev */}
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className={`px-4 py-2 rounded-xl border text-sm font-semibold transition-all duration-200
        ${
          page === 1
            ? "bg-slate-200 text-slate-400 border-slate-200 cursor-not-allowed"
            : "bg-white text-slate-700 border-[#eadfca] hover:bg-[#fff7e6] hover:text-[#b88917] hover:shadow-md"
        }`}
            >
              ← Prev
            </button>

            {/* Current Page Badge */}
            <div className="px-4 py-2 rounded-xl bg-[#b88917] text-white text-sm font-bold shadow-md min-w-11 text-center">
              {page}
            </div>

            {/* Next */}
            <button
              disabled={page === totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className={`px-4 py-2 rounded-xl border text-sm font-semibold transition-all duration-200
        ${
          page === totalPages
            ? "bg-slate-200 text-slate-400 border-slate-200 cursor-not-allowed"
            : "bg-white text-slate-700 border-[#eadfca] hover:bg-[#fff7e6] hover:text-[#b88917] hover:shadow-md"
        }`}
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(SuperAdminListRoom);
