import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BedDouble,
  CalendarCheck,
  ReceiptIndianRupee,
  Tag,
  LogOut,
  Bell,
  LayoutList,
  Home,
  X,
  Menu,
} from "lucide-react";
import { hotelStore } from "../../store/useHotelStore.js";
import { useUserStore } from "../../store/useUserStore.js";

const AdminNavbar = ({ toggleSidebar, openSideBar }) => {
  const location = useLocation();
  const navigate = useNavigate()

  const hotel = hotelStore((state) => state.hotel);

  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);

  const navItems = [
    {
      name: "Dashboard",
      path: "/owner",
      icon: <LayoutDashboard size={18} />,
    },
    {
      name: "Accounting",
      path: "/owner/accountingModule",
      icon: <ReceiptIndianRupee size={18} />,
    },
    {
      name: "Rooms",
      path: "/owner/addRoom",
      icon: <BedDouble size={18} />,
    },
    {
      name: "Bookings",
      path: "/owner/bookings",
      icon: <CalendarCheck size={18} />,
    },
    {
      name: "ListRoom",
      path: "/owner/listRoom",
      icon: <LayoutList size={18} />,
    },
    {
      name: "Offers",
      path: "/owner/offerSection",
      icon: <Tag size={18} />,
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0f1220]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between gap-3">

 <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-xl hover:bg-white/60"
            >
              {openSideBar ? <X size={20} /> : <Menu size={20} />}
            </button>

          {/* Left Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="h-9 w-9 rounded-xl bg-cyan-500 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.35)]">
              <span className="text-black font-bold text-lg">H</span>
            </div>

            <span className="hidden sm:block text-lg font-bold tracking-tight text-white">
              ADMIN<span className="text-cyan-400">PANEL</span>
            </span>
          </div>

          {/* Center Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item?.name}
                to={item?.path}
                title={item?.name}
                className={`p-2.5 rounded-xl transition-all duration-200 ${
                  isActive(item?.path)
                    ? "bg-cyan-500/10 text-cyan-400"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {item?.icon}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2 md:gap-4">

            {/* User View */}
            <Link
              to="/"
              className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10 text-sm text-gray-300 hover:text-white hover:bg-white/5 bg-white/15 transition"
            >
              <Home size={16} />
              User View
            </Link>

            {/* Bell */}
            <button className="relative p-2 text-gray-400 hover:text-cyan-400 transition">
              <Bell size={20} />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-rose-500 border border-[#0f1220]" />
            </button>

            <div className="hidden sm:block h-6 w-px bg-white/10" />

            {/* Profile */}
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="hidden md:block text-right leading-tight">
                <p className="text-xs font-medium text-white max-w-[120px] truncate">
                  {hotel?.name}
                </p>
                <p className="text-[10px] text-gray-500 uppercase">
                  {user?.role}
                </p>
              </div>

              <div className="h-10 w-10 rounded-full bg-linear-to-tr from-cyan-500 to-blue-500 p-px">
                <div className="h-full w-full rounded-full bg-[#0f1220] overflow-hidden">
                  <img
                    src={hotel?.image}
                    alt="Hotel"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Logout */}
            <button
              title="Logout"
              onClick={() => logout({navigate})}
              className="p-2 text-gray-400 hover:text-rose-400 transition"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;