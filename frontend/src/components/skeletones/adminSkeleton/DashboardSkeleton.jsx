import React from "react";
const DashboardSkeleton = () => {
  return (
    <div className="min-h-screen w-full bg-linear-to-br from-[#0f1220] to-[#111827] p-8 animate-pulse">
      
      {/* Main Content Area */}
      <div className="w-full max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8 space-y-4">
          <div className="h-10 w-60 rounded-xl bg-white/10"></div>
          <div className="h-4 w-full max-w-2xl rounded-md bg-white/10"></div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-[#1a1d2e]/80 border border-white/5 rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center gap-4">
                
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-white/10"></div>

                {/* Text */}
                <div className="flex-1">
                  <div className="h-3 w-28 bg-white/10 rounded mb-3"></div>
                  <div className="h-7 w-20 bg-white/10 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default DashboardSkeleton;