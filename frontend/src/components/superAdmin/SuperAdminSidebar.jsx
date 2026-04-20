
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarCheck,
  ReceiptIndianRupee,
  LayoutList,
  ShieldCheck,
} from "lucide-react";

const SuperAdminSideBar = () => {
  const navLinks = [
    {
      name: "Dashboard",
      path: "/superAdmin",
      icon: <LayoutDashboard size={18} />,
    },
    {
      name: "ERP Accounting",
      path: "/superAdmin/superAdmin-accountingModule",
      icon: <ReceiptIndianRupee size={18} />,
    },
    {
      name: "All Rooms",
      path: "/superAdmin/superAdmin-listRoom",
      icon: <LayoutList size={18} />,
    },
    {
      name: "All Hotels",
      path: "/superAdmin/superAdmin-allHotels",
      icon: <LayoutList size={18} />,
    },
    {
      name: "Bookings",
      path: "/superAdmin/superAdmin-bookings",
      icon: <CalendarCheck size={18} />,
    },
    {
      name: "Support Requests",
      path: "/superAdmin/superAdmin-supportRequests",
      icon: <ShieldCheck size={18} />,
    }
  ];

  return (
    <aside
      className="
        fixed
        h-screen
        w-24 md:w-64
        bg-gradient-to-b from-[#f8f4ea] via-[#fdfaf4] to-[#efe7d6]
        border-r border-[#eadfca]
        flex flex-col
        items-center
        py-8
        gap-6
        shadow-xl
      "
    >
      {/* Brand */}
      <div className="hidden md:flex flex-col items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-2xl bg-[#fff7e6] flex items-center justify-center shadow-md">
          <ShieldCheck className="w-6 h-6 text-[#b88917]" />
        </div>

        <div className="text-center">
          <h2 className="text-lg font-bold text-slate-900">Master Panel</h2>
          <p className="text-xs text-slate-500 tracking-wide">
            Super Admin
          </p>
        </div>
      </div>

      {/* Mobile Icon */}
      <div className="md:hidden w-12 h-12 rounded-2xl bg-[#fff7e6] flex items-center justify-center shadow-md">
        <ShieldCheck className="w-6 h-6 text-[#b88917]" />
      </div>

      {/* Navigation */}
      <nav className="flex flex-col w-full gap-2 px-3">
        {navLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            end={link.path === "/superAdmin"}
            className={({ isActive }) =>
              `
              group flex items-center gap-3
              px-4 py-3 rounded-2xl
              transition-all duration-300
              ${
                isActive
                  ? "bg-white text-[#b88917] shadow-md border border-[#eadfca]"
                  : "text-slate-600 hover:bg-white/80 hover:text-slate-900"
              }
            `
            }
          >
            <span className="shrink-0">{link.icon}</span>

            <span className="hidden md:block text-sm font-semibold">
              {link.name}
            </span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default SuperAdminSideBar;
