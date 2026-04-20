import React from "react";

const RoomDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16 animate-pulse">
      <div className="max-w-6xl mx-auto px-4 space-y-10">
        {/* IMAGES */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-sm h-[320px] sm:h-[420px] lg:h-[500px]" />

          <div className="grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-sm h-[150px] sm:h-[200px]"
              />
            ))}
          </div>
        </div>

        {/* DETAILS + BOOKING */}
        <div className="bg-white rounded-3xl shadow-md p-6 lg:p-8 grid lg:grid-cols-3 gap-8">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title + Price */}
            <div className="flex flex-col lg:flex-row lg:justify-between gap-6">
              <div className="space-y-4 flex-1">
                <div className="h-10 w-3/4 bg-slate-200 rounded-lg" />
                <div className="h-6 w-24 bg-slate-200 rounded-full" />
                <div className="h-5 w-40 bg-slate-200 rounded-lg" />
                <div className="h-5 w-full bg-slate-200 rounded-lg" />
              </div>

              <div className="bg-slate-100 rounded-2xl p-4 border border-slate-200 w-full lg:w-[220px] space-y-3">
                <div className="h-4 w-24 bg-slate-200 rounded" />
                <div className="h-10 w-32 bg-slate-200 rounded" />
              </div>
            </div>

            <div className="h-px bg-slate-200" />

            {/* Highlights */}
            <div className="space-y-4">
              <div className="h-7 w-48 bg-slate-200 rounded" />

              <div className="flex flex-wrap gap-3">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="h-10 w-28 bg-slate-200 rounded-full"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT BOOKING CARD */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-slate-100 rounded-2xl p-6 space-y-4 border border-slate-200">
              <div className="h-12 bg-slate-200 rounded-xl" />
              <div className="h-12 bg-slate-200 rounded-xl" />
              <div className="h-12 bg-slate-200 rounded-xl" />
              <div className="h-12 bg-slate-300 rounded-xl" />
            </div>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
          <div className="h-7 w-40 bg-slate-200 rounded" />
          <div className="h-4 w-full bg-slate-200 rounded" />
          <div className="h-4 w-11/12 bg-slate-200 rounded" />
          <div className="h-4 w-10/12 bg-slate-200 rounded" />

          <div className="space-y-4 pt-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="w-8 h-8 bg-slate-200 rounded-lg" />
                <div className="space-y-2 flex-1">
                  <div className="h-5 w-40 bg-slate-200 rounded" />
                  <div className="h-4 w-full bg-slate-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* HOST */}
        <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-slate-200 rounded-full" />
            <div className="space-y-2">
              <div className="h-5 w-40 bg-slate-200 rounded" />
              <div className="h-4 w-28 bg-slate-200 rounded" />
            </div>
          </div>

          <div className="h-12 w-40 bg-slate-300 rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default RoomDetailsSkeleton;