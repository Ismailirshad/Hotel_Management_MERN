import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BedDouble,
  CalendarCheck,
  ReceiptIndianRupee,
  Tag,
  LayoutList,
} from "lucide-react";

const SuperAdminSideBar = () => {
  const navLinks = [
    { name: "Dashboard", path: "/superAdmin", icon: <LayoutDashboard size={18} /> },
    {
      name: "ERP Accounting Module",
      path: "/superAdmin/superAdmin-accountingModule",
      icon: <ReceiptIndianRupee size={18} />,
    },
    {
      name: "List Room",
      path: "/superAdmin/superAdmin-listRoom",
      icon: <LayoutList size={18} />,
    },
    {
      name: "Bookings",
      path: "/superAdmin/superAdmin-bookings",
      icon: <CalendarCheck size={18} />,
    },
  ];

  return (
    <aside
      className="
      h-screen
      w-24 md:w-60
      bg-linear-to-b from-[#0f1220] to-[#111827]
      border-r border-white/10
      flex flex-col
      items-center
      py-8
      gap-6
    "
    >
      {/* Brand / Title */}
      <div className="hidden md:block text-xl font-semibold text-gray-200 tracking-wide mb-4">
        Owner Panel
      </div>

      {/* Navigation */}
      <nav className="flex flex-col w-full gap-2 px-2">
        {navLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            end={link.path === "/owner"}
            className={({ isActive }) =>
              `
              flex items-center gap-3
              px-4 py-3 rounded-xl
              transition-all duration-200
              ${
                isActive
                  ? "bg-emerald-500/10 text-emerald-400 shadow-inner"
                  : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
              }
            `
            }
          >
            {link.icon}
            <span className="hidden md:block text-sm font-medium">
              {link.name}
            </span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default SuperAdminSideBar;
