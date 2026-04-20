import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { offerStore } from "../../store/useOfferStore.js";
import api from "../../lib/axios.js";
import DashboardSkeleton from "../../components/skeletones/adminSkeleton/DashboardSkeleton.jsx";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";

const Dashboard = () => {
  const { offer, fetchOffer } = offerStore();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      console.log("useEffect triggered: Fetching data...");
      setLoading(true);
      try {
        const res = await api.get("/admin", { withCredentials: true });
        setDashboardData(res.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("Error in fetching dashboard data", error);
      }
    };
    fetchDashboardData();
    fetchOffer();
  }, []);
  console.log("Dashboard Data", dashboardData);

  if (loading || !dashboardData) {
    return (
      <div className="min-h-screen bg-[#0f1220] flex items-center justify-center">
        <DashboardSkeleton />
      </div>
    );
  }

  const graphData = [
    { name: "Bookings", value: dashboardData.totalBookings },
    { name: "Rooms", value: dashboardData.availableRooms },
    { name: "CheckIn", value: dashboardData.checkInGuests },
    { name: "Reserved", value: dashboardData.reservedGuests },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0f1220] to-[#111827] text-gray-200 p-0 sm:p-6 md:p-10">
      {/* Header */}
      <div className="max-w-4xl space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-gray-400">
          Monitor your room listings, track bookings and analyze revenue — all
          in one place.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 max-w-4xl">
        {/* Total Bookings */}
        <div className="bg-[#1a1d2e]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-6 flex items-center gap-4 shadow-lg">
          <div className="p-3 rounded-xl bg-[#7de2d1]/20">
            <img
              src={assets.totalBookingIcon}
              alt="Booking Icon"
              loading="lazy"
              className="w-8 h-8"
            />
          </div>
          <div>
            <p className="text-sm text-gray-400">Total Bookings</p>
            <p className="text-2xl font-semibold text-[#7de2d1]">
              {dashboardData.totalBookings}
            </p>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-[#1a1d2e]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-6 flex items-center gap-4 shadow-lg">
          <div className="p-3 rounded-xl bg-[#38bdf8]/20">
            <img
              src={assets.totalRevenueIcon}
              alt="Revenue Icon"
              loading="lazy"
              className="w-8 h-8"
            />
          </div>
          <div>
            <p className="text-sm text-gray-400">Total Revenue</p>
            <p className="text-2xl font-semibold text-[#38bdf8]">
              ₹{dashboardData.totalRevenue.toFixed(2)}
            </p>
          </div>
        </div>

        {/* CheckIn */}
        <div className="bg-[#1a1d2e]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-6 flex items-center gap-4 shadow-lg">
          <div className="p-3 rounded-xl bg-[#7de2d1]/20">
            <img
              src={assets.totalBookingIcon}
              alt="CheckIn Icon"
              loading="lazy"
              className="w-8 h-8"
            />
          </div>
          <div>
            <p className="text-sm text-gray-400">CheckIn Guests</p>
            <p className="text-2xl font-semibold text-[#7de2d1]">
              {dashboardData.checkInGuests}
            </p>
          </div>
        </div>

        {/* Reserved */}
        <div className="bg-[#1a1d2e]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-6 flex items-center gap-4 shadow-lg">
          <div className="p-3 rounded-xl bg-[#7de2d1]/20">
            <img
              src={assets.totalBookingIcon}
              alt="Reserved Icon"
              loading="lazy"
              className="w-8 h-8"
            />
          </div>
          <div>
            <p className="text-sm text-gray-400">Reserved Guests </p>
            <p className="text-2xl font-semibold text-[#7de2d1]">
              {dashboardData.reservedGuests}
            </p>
          </div>
        </div>

        {/* Total Available */}
        <div className="bg-[#1a1d2e]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-6 flex items-center gap-4 shadow-lg">
          <div className="p-3 rounded-xl bg-[#7de2d1]/20">
            <img
              src={assets.totalBookingIcon}
              alt="Available Icon"
              loading="lazy"
              className="w-8 h-8"
            />
          </div>
          <div>
            <p className="text-sm text-gray-400">Available Rooms</p>
            <p className="text-2xl font-semibold text-[#7de2d1]">
              {dashboardData.availableRooms}
            </p>
          </div>
        </div>

        {/* Active Offer */}
        <div className="bg-[#1a1d2e]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-6 flex items-center gap-4 shadow-lg">
          {/* Icon */}
          <div className="p-3 rounded-xl bg-rose-500/20">
            <span className="text-2xl">🔥</span>
          </div>

          {/* Content */}
          <div className="flex-1">
            <p className="text-sm text-gray-400">Active Offer</p>

            {offer && offer.isActive ? (
              <>
                <p className="text-xl font-semibold text-rose-400">
                  {offer.priceOff}% OFF
                </p>
                <p className="text-xs text-gray-400">
                  Expires on{" "}
                  {new Date(offer.expiryDate).toLocaleDateString("en-GB")}
                </p>
              </>
            ) : (
              <p className="text-sm text-gray-500 mt-1">No active offer</p>
            )}
          </div>

          {/* Status Badge */}
          <div>
            {offer && offer.isActive ? (
              <span className="px-3 py-1 text-xs rounded-full bg-green-500/20 text-green-400">
                LIVE
              </span>
            ) : (
              <span className="px-3 py-1 text-xs rounded-full bg-gray-500/20 text-gray-400">
                OFF
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="bg-[#1a1d2e]/90 border border-white/5 rounded-2xl p-6 shadow-lg mt-5">
        <h2 className="text-2xl font-bold text-slat-200 mb-4">
          Platform Analytics
        </h2>

        <div className="h-[380px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={graphData}>
              <CartesianGrid stroke="#475569" strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Bar dataKey="value" fill="#38bdf8" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
