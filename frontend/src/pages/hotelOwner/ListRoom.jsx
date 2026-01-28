import React, { useEffect } from "react";
import api from "../../lib/axios.js";
import toast from "react-hot-toast";
import { useState } from "react";
import ListRoomSkeleton from "../../components/skeletones/TableSkeleton.jsx";
import TableSkeleton from "../../components/skeletones/TableSkeleton.jsx";

const ListRoom = () => {
  // const { fetchAllRooms } = roomStore();
  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    let fetchRooms = async () => {
      setLoading(true);
      try {
        const res = await api.get("/admin/allRooms", { withCredentials: true });
        setRooms(res.data);
        setLoading(false);
        console.log("All Rooms Data", res.data);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching rooms:", error);
      }
    };
    fetchRooms();
  }, []);

  const toggleRoom = async (roomId) => {
    try {
      const res = await api.patch(`/admin/toggleRoom/${roomId}`, {
        withCredentials: true,
      });
      console.log("Toggle Room Response", res.data);
      // fetchRooms();
      toast.success("Room availability updated");
    } catch (error) {
      console.log("Error in toggling room availability", error);
      toast.error("Error in toggling room availability");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0f1220] to-[#111827] text-gray-200 p-8">
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
          {loading ? (
            <TableSkeleton />
          ) : (
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
                {rooms?.map((room, index) => (
                  <tr
                    key={index}
                    className="border-b border-white/5 hover:bg-white/5 transition"
                  >
                    <td className="px-4 py-4 font-medium">{room.roomNumber}</td>

                    <td className="px-4 py-4">{room.roomType}</td>

                    <td className="px-4 py-4 text-gray-400">
                      {room.amenities.join(", ")}
                    </td>

                    <td className="px-4 py-4 font-semibold text-emerald-400">
                      ₹{room.pricePerNight}
                    </td>

                    {/* Occupied toggle */}
                    <td className="px-4 py-4 text-center">
                      <div
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium 
                      ${room.isOccupied ? "bg-yellow-500 text-white" : "bg-gray-500 text-white"}`}
                      >
                        {room.isOccupied ? "Occupied" : "Vacant"}
                      </div>
                    </td>

                    {/* Availability Toggle */}
                    <td className="px-4 py-4 text-center">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={room.isAvailable}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default ListRoom;
