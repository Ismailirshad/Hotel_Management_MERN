import React from "react";

const DashboardSkeleton = () => {
  return (
    <div className="min-h-screen w-full bg-linear-to-br from-[#f8f4ea] via-[#fdfaf4] to-[#efe7d6] p-6 md:p-10 animate-pulse">
      
      {/* Header */}
      <div className="mb-10">
        <div className="h-3 w-44 bg-[#eadfca] rounded-full mb-4"></div>
        <div className="h-10 w-80 bg-[#eadfca] rounded-xl mb-4"></div>
        <div className="h-4 w-full max-w-2xl bg-[#eadfca] rounded mb-2"></div>
        <div className="h-4 w-96 bg-[#eadfca] rounded"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="rounded-3xl bg-white border border-[#eadfca] shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              
              {/* Left Content */}
              <div className="flex-1">
                <div className="h-4 w-28 bg-[#f3ecdc] rounded mb-4"></div>
                <div className="h-8 w-20 bg-[#f3ecdc] rounded"></div>
              </div>

              {/* Icon Box */}
              <div className="w-16 h-16 rounded-2xl bg-[#f3ecdc]"></div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default DashboardSkeleton;