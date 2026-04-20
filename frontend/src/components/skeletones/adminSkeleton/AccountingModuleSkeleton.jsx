import React from "react";

const AccountingModuleSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#0f1220] p-8 animate-pulse">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Title */}
        <div className="h-10 w-72 bg-white/10 rounded-xl"></div>

        {/* Summary Cards */}
        <div className="grid sm:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-[#1a1d2e]/90 border border-white/5 rounded-2xl p-6"
            >
              <div className="h-4 w-28 bg-white/10 rounded mb-4"></div>
              <div className="h-8 w-24 bg-white/10 rounded"></div>
            </div>
          ))}
        </div>

        {/* Form Skeleton */}
        <div className="bg-[#1a1d2e]/90 border border-white/5 rounded-2xl p-6 space-y-5">
          <div className="h-6 w-40 bg-white/10 rounded"></div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="h-11 bg-white/10 rounded-lg"></div>
            <div className="h-11 bg-white/10 rounded-lg"></div>
            <div className="h-11 bg-white/10 rounded-lg"></div>
          </div>

          <div className="h-10 w-36 bg-white/10 rounded-full"></div>
        </div>

        {/* Table Skeleton */}
        <div className="bg-[#1a1d2e]/90 border border-white/5 rounded-2xl p-6">
          <div className="h-6 w-40 bg-white/10 rounded mb-6"></div>

          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="grid grid-cols-4 gap-4 border-b border-white/5 pb-3"
              >
                <div className="h-4 bg-white/10 rounded"></div>
                <div className="h-4 bg-white/10 rounded"></div>
                <div className="h-4 bg-white/10 rounded"></div>
                <div className="h-4 bg-white/10 rounded"></div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AccountingModuleSkeleton;