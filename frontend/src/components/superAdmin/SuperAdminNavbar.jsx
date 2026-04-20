import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Bell,
  Home,
  LogOut,
  Menu,
  Search,
  ShieldCheck,
  UserCircle2,
  X,
} from "lucide-react";
import { useUserStore } from "../../store/useUserStore.js";
import { useState } from "react";
import toast from "react-hot-toast";

const SuperAdminNavbar = ({ toggleSidebar, openSideBar }) => {
  const navigate = useNavigate();
  const [search, setSearch]  = useState("")
  const { user, logout } = useUserStore();

  const handleSearch = () => {
    const value = search.toLowerCase().trim()

    if(value.includes("hotel")){
      navigate("/superAdmin/superAdmin-allHotels")
    }
    else if(value.includes("booking") || value.includes("all")){
      navigate("/superAdmin/superAdmin-bookings")
    }
     else if(value.includes("accounting") || value.includes("erp")){
      navigate("/superAdmin/superAdmin-accountingModule")
    }
     else if(value.includes("list") || value.includes("rooms")){
      navigate("/superAdmin/superAdmin-listRoom")
    }
     else if(value.includes("support") || value.includes("request")){
      navigate("/superAdmin/superAdmin-supportRequests")
    }else{
      toast.error("No matching found")
    }
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#eadfca] bg-white/80 backdrop-blur-xl">
      <div className="px-4 md:px-8">
        <div className="h-16 flex items-center justify-between gap-4">
          {/* Left Side */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-xl hover:bg-white/60"
            >
              {openSideBar ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="w-10 h-10 rounded-2xl bg-[#fff7e6] flex items-center justify-center shadow-sm">
              <ShieldCheck className="w-5 h-5 text-[#b88917]" />
            </div>

            <div className="hidden sm:block">
              <h2 className="text-sm font-bold text-slate-900">Super Admin</h2>
              <p className="text-[11px] text-slate-500">Master Control Panel</p>
            </div>
          </div>

          {/* Center Search */}
          <div className="hidden lg:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />

              <input
                type="text"
                placeholder="Search hotels, bookings..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e)=> {
                  if(e.key === "Enter"){
                    handleSearch()
                  }
                }}
                className="w-2/3 rounded-2xl border border-[#eadfca] bg-[#fdfaf4] pl-11 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#b88917]/20"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* User View */}
            <Link
              to="/"
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-2xl border border-[#eadfca] bg-[#fdfaf4] text-sm font-medium text-slate-700 hover:bg-white transition"
            >
              <Home size={16} />
              User View
            </Link>

            {/* Notification */}
            <button className="relative p-2.5 rounded-xl text-slate-500 hover:bg-[#fdfaf4] hover:text-[#b88917] transition">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500"></span>
            </button>

            {/* Profile */}
            <div className="flex items-center gap-3 px-3 py-1.5 rounded-2xl bg-[#fdfaf4] border border-[#eadfca]">
              <UserCircle2 className="w-8 h-8 text-[#b88917]" />

              <div className="hidden md:block leading-tight">
                <p className="text-sm font-semibold text-slate-900">
                  {user?.name || "Super Admin"}
                </p>
                <p className="text-[11px] text-slate-500 uppercase">
                  {user?.role || "Admin"}
                </p>
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={() => logout({ navigate })}
              title="Logout"
              className="p-2.5 rounded-xl text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SuperAdminNavbar;
