import React, { useEffect, useState } from "react";
import {
  CalendarDays,
  BedDouble,
  Users,
  IndianRupee,
  BadgeCheck,
  Clock3,
} from "lucide-react";
import toast from "react-hot-toast";
import api from "../../lib/axios.js";
import SuperAdminBookingsSkeleton from "../../components/skeletones/superAdminSkeleton/AllBookingsSkeleton.jsx";
import AllBookingsCard from "../../components/AllBookingsCard.jsx";

const SuperAdminBookings = () => {
  const [loading, setLoading] = useState(false);
  const [allBookings, setAllBookings] = useState([]);
  const [page, setPage] = useState(1);
  const [totalBookings, setTotalBookings] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const fetchAllBookings = async () => {
    setLoading(true);
    try {
      const res = await api.get(
        `/superAdmin/all-bookings?page=${page}&limit=10`,
        {
          withCredentials: true,
        },
      );
      setAllBookings(res.data.bookings);
      setTotalBookings(res.data.totalBookings);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.log("Error in fetchAllBookings", error);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBookings();
  }, [page]);

  if (loading) {
    return <SuperAdminBookingsSkeleton />;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#f8f4ea] via-[#fdfaf4] to-[#efe7d6] text-slate-800 p-0 sm:p-6 md:p-10">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <p className="uppercase tracking-[0.35em] text-xs font-semibold text-[#b88917] mb-3">
            Reservation Control Center
          </p>

          <h1 className="text-4xl font-bold text-slate-900">All Bookings</h1>

          <p className="text-slate-500 mt-2 max-w-2xl">
            View and monitor all reservations, guest details, stay dates and
            payment status across the platform.
          </p>
        </div>

        <div className="px-5 py-3 rounded-2xl bg-white border border-[#eadfca] shadow-md text-sm font-semibold text-slate-700 w-fit">
          Total: {totalBookings} Bookings
        </div>
      </div>

      {/* Table Card */}
      <div className="rounded-3xl bg-white border border-[#eadfca] shadow-lg ">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#eadfca] text-slate-500">
                <th className="text-left px-6 py-4">Booked On</th>
                <th className="text-left px-6 py-4">Guest / ID</th>
                <th className="text-left px-6 py-4">Room</th>
                <th className="text-left px-6 py-4">Stay Dates</th>
                <th className="text-left px-6 py-4">Guests</th>
                <th className="text-left px-6 py-4">Amount</th>
                <th className="text-left px-6 py-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {allBookings.length > 0 ? (
                allBookings.map((booking) => (
                  <AllBookingsCard key={booking._id} booking={booking} />
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-10 text-slate-400">
                    No bookings found.
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
            <div className="px-4 py-2 rounded-xl bg-[#b88917] text-white text-sm font-bold shadow-md min-w-[44px] text-center">
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

export default SuperAdminBookings;
