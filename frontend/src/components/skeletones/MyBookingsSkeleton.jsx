import React from "react";

const MyBookingsSkeleton = () => {
  return (
    <div className="w-full min-h-screen bg-slate-50 animate-pulse">
      <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        {/* Header Skeleton */}
        <div className="mb-10">
          <div className="h-4 w-40 bg-slate-200 rounded-full mb-4"></div>
          <div className="h-10 w-64 bg-slate-200 rounded-xl"></div>
          <div className="h-4 w-96 bg-slate-200 rounded-full mt-4"></div>
        </div>

        {/* Booking Cards */}
        <div className="space-y-6">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 md:p-6"
            >
              <div className="grid grid-cols-1 lg:grid-cols-[2.2fr_1.2fr_1fr] gap-8">
                
                {/* Left Side */}
                <div className="flex flex-col sm:flex-row gap-5">
                  <div className="w-full sm:w-44 h-52 sm:h-36 rounded-2xl bg-slate-200"></div>

                  <div className="flex-1 space-y-3">
                    <div className="h-7 w-52 bg-slate-200 rounded-lg"></div>
                    <div className="h-4 w-full bg-slate-200 rounded"></div>
                    <div className="h-4 w-32 bg-slate-200 rounded"></div>
                    <div className="h-6 w-24 bg-slate-200 rounded"></div>

                    {/* Stars */}
                    <div className="flex gap-2 pt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <div
                          key={star}
                          className="w-6 h-6 bg-slate-200 rounded"
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Dates */}
                <div className="space-y-5">
                  <div className="space-y-2">
                    <div className="h-4 w-24 bg-slate-200 rounded"></div>
                    <div className="h-4 w-32 bg-slate-200 rounded"></div>
                  </div>

                  <div className="space-y-2">
                    <div className="h-4 w-24 bg-slate-200 rounded"></div>
                    <div className="h-4 w-32 bg-slate-200 rounded"></div>
                  </div>
                </div>

                {/* Payment */}
                <div className="space-y-4">
                  <div className="h-4 w-28 bg-slate-200 rounded"></div>
                  <div className="h-4 w-20 bg-slate-200 rounded"></div>
                  <div className="h-10 w-28 bg-slate-200 rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyBookingsSkeleton;