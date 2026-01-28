const HotelCardsSkeleton = () => {
  return (
    <section className="relative py-28 bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-6 space-y-20 animate-pulse">

        {/* HEADER SKELETON */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="h-6 w-40 bg-slate-200 rounded-full mx-auto" />
          <div className="h-10 w-72 bg-slate-300 rounded mx-auto" />
          <div className="h-4 w-full max-w-xl bg-slate-200 rounded mx-auto" />
        </div>

        {/* GRID SKELETON */}
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm"
            >
              <div className="h-56 bg-slate-200" />
              <div className="p-6 space-y-4">
                <div className="h-5 w-3/4 bg-slate-300 rounded" />
                <div className="h-4 w-1/2 bg-slate-200 rounded" />
                <div className="h-4 w-1/3 bg-slate-200 rounded" />
                <div className="flex justify-between pt-4">
                  <div className="h-5 w-24 bg-slate-300 rounded" />
                  <div className="h-8 w-28 bg-slate-200 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HotelCardsSkeleton;
