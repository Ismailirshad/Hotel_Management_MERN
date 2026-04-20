import React from "react";

const SuperAdminListRoomSkeleton = () => {
  return (
    <div className="min-h-screen w-full bg-linear-to-br from-[#f8f4ea] via-[#fdfaf4] to-[#efe7d6] p-6 md:p-10 animate-pulse">
      <div className="space-y-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <div className="h-3 w-52 bg-[#eadfca] rounded-full mb-4"></div>
            <div className="h-10 w-64 bg-[#eadfca] rounded-xl mb-4"></div>
            <div className="h-4 w-full max-w-2xl bg-[#eadfca] rounded mb-2"></div>
            <div className="h-4 w-80 bg-[#eadfca] rounded"></div>
          </div>

          <div className="h-12 w-40 bg-white border border-[#eadfca] rounded-2xl shadow-md"></div>
        </div>

        {/* Main Card */}
        <div className="rounded-3xl bg-white border border-[#eadfca] shadow-lg overflow-hidden">

          {/* Card Top */}
          <div className="p-6 border-b border-[#f2ead9]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#f3ecdc]"></div>

              <div>
                <div className="h-6 w-32 bg-[#f3ecdc] rounded mb-2"></div>
                <div className="h-4 w-40 bg-[#f3ecdc] rounded"></div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="p-6 overflow-x-auto">
<div className="w-full min-w-[700px] lg:min-w-0 space-y-4">
              {/* Header Row */}
              <div className="grid grid-cols-6 gap-4 pb-4 border-b border-[#eadfca]">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-4 bg-[#f3ecdc] rounded"></div>
                ))}
              </div>

              {/* Body Rows */}
              {[...Array(6)].map((_, row) => (
                <div
                  key={row}
                  className="grid grid-cols-6 gap-4 py-4 border-b border-[#f5efe3]"
                >
                  <div className="h-4 bg-[#f3ecdc] rounded"></div>
                  <div className="h-4 bg-[#f3ecdc] rounded"></div>
                  <div className="h-4 bg-[#f3ecdc] rounded"></div>
                  <div className="h-4 bg-[#f3ecdc] rounded"></div>

                  <div className="flex justify-center">
                    <div className="h-7 w-24 rounded-full bg-[#f3ecdc]"></div>
                  </div>

                  <div className="flex justify-center">
                    <div className="h-7 w-16 rounded-full bg-[#f3ecdc]"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Pagination */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6 py-5 border-t border-[#eadfca] bg-[#fdfaf4]">
            <div className="h-4 w-28 bg-[#f3ecdc] rounded"></div>

            <div className="flex gap-3">
              <div className="h-10 w-24 rounded-xl bg-[#f3ecdc]"></div>
              <div className="h-10 w-10 rounded-xl bg-[#f3ecdc]"></div>
              <div className="h-10 w-24 rounded-xl bg-[#f3ecdc]"></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SuperAdminListRoomSkeleton;