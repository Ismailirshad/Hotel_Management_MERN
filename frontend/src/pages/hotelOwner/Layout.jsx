import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../../components/hotelOwner/SideBar";
import { hotelStore } from "../../store/useHotelStore.js";
import HotelReg from "../../components/HotelReg.jsx";
import { useEffect } from "react";
import AdminNavbar from "../../components/hotelOwner/AdminNavbar.jsx";

const Layout = () => {
  const [openSideBar, setOpenSideBar] = useState(false);
  const { hotel, getHotel, loading } = hotelStore();

  useEffect(() => {
    getHotel();
  }, [getHotel]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-400">
        Checking hotel details...
      </div>
    );
  }
  if (!hotel) {
    return <HotelReg />;
  }
  return (
    <div className="flex flex-col h-auto bg-linear-to-br from-[#0f1220] to-[#111827] text-gray-200">
      <AdminNavbar toggleSidebar={() => setOpenSideBar(!openSideBar)} />
      <div className="flex h-full">
        <div className={`${openSideBar ? "block " : "hidden"} md:flex`}>
          <SideBar />
        </div>

        <div className="flex-1 p-4 pt-10 md:px-10 h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
