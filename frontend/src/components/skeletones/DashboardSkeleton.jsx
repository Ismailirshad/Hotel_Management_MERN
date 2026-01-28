const DashboardSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#0f1220] text-gray-200 p-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="max-w-4xl space-y-3">
        <div className="h-10 w-48 bg-white/10 rounded-lg"></div>
        <div className="h-4 w-3/4 bg-white/5 rounded"></div>
        <div className="h-4 w-1/2 bg-white/5 rounded"></div>
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 max-w-4xl">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className="bg-[#1a1d2e]/80 border border-white/5 rounded-2xl p-6 flex items-center gap-4 shadow-lg"
          >
            {/* Icon Box Placeholder */}
            <div className="w-14 h-14 rounded-xl bg-white/5"></div>
            
            {/* Text Placeholder */}
            <div className="flex-1 space-y-2">
              <div className="h-3 w-24 bg-white/10 rounded"></div>
              <div className="h-6 w-16 bg-white/5 rounded"></div>
            </div>
            
            {/* Optional Badge Placeholder for the last card */}
            {i === 5 && (
               <div className="h-5 w-12 bg-white/5 rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardSkeleton;