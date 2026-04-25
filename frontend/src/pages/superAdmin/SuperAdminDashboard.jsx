import React, { memo, useEffect, useMemo, useState } from "react";
import {
  Building2,
  CalendarCheck2,
  IndianRupee,
  LogIn,
  Clock3,
  BedDouble,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Legend,
  Cell,
} from "recharts";
import api from "../../lib/axios.js";
import DashboardSkeleton from "../../components/skeletones/superAdminSkeleton/DashboardSkeleton.jsx";

const SuperAdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const res = await api.get("/superAdmin", { withCredentials: true });
      setDashboardData(res.data);
    } catch (error) {
      console.log("Error fetching dashboard", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const graphData = useMemo(() => {
    if (!dashboardData) return [];

    return [
      { name: "Bookings", value: dashboardData.totalBookings },
      { name: "Rooms", value: dashboardData.availableRooms },
      { name: "CheckIn", value: dashboardData.checkInGuests },
      { name: "Reserved", value: dashboardData.reservedGuests },
    ];
  }, [dashboardData]);

  if (loading || !dashboardData) {
    return (
      <div className="min-h-screen bg-[#f8f4ea] flex items-center justify-center">
        <DashboardSkeleton />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-linear-to-br from-[#f8f4ea] via-[#fdfaf4] to-[#efe7d6] text-slate-800 p-0 sm:p-6 md:p-10">
      {/* Header */}
      <div className="mb-10">
        <p className="uppercase tracking-[0.35em] text-xs font-semibold text-[#b88917] mb-3">
          Executive Control Center
        </p>

        <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
          Super Admin Dashboard
        </h1>

        <p className="text-slate-500 mt-3 max-w-2xl text-base md:text-lg">
          Oversee hotels, bookings, revenue and platform-wide operations with a
          refined executive experience.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Total Hotels */}
        <div className="rounded-3xl bg-white border border-[#eadfca] shadow-lg p-6 hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Hotels</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">
                {dashboardData?.totalHotels}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-300/50">
              <Building2 className="w-8 h-8 text-slate-700" />
            </div>
          </div>
        </div>

        {/* Total Bookings */}
        <div className="rounded-3xl bg-white border border-[#eadfca] shadow-lg p-6 hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Bookings</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">
                {dashboardData?.totalBookings}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-300/50">
              <CalendarCheck2 className="w-8 h-8 text-slate-700" />
            </div>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="rounded-3xl bg-white border border-[#eadfca] shadow-lg p-6 hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Revenue</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">
                ₹{dashboardData?.totalRevenue}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-300/50">
              <IndianRupee className="w-8 h-8 text-slate-700" />
            </div>
          </div>
        </div>

        {/* Check-In Guests */}
        <div className="rounded-3xl bg-white border border-[#eadfca] shadow-lg p-6 hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Check-In Guests</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">
                {dashboardData?.checkInGuests}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-300/50">
              <LogIn className="w-8 h-8 text-slate-700" />
            </div>
          </div>
        </div>

        {/* Reserved Guests */}
        <div className="rounded-3xl bg-white border border-[#eadfca] shadow-lg p-6 hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Reserved Guests</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">
                {dashboardData?.reservedGuests}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-300/50">
              <Clock3 className="w-8 h-8 text-slate-700" />
            </div>
          </div>
        </div>

        {/* Available Rooms */}
        <div className="rounded-3xl bg-white border border-[#eadfca] shadow-lg p-6 hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Available Rooms</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">
                {dashboardData?.availableRooms}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-300/50">
              <BedDouble className="w-8 h-8 text-slate-700" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-lg border border-[#eadfca] p-6 mt-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Platform Analytics
        </h2>

        <div className="h-[380px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={graphData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#b88917" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default memo(SuperAdminDashboard);
