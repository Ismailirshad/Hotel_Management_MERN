import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { hotelStore } from "../../store/useHotelStore.js";
const SideBar = React.lazy(
  () => import("../../components/hotelOwner/SideBar.jsx"),
);
const HotelReg = React.lazy(() => import("../../components/HotelReg.jsx"));
const AdminNavbar = React.lazy(
  () => import("../../components/hotelOwner/AdminNavbar.jsx"),
);

const Layout = () => {
  const [openSideBar, setOpenSideBar] = useState(false);
  const hotel = hotelStore((state) => state.hotel);
  const getHotel = hotelStore((state) => state.getHotel);
  const loading = hotelStore((state) => state.loading);

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

  if (!hotel) return <HotelReg />;

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0f1220] to-[#111827] text-gray-200">
      <AdminNavbar
        toggleSidebar={() => setOpenSideBar(!openSideBar)}
        openSideBar={openSideBar}
      />

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block fixed left-0 top-16 h-[calc(100vh-64px)] w-64 z-30">
          <SideBar />
        </div>

        {/* Mobile Sidebar */}
        {openSideBar && (
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              onClick={() => setOpenSideBar(false)}
            />

            {/* Sidebar Drawer */}
            <div className="fixed top-16 left-0 w-64 h-[calc(100vh-64px)] z-50 lg:hidden">
              <SideBar />
            </div>
          </>
        )}

        {/* Main Content */}
        <main className="flex-1 w-full pt-6 px-4 sm:px-6 lg:px-10 lg:ml-64">
          <div className="max-w-[1600px] mx-auto pb-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
