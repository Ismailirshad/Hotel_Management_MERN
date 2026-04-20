import React, { useCallback, useState } from "react";
import { Outlet } from "react-router-dom";
const SuperAdminNavbar = React.lazy(
  () => import("../../components/superAdmin/SuperAdminNavbar.jsx"),
);
const SuperAdminSideBar = React.lazy(
  () => import("../../components/superAdmin/superAdminSidebar.jsx"),
);

const SuperAdminLayout = () => {
  const [openSideBar, setOpenSideBar] = useState(false);

  const toggleSidebar = useCallback(() => {
    setOpenSideBar((current) => !current);
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-[#f8f4ea] via-[#fdfaf4] to-[#efe7d6]">
      <SuperAdminNavbar
        toggleSidebar={toggleSidebar}
        openSideBar={openSideBar}
      />

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block fixed top-16 left-0 z-30">
          <SuperAdminSideBar />
        </div>

        {/* Mobile Sidebar */}
        {openSideBar && (
          <>
            <div
              className="fixed inset-0 bg-black/30 z-40 md:hidden"
              onClick={() => setOpenSideBar(false)}
            />

            <div className="fixed top-16 left-0 z-50 lg:hidden">
              <SuperAdminSideBar />
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

export default SuperAdminLayout;
