import React, { useEffect, useState } from "react";
import api from "../lib/axios.js";
const NewsLetters = React.lazy(() => import("./NewsLetters.jsx"));

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await api.get("/booking/reviews");
        setReviews(res.data);
      } catch (error) {
        console.log("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <section
      id="offers"
      className="relative w-full overflow-hidden bg-linear-to-b from-slate-950 via-slate-900 to-slate-950"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-24 left-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute bottom-20 right-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-15 space-y-14">
        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-emerald-300 backdrop-blur-md">
            Guest Experiences
          </span>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Trusted by Travelers,
            <span className="block bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Loved for Every Stay
            </span>
          </h2>

          <p className="text-base md:text-lg text-slate-300 leading-relaxed">
            Real guests. Real stays. A quick look at the hotels our customers
            enjoyed the most.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {reviews?.map((item, index) => (
            <div
              key={item._id || index}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.25)] transition-all duration-500 hover:-translate-y-2 hover:border-emerald-400/30 hover:shadow-[0_25px_80px_rgba(16,185,129,0.15)]"
            >
              {/* soft glow */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-emerald-400/10 blur-3xl" />
              </div>

              {/* Top hotel row */}
              <div className="relative flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="relative shrink-0">
                    <img
                      src={item?.hotel?.image}
                      alt={item?.hotel?.name || "Hotel"}
                      loading="lazy"
                      className="h-16 w-16 rounded-2xl object-cover ring-2 ring-white/10 shadow-lg"
                    />
                    <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 ring-4 ring-slate-900 text-[10px] text-white">
                      ✓
                    </span>
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-lg font-semibold text-white">
                      {item?.hotel?.name}
                    </p>
                    <p className="text-sm text-slate-400">{item?.hotel?.city}</p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="my-2 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

              <div className="rounded-2xl border border-white/10 bg-slate-950/30   px-4 py-4">
                {/* Stars + date */}
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
                    {new Date(item.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>

                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`text-2xl drop-shadow-sm ${star <= item.rating
                          ? "text-yellow-400"
                          : "text-slate-600"
                          }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                {/* Guest */}
                <div className="mt-0 flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="">
                      <p className="h-12 w-12 pt-2 text-xl font-bold rounded-full object-cover ring-2 text-white text-center items-center justify-center ring-white/10">
                        {item?.user?.name?.charAt(0).toUpperCase()}
                      </p>
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-semibold text-white">
                        {item?.user?.name}
                      </p>
                      <p className="text-sm text-emerald-300">Verified Guest</p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-right">
                    <p className="text-xs uppercase tracking-[0.2em] text-green-400">
                      Rating
                    </p>
                    <p className="text-xl font-bold text-white">
                      {item?.rating}.0
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <NewsLetters />
      </div>
    </section>
  );
};

export default Testimonials;
