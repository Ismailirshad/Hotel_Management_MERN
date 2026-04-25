import React, { useEffect } from "react";
import { Calendar, User, Hash, Users } from "lucide-react"; 
import { bookingStore } from "../../store/useBookingStore.js";
import TableSkeleton from "../../components/skeletones/TableSkeleton";
import BookingsSkeleton from "../../components/skeletones/adminSkeleton/BookingsSkeleton";

const Bookings = () => {
  const {
    fetchAllBookings,
    allBookings,
    loading,
    totalPages,
    page,
    totalBookings,
  } = bookingStore();

  useEffect(() => {
    fetchAllBookings(1);
  }, [fetchAllBookings]);

  if (loading) {
    return (
        <BookingsSkeleton />
    )
  }

  return (
    <div className="mt-12 max-w-6xl min-h-screen p-0 sm:p-6 md:p-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-white">Recent Bookings</h2>
          <p className="text-gray-400 text-sm">
            Manage and view all incoming reservations for your hotel.
          </p>
        </div>
        <div className="text-sm bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-gray-300">
          Total: {totalBookings} Bookings
        </div>
      </div>

      <div className="bg-[#1a1d2e]/80 backdrop-blur-xl border border-white/5 rounded-2xl shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
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
                          {new Date(booking?.createdAt).toLocaleDateString(
                            "en-GB",
                          )}
                        </span>
                        <div className="flex flex-col"></div>
                      </td>
                      {/* User & ID Column */}
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-white font-medium">
                            {booking?.user?.name || "Guest"}
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
                            {booking?.room?.roomType}
                          </span>
                          <span className="text-xs text-gray-500">
                            Room: {booking?.room?.roomNumber || "N/A"}
                          </span>
                        </div>
                      </td>

                      {/* Dates Column */}
                      <td className="px-6 py-4">
                        <div className="flex flex-col text-xs">
                          <span className="text-emerald-400/80">
                            In:{" "}
                            {new Date(booking?.checkInDate).toLocaleDateString(
                              "en-GB",
                            )}
                          </span>
                          <span className="text-rose-400/80">
                            Out:{" "}
                            {new Date(booking?.checkOutDate).toLocaleDateString(
                              "en-GB",
                            )}
                          </span>
                        </div>
                      </td>

                      {/* Guests Column */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <span>{booking?.guests}</span>
                          <span className="text-gray-600 text-xs">
                            Person(s)
                          </span>
                        </div>
                      </td>

                      {/* Amount Column */}
                      <td className="px-6 py-4 font-medium text-white">
                        ₹{booking?.totalPrice?.toLocaleString()}
                      </td>

                      {/* Status Column */}
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 text-[10px] uppercase tracking-widest rounded-full font-bold
                          ${
                            booking?.paymentStatus === "paid"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          }
                        `}
                        >
                          {booking?.paymentStatus === "paid"
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
              onClick={() => fetchAllBookings(page - 1)}
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
              onClick={() => fetchAllBookings(page + 1)}
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

export default Bookings;
