import React from "react";

const PaymentPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#0f172a] via-[#111827] to-[#020617] px-4 py-10 flex items-center justify-center animate-pulse">
      <div className="w-full max-w-5xl bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 md:px-10 py-6 border-b border-white/10">
          <div className="flex flex-col md:flex-row md:items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-white/10" />

            <div className="flex-1 space-y-3">
              <div className="h-8 w-64 bg-white/10 rounded-lg" />
              <div className="h-4 w-80 max-w-full bg-white/10 rounded-lg" />
            </div>

            <div className="h-10 w-36 rounded-xl bg-white/10" />
          </div>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-6 p-6 md:p-10">
          {/* Left Card */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="h-6 w-40 bg-white/10 rounded mb-6" />

            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex justify-between gap-4">
                  <div className="h-4 w-24 bg-white/10 rounded" />
                  <div className="h-4 w-32 bg-white/10 rounded" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Card */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="h-6 w-44 bg-white/10 rounded mb-6" />

            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex justify-between">
                  <div className="h-4 w-28 bg-white/10 rounded" />
                  <div className="h-4 w-20 bg-white/10 rounded" />
                </div>
              ))}

              <div className="border-t border-white/10 pt-4 flex justify-between">
                <div className="h-6 w-32 bg-white/10 rounded" />
                <div className="h-6 w-24 bg-white/10 rounded" />
              </div>

              <div className="h-3 w-48 bg-white/10 rounded mt-2" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 md:px-10 pb-8">
          <div className="h-14 w-full bg-white/10 rounded-xl" />
          <div className="h-3 w-52 bg-white/10 rounded mx-auto mt-4" />
        </div>
      </div>
    </div>
  );
};

export default PaymentPageSkeleton;
