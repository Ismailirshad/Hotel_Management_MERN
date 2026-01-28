import React, { useEffect, useState } from "react";
import { Calendar, User, Hash, Users } from "lucide-react"; // Optional: for icons
import api from "../../lib/axios.js";
import toast from "react-hot-toast";
import TableSkeleton from "../../components/skeletones/TableSkeleton.jsx";

const SuperAdminBookings = () => {
  const [loading, setLoading] = useState(false);
  const [allBookings, setAllBookings] = useState([]);

  useEffect(() => {
    const fetchAllBookings = async () => {

      setLoading(true);
      try {
        const res =await api.get("/superAdmin/all-bookings", {
          withCredentials: true,
        });
        setLoading(false);
        setAllBookings(res.data);
      } catch (error) {
        setLoading(false);
        console.log("Error in fetchAllBookings store", error);
        toast.error("Failed to load fetchAllBookings");
      }
    }
    fetchAllBookings();
  }, []);
  console.log("hhe", allBookings);

  return (
    <div className="mt-12 max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-white">Recent Bookings</h2>
          <p className="text-gray-400 text-sm">
            Manage and view all incoming reservations for your hotel.
          </p>
        </div>
        <div className="text-sm bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-gray-300">
          Total: {allBookings.length} Bookings
        </div>
      </div>

      <div className="bg-[#1a1d2e]/80 backdrop-blur-xl border border-white/5 rounded-2xl shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <TableSkeleton />
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className="bg-white/5 text-gray-300 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-medium">Date of Booking </th>
                  <th className="px-6 py-4 font-medium">Booking ID / User</th>
                  <th className="px-6 py-4 font-medium">Room Details</th>
                  <th className="px-6 py-4 font-medium">Stay Dates</th>
                  <th className="px-6 py-4 font-medium">Guests</th>
                  <th className="px-6 py-4 font-medium">Amount</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/5 text-gray-400 text-sm">
                {allBookings.length > 0 ? (
                  allBookings.map((booking) => (
                    <tr
                      key={booking._id}
                      className="hover:bg-white/2 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <span className="text-white font-medium">
                          {new Date(booking.createdAt).toLocaleDateString()}
                        </span>
                        <div className="flex flex-col"></div>
                      </td>
                      {/* User & ID Column */}
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-white font-medium">
                            {booking.user?.name || "Guest"}
                          </span>
                          <span className="text-[10px] text-gray-500 font-mono mt-1">
                            #{booking._id.slice(-8).toUpperCase()}
                          </span>
                        </div>
                      </td>

                      {/* Room Column */}
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-gray-200">
                            {booking.room?.roomType}
                          </span>
                          <span className="text-xs text-gray-500">
                            Room: {booking.room?.roomNumber || "N/A"}
                          </span>
                        </div>
                      </td>

                      {/* Dates Column */}
                      <td className="px-6 py-4">
                        <div className="flex flex-col text-xs">
                          <span className="text-emerald-400/80">
                            In:{" "}
                            {new Date(booking.checkInDate).toLocaleDateString()}
                          </span>
                          <span className="text-rose-400/80">
                            Out:{" "}
                            {new Date(
                              booking.checkOutDate,
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      </td>

                      {/* Guests Column */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <span>{booking.guests}</span>
                          <span className="text-gray-600 text-xs">
                            Person(s)
                          </span>
                        </div>
                      </td>

                      {/* Amount Column */}
                      <td className="px-6 py-4 font-medium text-white">
                        ₹{booking.totalPrice.toLocaleString()}
                      </td>

                      {/* Status Column */}
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 text-[10px] uppercase tracking-widest rounded-full font-bold
                          ${
                            booking.paymentStatus === "paid"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          }
                        `}
                        >
                          {booking.paymentStatus === "paid"
                            ? "Confirmed"
                            : "Pending"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      No bookings found for this hotel.
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

export default SuperAdminBookings;
