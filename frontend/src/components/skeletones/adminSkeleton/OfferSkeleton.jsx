const OfferSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Active Status Bar Skeleton */}
      <div className="max-w-5xl mb-6 h-20 rounded-xl border border-white/5 bg-white/5 p-4 flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-4 w-32 bg-white/10 rounded"></div>
          <div className="h-3 w-48 bg-white/5 rounded"></div>
        </div>
        <div className="h-10 w-32 bg-white/10 rounded-lg"></div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 max-w-5xl">
        {/* Form Skeleton */}
        <div className="bg-[#1a1d2e]/90 border border-white/5 rounded-2xl p-6 space-y-6">
          <div className="h-6 w-32 bg-white/10 rounded mb-4"></div>
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-3 w-20 bg-white/10 rounded"></div>
              <div className="h-12 w-full bg-white/5 rounded-xl"></div>
            </div>
          ))}
          <div className="h-12 w-full bg-white/10 rounded-xl mt-4"></div>
        </div>

        {/* Preview Skeleton */}
        <div className="bg-[#1a1d2e]/90 border border-white/5 rounded-2xl p-6">
          <div className="h-6 w-28 bg-white/10 rounded mb-4"></div>
          <div className="relative rounded-xl overflow-hidden h-56 bg-white/5">
             <div className="absolute bottom-4 left-4 space-y-2">
                <div className="h-5 w-40 bg-white/10 rounded"></div>
                <div className="h-4 w-56 bg-white/5 rounded"></div>
                <div className="h-4 w-20 bg-yellow-400/20 rounded"></div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferSkeleton;