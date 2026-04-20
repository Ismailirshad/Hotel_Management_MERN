import React from "react";

const BookingsSkeleton = () => {
  return (
    <div className="mt-12 max-w-6xl min-h-screen animate-pulse">
      
      {/* Top Header */}
      <div className="flex justify-between items-center mb-6 gap-4">
        <div className="space-y-3">
          <div className="h-8 w-56 bg-white/10 rounded-xl"></div>
          <div className="h-4 w-80 bg-white/10 rounded"></div>
        </div>

        <div className="h-10 w-44 bg-white/10 rounded-lg"></div>
      </div>

      {/* Main Table Card */}
      <div className="bg-[#1a1d2e]/80 backdrop-blur-xl border border-white/5 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Table Header */}
        <div className="bg-white/5 px-6 py-4 border-b border-white/5">
          <div className="grid grid-cols-7 gap-4">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="h-4 bg-white/10 rounded"></div>
            ))}
          </div>
        </div>

        {/* Table Rows */}
        <div className="px-6 py-2">
          {[...Array(5)].map((_, row) => (
            <div
              key={row}
              className="grid grid-cols-7 gap-4 py-5 border-b border-white/5"
            >
              <div className="h-4 bg-white/10 rounded"></div>
              <div className="space-y-2">
                <div className="h-4 bg-white/10 rounded"></div>
                <div className="h-3 w-16 bg-white/10 rounded"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-white/10 rounded"></div>
                <div className="h-3 w-20 bg-white/10 rounded"></div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-white/10 rounded"></div>
                <div className="h-3 bg-white/10 rounded"></div>
              </div>
              <div className="h-4 w-16 bg-white/10 rounded"></div>
              <div className="h-4 w-20 bg-white/10 rounded"></div>
              <div className="h-7 w-24 bg-white/10 rounded-full"></div>
            </div>
          ))}
        </div>

        {/* Pagination Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6 py-5 border-t border-white/10 bg-[#11162a]">
          <div className="h-4 w-28 bg-white/10 rounded"></div>

          <div className="flex items-center gap-3">
            <div className="h-10 w-24 bg-white/10 rounded-xl"></div>
            <div className="h-10 w-10 bg-white/10 rounded-xl"></div>
            <div className="h-10 w-24 bg-white/10 rounded-xl"></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BookingsSkeleton;