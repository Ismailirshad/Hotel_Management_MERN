import React, { memo, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { useState } from "react";
import api from "../../lib/axios.js";
import ListRoomSkeleton from "../../components/skeletones/adminSkeleton/ListRoomSkeleton.jsx";

const ListRoom = () => {
  // const { fetchAllRooms } = roomStore();
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    let fetchRooms = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/admin/allRooms?page=${page}&limit=5`, {
          withCredentials: true,
        });
        setRooms(res.data.availableRooms);
        setTotalPages(res.data.totalPages);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching rooms:", error);
      }
    };
    fetchRooms();
  }, [page]);

  const toggleRoom = useCallback(async (roomId) => {
    try {
      await api.patch(
        `/admin/toggleRoom/${roomId}`,
        {},
        {
          withCredentials: true,
        },
      );
      // fetchRooms();
      setRooms((prev) =>
        prev.map((room) =>
          room._id === roomId
            ? { ...room, isAvailable: !room.isAvailable }
            : room,
        ),
      );
      toast.success("Room availability updated");
    } catch (error) {
      console.log("Error in toggling room availability", error);
      toast.error("Error in toggling room availability");
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f1220] flex items-center justify-center">
        <ListRoomSkeleton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0f1220] to-[#111827] text-gray-200 p-0 sm:p-6 md:p-10">
      {/* Header */}
      <div className="max-w-4xl mb-8">
        <h1 className="text-4xl font-semibold tracking-tight">Room Listings</h1>
        <p className="text-gray-400 mt-2">
          View, edit or manage all listed rooms and availability.
        </p>
      </div>

      {/* Table Card */}
      <div className="max-w-6xl bg-[#1a1d2e]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-medium mb-4 text-gray-300">All Rooms</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-gray-400 border-b border-white/10">
              <tr>
                <th className="px-4 py-3">Room No</th>
                <th className="px-4 py-3">Room Type</th>
                <th className="px-4 py-3">Amenities</th>
                <th className="px-4 py-3">Price / Night</th>
                <th className="px-4 py-3 text-center">Occupied/Vacant</th>
                <th className="px-4 py-3 text-center">Available</th>
              </tr>
            </thead>

            <tbody>
              {rooms?.map((room) => (
                <tr
                  key={room._id}
                  className="border-b border-white/5 hover:bg-white/5 transition"
                >
                  <td className="px-4 py-4 font-medium">{room?.roomNumber}</td>

                  <td className="px-4 py-4">{room?.roomType}</td>

                  <td className="px-4 py-4 text-gray-400">
                    {room?.amenities?.join(", ")}
                  </td>

                  <td className="px-4 py-4 font-semibold text-emerald-400">
                    ₹{room?.pricePerNight}
                  </td>

                  {/* Occupied toggle */}
                  <td className="px-4 py-4 text-center">
                    <div
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium 
                      ${room?.isOccupied ? "bg-yellow-500 text-white" : "bg-gray-500 text-white"}`}
                    >
                      {room?.isOccupied ? "Occupied" : "Vacant"}
                    </div>
                  </td>

                  {/* Availability Toggle */}
                  <td className="px-4 py-4 text-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={room?.isAvailable}
                        onChange={() => toggleRoom(room._id)}
                        readOnly
                      />
                      <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-emerald-500 transition-colors"></div>
                      <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></span>
                    </label>
                  </td>
                </tr>
              ))}
              {rooms?.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    No rooms found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6 py-5 border-t border-white/10 bg-[#11162a] rounded-b-3xl">
          {/* Left Info */}
          <div className="text-sm text-gray-400 font-medium">
            Page <span className="text-white font-semibold">{page}</span> of{" "}
            <span className="text-white font-semibold">{totalPages}</span>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3 self-end sm:self-auto">
            {/* Prev */}
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className={`px-4 py-2 rounded-xl border text-sm font-semibold transition-all duration-200 ${
                page === 1
                  ? "bg-white/5 text-gray-600 border-white/5 cursor-not-allowed"
                  : "bg-white/5 text-white border-white/10 hover:bg-cyan-500/10 hover:text-cyan-400 hover:border-cyan-400/30"
              }`}
            >
              ← Prev
            </button>

            {/* Current Page */}
            <div className="px-4 py-2 rounded-xl bg-cyan-500 text-white text-sm font-bold shadow-lg min-w-11 text-center">
              {page}
            </div>

            {/* Next */}
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className={`px-4 py-2 rounded-xl border text-sm font-semibold transition-all duration-200 ${
                page === totalPages
                  ? "bg-white/5 text-gray-600 border-white/5 cursor-not-allowed"
                  : "bg-white/5 text-white border-white/10 hover:bg-cyan-500/10 hover:text-cyan-400 hover:border-cyan-400/30"
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

export default memo(ListRoom);
