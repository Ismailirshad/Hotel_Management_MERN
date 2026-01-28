import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  BedDouble, 
  CalendarCheck, 
  ReceiptIndianRupee, 
  Tag, 
  Settings,
  LogOut,
  Bell,
  LayoutList,
} from "lucide-react";
import { hotelStore } from "../../store/useHotelStore";
import { useUserStore } from "../../store/useUserStore";

const AdminNavbar = () => {
  const location = useLocation();
  const {hotel} = hotelStore();
  const {user, logout} = useUserStore()
  const navigate = useNavigate();

  const navItems = [
    { name: "Dashboard", path: "/owner", icon: <LayoutDashboard size={18} /> },
    { name: "Rooms", path: "/owner/addRoom", icon: <BedDouble size={18} /> },
    { name: "Bookings", path: "/owner/bookings", icon: <CalendarCheck size={18} /> },
    { name: "ListRoom", path: "/owner/listRoom", icon: <LayoutList size={18} /> },
    { name: "Accounting", path: "/owner/accountingModule", icon: <ReceiptIndianRupee size={18} /> },
    { name: "Offers", path: "/owner/offerSection", icon: <Tag size={18} /> },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0f1220]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-cyan-500 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)]">
              <span className="text-black font-bold text-xl">H</span>
            </div>
            <span className="text-lg font-bold tracking-tight bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent">
              ADMIN<span className="text-cyan-400">PANEL</span>
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
               title={item.name}
                key={item.name}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? "bg-cyan-500/10 text-cyan-400"
                    : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                }`}
              >
                {item.icon}
              </Link>
            ))}
          </div>

          {/* Right Side Tools */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="p-2 text-gray-400 hover:text-cyan-400 transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-[#0f1220]"></span>
            </button>

            <div className="h-6 w-[1px] bg-white/10 mx-2"></div>

            {/* Profile Dropdown Placeholder */}
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-medium text-gray-200">{hotel.name}</p>
                <p className="text-[10px] text-gray-500">{(user.role).toUpperCase()}</p>
              </div>
              <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-500 p-[1px]">
                <div className="h-full w-full rounded-full bg-[#0f1220] flex items-center justify-center overflow-hidden">
                 {console.log(hotel)}
                  <img 
                    src= {hotel?.image}
                    alt="Hotel avatar" 
                  />
                </div>
              </div>
            </div>

            {/* Logout */}
            <button onClick={() => logout({navigate})} className="p-2 text-gray-400 hover:text-rose-400 transition-colors">
              <LogOut size={20} />
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;