import React from "react";

const HotelDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">

        {/* Hotel Info Skeleton */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-6 md:p-8">

            {/* Image */}
            <div className="w-full h-[300px] md:h-[450px] bg-slate-200 rounded-2xl" />

            {/* Content */}
            <div className="space-y-5 flex flex-col justify-center">

              <div className="space-y-3">
                <div className="h-4 w-28 bg-slate-200 rounded-full" />
                <div className="h-10 w-3/4 bg-slate-200 rounded-xl" />
              </div>

              {/* Rating */}
              <div className="flex gap-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 bg-slate-200 rounded-md"
                  />
                ))}
              </div>

              {/* Info */}
              <div className="space-y-3">
                <div className="h-5 w-full bg-slate-200 rounded-lg" />
                <div className="h-5 w-2/3 bg-slate-200 rounded-lg" />
              </div>

              {/* About */}
              <div className="space-y-3 pt-2">
                <div className="h-6 w-40 bg-slate-200 rounded-lg" />
                <div className="h-4 w-full bg-slate-200 rounded-lg" />
                <div className="h-4 w-full bg-slate-200 rounded-lg" />
                <div className="h-4 w-5/6 bg-slate-200 rounded-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Section Header */}
        <div className="space-y-3">
          <div className="h-4 w-28 bg-slate-200 rounded-full" />
          <div className="h-10 w-64 bg-slate-200 rounded-xl" />
          <div className="h-4 w-full max-w-xl bg-slate-200 rounded-lg" />
        </div>

        {/* Rooms Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2].map((item) => (
            <div
              key={item}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 md:p-5"
            >
              <div className="flex flex-col sm:flex-row gap-5">

                {/* Room Image */}
                <div className="w-full sm:w-1/3 h-56 bg-slate-200 rounded-2xl" />

                {/* Room Content */}
                <div className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <div className="h-7 w-40 bg-slate-200 rounded-lg" />
                    <div className="h-5 w-28 bg-slate-200 rounded-lg" />
                  </div>

                  {/* Amenities */}
                  <div className="grid grid-cols-2 gap-2">
                    {[1, 2, 3, 4].map((a) => (
                      <div
                        key={a}
                        className="h-10 bg-slate-100 border border-slate-200 rounded-xl"
                      />
                    ))}
                  </div>

                  {/* Button */}
                  <div className="h-10 w-28 bg-slate-200 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Button */}
        <div className="flex justify-center">
          <div className="h-12 w-60 bg-slate-200 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default HotelDetailsSkeleton;