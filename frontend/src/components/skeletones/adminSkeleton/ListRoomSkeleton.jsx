import React from "react";

const ListRoomSkeleton = () => {
  return (
    <div className="min-h-screen w-full bg-linear-to-br from-[#0f1220] to-[#111827] p-8 animate-pulse">
      
      {/* Content Wrapper */}
      <div className="w-full">

        {/* Header */}
        <div className="mb-8 space-y-3">
          <div className="h-10 w-64 bg-white/10 rounded-xl"></div>
          <div className="h-4 w-96 bg-white/10 rounded"></div>
        </div>

        {/* Main Card */}
        <div className="w-full bg-[#1a1d2e]/80 border border-white/5 rounded-2xl shadow-lg overflow-hidden">

          {/* Title */}
          <div className="px-6 py-5 border-b border-white/5">
            <div className="h-6 w-32 bg-white/10 rounded"></div>
          </div>

          {/* Table */}
          <div className="px-6 py-4">
            <div className="space-y-4">

              {/* Header Row */}
              <div className="grid grid-cols-6 gap-4 pb-3 border-b border-white/5">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-4 bg-white/10 rounded"></div>
                ))}
              </div>

              {/* Rows */}
              {[...Array(5)].map((_, row) => (
                <div
                  key={row}
                  className="grid grid-cols-6 gap-4 py-4 border-b border-white/5"
                >
                  <div className="h-4 bg-white/10 rounded"></div>
                  <div className="h-4 bg-white/10 rounded"></div>
                  <div className="h-4 bg-white/10 rounded"></div>
                  <div className="h-4 bg-white/10 rounded"></div>

                  <div className="flex justify-center">
                    <div className="h-8 w-24 bg-white/10 rounded-full"></div>
                  </div>

                  <div className="flex justify-center">
                    <div className="h-6 w-11 bg-white/10 rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Pagination */}
          <div className="flex justify-between items-center px-6 py-5 border-t border-white/5 bg-[#11162a]">
            <div className="h-4 w-28 bg-white/10 rounded"></div>

            <div className="flex gap-3">
              <div className="h-10 w-24 bg-white/10 rounded-xl"></div>
              <div className="h-10 w-10 bg-white/10 rounded-xl"></div>
              <div className="h-10 w-24 bg-white/10 rounded-xl"></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ListRoomSkeleton;