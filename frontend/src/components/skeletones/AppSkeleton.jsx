const AppSkeleton = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white animate-pulse">
      {/* Navbar Skeleton */}
      <div className="h-16 border-b border-white/10 px-6 flex items-center justify-between">
        <div className="h-8 w-32 rounded bg-white/10"></div>
        <div className="hidden md:flex gap-3">
          <div className="h-8 w-20 rounded-full bg-white/10"></div>
          <div className="h-8 w-20 rounded-full bg-white/10"></div>
          <div className="h-8 w-20 rounded-full bg-white/10"></div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="h-10 w-64 rounded bg-white/10 mb-4"></div>
        <div className="h-5 w-96 max-w-full rounded bg-white/10 mb-8"></div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <div className="h-44 rounded-xl bg-white/10 mb-4"></div>
              <div className="h-5 w-3/4 rounded bg-white/10 mb-2"></div>
              <div className="h-4 w-1/2 rounded bg-white/10 mb-4"></div>
              <div className="h-10 w-full rounded-xl bg-white/10"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppSkeleton;