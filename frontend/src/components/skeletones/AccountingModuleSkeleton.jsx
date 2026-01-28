const AccountingModuleSkeleton = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-pulse">
      {/* Title Skeleton */}
      <div className="h-10 w-64 bg-white/10 rounded-lg mb-8"></div>

      {/* Summary Cards Skeleton */}
      <div className="grid sm:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-[#1a1d2e]/90 border border-white/5 rounded-2xl p-6 shadow-lg">
            <div className="h-3 w-24 bg-white/10 rounded mb-3"></div>
            <div className="h-8 w-32 bg-white/5 rounded"></div>
          </div>
        ))}
      </div>

      {/* Add Expense Form Skeleton */}
      <div className="bg-[#1a1d2e]/90 border border-white/5 rounded-2xl p-6 shadow-lg space-y-6">
        <div className="h-6 w-40 bg-white/10 rounded"></div>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="h-10 bg-[#0f1220] border border-white/10 rounded-lg"></div>
          <div className="h-10 bg-[#0f1220] border border-white/10 rounded-lg"></div>
          <div className="h-10 bg-[#0f1220] border border-white/10 rounded-lg"></div>
        </div>
        <div className="h-10 w-36 bg-cyan-500/20 rounded-full"></div>
      </div>

      {/* Table Skeleton */}
      <div className="bg-[#1a1d2e]/90 border border-white/5 rounded-2xl p-6 shadow-lg">
        <div className="h-6 w-36 bg-white/10 rounded mb-6"></div>
        <div className="space-y-4">
          {/* Table Header Placeholder */}
          <div className="flex justify-between border-b border-white/10 pb-2">
            <div className="h-4 w-1/5 bg-white/10 rounded"></div>
            <div className="h-4 w-1/5 bg-white/10 rounded"></div>
            <div className="h-4 w-1/5 bg-white/10 rounded"></div>
            <div className="h-4 w-1/5 bg-white/10 rounded"></div>
          </div>
          {/* Table Rows Placeholder */}
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex justify-between border-b border-white/5 py-3">
              <div className="h-4 w-1/5 bg-white/5 rounded"></div>
              <div className="h-4 w-1/5 bg-white/5 rounded"></div>
              <div className="h-4 w-1/5 bg-red-400/10 rounded"></div>
              <div className="h-4 w-1/5 bg-white/5 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountingModuleSkeleton;