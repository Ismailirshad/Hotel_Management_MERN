import React from "react";

const SuperAdminAllHotelsSkeleton = () => {
  return (
    <div className="min-h-screen w-full bg-[#f8f6f1] p-6 animate-pulse">
      <div className="space-y-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="h-9 w-52 bg-[#e9e2d3] rounded-xl mb-3"></div>
            <div className="h-4 w-72 bg-[#e9e2d3] rounded"></div>
          </div>

          {/* Search */}
          <div className="h-12 w-full md:w-[350px] bg-white border border-[#e9e2d3] rounded-2xl shadow-sm"></div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 shadow-sm border border-[#eee7d8]"
            >
              <div className="h-4 w-24 bg-[#f1ebdf] rounded mb-3"></div>
              <div className="h-8 w-16 bg-[#f1ebdf] rounded"></div>
            </div>
          ))}
        </div>

        {/* Hotel Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl overflow-hidden shadow-sm border border-[#eee7d8]"
            >
              {/* Image */}
              <div className="h-52 w-full bg-[#f1ebdf]"></div>

              {/* Content */}
              <div className="p-5">
                {/* Title + Rating */}
                <div className="flex justify-between items-start gap-3">
                  <div className="h-6 w-40 bg-[#f1ebdf] rounded"></div>
                  <div className="h-7 w-14 bg-[#f1ebdf] rounded-xl"></div>
                </div>

                {/* Info */}
                <div className="mt-4 space-y-3">
                  <div className="h-4 w-full bg-[#f1ebdf] rounded"></div>
                  <div className="h-4 w-2/3 bg-[#f1ebdf] rounded"></div>
                  <div className="h-4 w-1/2 bg-[#f1ebdf] rounded"></div>
                </div>

                {/* Footer */}
                <div className="mt-5 flex justify-between items-center">
                  <div className="h-4 w-28 bg-[#f1ebdf] rounded"></div>
                  <div className="h-6 w-11 rounded-full bg-[#f1ebdf]"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default SuperAdminAllHotelsSkeleton;