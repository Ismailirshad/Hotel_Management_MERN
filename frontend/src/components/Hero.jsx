import { useEffect, useState, memo, useMemo } from "react";
import { assets } from "../assets/assets.js";
import { Link, useNavigate } from "react-router-dom";
import { roomStore } from "../store/useRoomStore.js";

const Hero = () => {
  const fetchAllRooms = roomStore((state) => state.fetchAllRooms);
  const rooms = roomStore((state) => state.rooms);

  const [destination, setDestination] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllRooms();
  }, [fetchAllRooms]);

  const cities = useMemo(() => [...new Set(rooms.map((room) => room.hotel.city))], [rooms]);

  const handleSearchCity = (e) => {
    e.preventDefault();

    if (destination) {
      navigate(`/rooms?city=${destination}`);
    }
  };

  return (
    <div
      id="home"
      className='w-full h-screen bg-[url("/hero-img.jpg")] bg-center px-2 sm:px-10 md:px-40 bg-cover relative'
    >
      <div className="flex items-center   w-full h-screen">
        <div className="flex flex-col items-start space-y-3 pt-30">
          <h1 className="text-slate-300 text-2xl">
            The Ultimate Hotel Experience
          </h1>
          <h1 className="text-5xl text-slate-300 font-extrabold">
            Sleep Like a Baby
          </h1>
          <p className="text-slate-100">
            Luxury and comfort await at the world's most <br />
            exclusive hotels and resorts. Start your booking today
          </p>
          <div className="flex flex-wrap items-center gap-3 mb-1">
            <Link
              to="/my-bookings"
              className="px-5 py-2.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white text-sm font-medium hover:bg-white/20 transition-all duration-300"
            >
              My Bookings
            </Link>

            <Link
              to="/rooms"
              className="px-5 py-2.5 rounded-full bg-white/5 border border-white/20 backdrop-blur-md text-white text-sm font-medium hover:bg-white/15 transition-all duration-300"
            >
              Explore Rooms
            </Link>
          </div>

          <div className="mt-0 flex justify-center">
            <form
              onSubmit={handleSearchCity}
              className="w-full max-w-xl bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-4"
            >
              {/* Heading */}
              <p className="text-lg font-semibold text-slate-800 mb-3">
                🔍 Check rooms for your destination
              </p>

              {/* Input Row */}
              <div className="flex items-center gap-3">
                {/* Destination */}
                <div className="flex items-center gap-2 flex-1 border border-slate-200 rounded-lg px-3 py-2 bg-slate-50 focus-within:ring-2 focus-within:ring-emerald-400">
                  <img
                    src={assets.locationIcon}
                    loading="lazy"
                    className="h-5 w-5 opacity-60"
                  />

                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full bg-transparent outline-none text-sm text-slate-700"
                  >
                    <option className="hidden sm:flex" value="">
                      {window.innerWidth < 400 ? "......" : "Where are you going?"}
                    </option>

                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Button */}
                <button
                  type="submit"
                  disabled={!destination}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2 rounded-lg text-sm font-medium transition disabled:opacity-50"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Hero);
