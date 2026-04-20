import React from "react";

const AccountingModuleSkeleton = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#f8f4ea] via-[#fdfaf4] to-[#efe7d6] p-6 md:p-10 animate-pulse">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div>
          <div className="h-3 w-52 bg-[#eadfca] rounded-full mb-4"></div>
          <div className="h-10 w-80 bg-[#eadfca] rounded-xl mb-4"></div>
          <div className="h-4 w-full max-w-2xl bg-[#eadfca] rounded mb-2"></div>
          <div className="h-4 w-96 bg-[#eadfca] rounded"></div>
        </div>

        {/* Summary Cards */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="rounded-3xl bg-white border border-[#eadfca] shadow-lg p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="h-4 w-28 bg-[#f3ecdc] rounded mb-4"></div>
                  <div className="h-8 w-24 bg-[#f3ecdc] rounded"></div>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-[#f3ecdc]"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="rounded-3xl bg-white border border-[#eadfca] shadow-lg p-6 space-y-5">
          <div className="h-8 w-48 bg-[#f3ecdc] rounded"></div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="h-12 rounded-xl bg-[#f3ecdc]"></div>
            <div className="h-12 rounded-xl bg-[#f3ecdc]"></div>
            <div className="h-12 rounded-xl bg-[#f3ecdc]"></div>
          </div>

          <div className="h-11 w-40 rounded-full bg-[#f3ecdc]"></div>
        </div>

        {/* Table Card */}
        <div className="rounded-3xl bg-white border border-[#eadfca] shadow-lg p-6">
          <div className="h-8 w-48 bg-[#f3ecdc] rounded mb-6"></div>

          {/* Table Header */}
          <div className="grid grid-cols-4 gap-4 pb-4 border-b border-[#eadfca] mb-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-4 bg-[#f3ecdc] rounded"></div>
            ))}
          </div>

          {/* Rows */}
          <div className="space-y-4">
            {[...Array(5)].map((_, row) => (
              <div
                key={row}
                className="grid grid-cols-4 gap-4 pb-4 border-b border-[#f5efe3]"
              >
                <div className="h-4 bg-[#f3ecdc] rounded"></div>
                <div className="h-4 bg-[#f3ecdc] rounded"></div>
                <div className="h-4 bg-[#f3ecdc] rounded"></div>
                <div className="h-4 bg-[#f3ecdc] rounded"></div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AccountingModuleSkeleton;