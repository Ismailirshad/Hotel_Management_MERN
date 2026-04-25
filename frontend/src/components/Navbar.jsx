import React, { useEffect, useState } from "react";
import {
  HiOutlineHome,
  HiOutlineOfficeBuilding,
  HiOutlineTicket,
  HiOutlineInformationCircle,
} from "react-icons/hi";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";
import { useUserStore } from "../store/useUserStore.js";
const LoginModal = React.lazy(() => import("./auth/LoginModal.jsx"))
const ForgotPasswordWrapper = React.lazy(() => import("./auth/ForgotPasswordWrapper.jsx"))

const Navbar = () => {
  const { user, logout } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);
  const [authMode, setAuthMode] = useState(null);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      // Logic for hiding/showing
      // if top value is 0 to 80 and if bottom value is 300
      setShowNavbar(window.scrollY < lastScroll || window.scrollY < 80);
      // Logic for background intensity
      setIsScrolled(window.scrollY > 20);
      setLastScroll(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  const navLinks = [
    { name: "Home", id: "home", icon: <HiOutlineHome size={18} /> },
    {
      name: "Hotels",
      id: "hotels",
      icon: <HiOutlineOfficeBuilding size={18} />,
    },
    { name: "Offers", id: "offers", icon: <HiOutlineTicket size={18} /> },
    {
      name: "About",
      id: "about",
      icon: <HiOutlineInformationCircle size={18} />,
    },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out
        ${showNavbar ? "translate-y-0" : "-translate-y-full"}
        ${isScrolled ? "py-3" : "py-5"}`}
      >
        {/* Floating Container Look */}
        <div
          className={`mx-auto transition-all duration-500 px-4 md:px-10 max-w-7xl`}
        >
          <div
            className={`
            backdrop-blur-md transition-all duration-500 rounded-4xl 
            ${isScrolled ? "" : "bg-white/80"}
          `}
          >
            <div className="flex items-center justify-between h-16 px-6 md:px-8">
              {/* LOGO */}

              <Link to="/" className="flex items-center gap-3 group cursor-pointer">
                <div className="relative">
                  <img
                    src="/Elite_logo.png"
                    alt="Logo"
                    loading="lazy"
                    className="h-10 w-10 rounded-full object-cover ring-2  ring-blue-500 transition-all duration-300"
                  />
                  <div className="absolute inset-0 rounded-full bg-emerald-500/10 animate-pulse group-hover:hidden" />
                </div>
                <span className="text-2xl font-black text-slate-900 tracking-tighter italic">
                  Elite<span className="text-emerald-600 not-italic">.</span>
                </span>
              </Link>

              {/* DESKTOP LINKS - Ultra Clean */}
              <div className="hidden lg:flex items-center gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.id}
                    to={`/#${link.id}`}
                    className="group flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-emerald-600 transition-colors duration-300"
                  >
                    <span className="text-slate-400 group-hover:text-emerald-500 transition-colors">
                      {link?.icon}
                    </span>
                    <span className="relative">
                      {link?.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full" />
                    </span>
                  </Link>
                ))}
              </div>

              {/* MOBILE MENU TOGGLE */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 lg:hidden rounded-xl bg-slate-100 text-slate-900 hover:bg-slate-200 transition-colors"
              >
                {isOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
              </button>

              {/* RIGHT ACTIONS */}
              <div className="flex items-center gap-3">
                {user ? (
                  <button
                    onClick={() => logout({ navigate })}
                    className="hidden md:block px-6 py-2.5 rounded-full bg-slate-900 text-white text-[13px] font-bold hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200"
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    onClick={() => setAuthMode("login")}
                    className="hidden md:block px-6 py-2.5 rounded-full bg-emerald-600 text-white text-[13px] font-bold hover:bg-emerald-700 transition-all active:scale-95 shadow-lg shadow-emerald-100"
                  >
                    Member Login
                  </button>
                )}



                {user && user.role === "admin" && (
                  <div className="flex flex-wrap gap-3">
                    <Link
                      to="/owner"
                      className="px-5 py-2.5 rounded-full bg-white/40 border border-white/50 backdrop-blur-xl text-slate-800 text-sm font-semibold shadow-md hover:bg-white/60 hover:text-slate-900 transition-all duration-300"
                    >
                      Owner Dashboard
                    </Link>
                  </div>
                )}
                {user && user.role === "superAdmin" && (
                  <div className="flex flex-wrap gap-3">
                    <Link
                      to="/superAdmin"
                      className="px-2 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/40 border border-white/50 backdrop-blur-xl text-slate-800 text-xs sm:text-sm  font-semibold shadow-md hover:bg-white/60 hover:text-slate-900 transition-all duration-300"
                    >
                      <Shield className="block lg:hidden" size={22} title={"Super Admin Dashboard"} />
                      <p className="hidden lg:block">Super Admin Dashboard</p>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`
    absolute top-full left-4 right-4 mt-3 z-50
    lg:hidden transition-all duration-300
    ${isOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-5 pointer-events-none"}
  `}
        >
          <div className="mx-auto w-full max-w-sm rounded-3xl border border-white/40 bg-white/85 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-4">

            {/* Nav Links */}
            <div className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link?.id}
                  to={`/#${link?.id}`}
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-800 font-semibold hover:bg-emerald-50 hover:text-emerald-600 transition-all"
                >
                  <div className="p-2 rounded-xl bg-slate-100 text-slate-500 group-hover:bg-emerald-100 group-hover:text-emerald-600 transition">
                    {link?.icon}
                  </div>

                  <span>{link?.name}</span>
                </Link>
              ))}
            </div>

            {/* Divider */}
            <div className="my-4 border-t border-slate-200" />

            {/* Action Button */}
            <button
              className="w-full py-3 rounded-2xl bg-linear-to-r from-emerald-500 to-emerald-600 text-white font-semibold shadow-lg hover:scale-[1.02] transition-all"
            >
              {user ? "Logout" : "Member Login"}
            </button>
          </div>
        </div>
      </nav>

      {/* MODALS */}
      {authMode === "login" && (
        <LoginModal
          setShowModal={() => setAuthMode(null)}
          openForgot={() => setAuthMode("forgotPassword")}
        />
      )}
      {authMode === "forgotPassword" && (
        <ForgotPasswordWrapper
          onClose={() => setAuthMode(null)}
          openLogin={() => setAuthMode("login")}
        />
      )}
    </>
  );
};

export default Navbar;
