const ExclusiveOfferSkeleton = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-[#0b1120] via-[#0f172a] to-black">
      <div className="max-w-7xl mx-auto px-6 pt-40 pb-20 animate-pulse">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-14">
          <div className="space-y-4 max-w-xl">
            <div className="h-4 w-40 bg-slate-600 rounded" />
            <div className="h-10 w-72 bg-slate-500 rounded" />
            <div className="h-4 w-full bg-slate-600 rounded" />
          </div>
          <div className="h-12 w-48 bg-slate-500 rounded-full" />
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden bg-white/5 border border-white/10"
            >
              <div className="h-64 bg-slate-700" />
              <div className="p-6 space-y-3">
                <div className="h-5 w-2/3 bg-slate-500 rounded" />
                <div className="h-4 w-full bg-slate-600 rounded" />
                <div className="flex justify-between pt-2">
                  <div className="h-4 w-20 bg-slate-500 rounded" />
                  <div className="h-4 w-24 bg-slate-600 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ExclusiveOfferSkeleton;
