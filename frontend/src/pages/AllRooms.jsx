import React, { useMemo } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { memo } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { roomStore } from "../store/useRoomStore.js";
import RoomCard from "../components/RoomCard.jsx";

const AllRooms = () => {
  const fetchAllRooms = roomStore((s) => s.fetchAllRooms);
  const rooms = roomStore((s) => s.rooms);

  const [openFilter, setOpenFilter] = useState(false);
  const [seletedeRoomTypes, setSelectedRoomTypes] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState("null");
  const [selectedSort, setSelectedSort] = useState("null");
  
  const { id } = useParams();
  
  const [queryCity] = useSearchParams();
  const city = queryCity.get("city") || "";
  const [selectedCity, setSelectedCity] = useState(city);


  const roomTypes = ["Single Bed", "Double Bed", "Suite", "Deluxe"];
  const priceRanges = ["$50 - $150", "$151 - $300", "$301 - $500", "$501+"];
  const sortOptions = [
    "Price: Low to High",
    "Price: High to Low",
    "Rating",
    "Popularity",
  ];

  useEffect(() => {
    window.scrollTo(0, 0);

    fetchAllRooms();
  }, [fetchAllRooms]);

  //   cities for filter dropdown
  const cities = useMemo(
    () => [...new Set(rooms.map((room) => room.hotel.city))],
    [rooms],
  );

  // Used useMemp to optimize the filtering and sorting of rooms. This way, the filteredRooms array is only recalculated when the dependencies change,
  // improving performance and preventing unnecessary computations on every render.
  const filteredRooms = useMemo(() => {
    let data = [...rooms];

    // finding rooms based on hotel id if id is present in url params
    if (id) {
      data = data.filter((room) => room.hotel._id === id);
    }

    // if filter applied for room types
    if (seletedeRoomTypes.length > 0) {
      data = data.filter((room) => seletedeRoomTypes.includes(room.roomType));
    }

    //   filtered rooms based on price range
    if (selectedPriceRange !== "null") {
      data = data.filter((room) => {
        const price = room.pricePerNight;

        if (selectedPriceRange === "$50 - $150") {
          return price >= 50 && price <= 150;
        }

        if (selectedPriceRange === "$151 - $300") {
          return price >= 151 && price <= 300;
        }

        if (selectedPriceRange === "$301 - $500") {
          return price >= 301 && price <= 500;
        }

        if (selectedPriceRange === "$501+") {
          return price >= 501;
        }

        return true;
      });
    }

    //   sorted rooms
    if (selectedSort === "Price: Low to High") {
      data.sort((a, b) => a.pricePerNight - b.pricePerNight);
    }
    if (selectedSort === "Price: High to Low") {
      data.sort((a, b) => b.pricePerNight - a.pricePerNight);
    }
    if (selectedSort === "Rating") {
      data.sort((a, b) => b.hotel.rating - a.hotel.rating);
    }

    //  filtered rooms based on city
    if (selectedCity) {
      data = data.filter((room) => room.hotel.city === selectedCity);
    }

    // filtered data returned based on all the applied filters and sorting
    return data;
  }, [
    rooms,
    id,
    seletedeRoomTypes,
    selectedCity,
    selectedPriceRange,
    selectedSort,
  ]);

  // {{---------Without useMemo---------}}
  // let filteredRooms = [...rooms];
  // finding rooms based on hotel id if id is present in url params
  // if (id) {
  //   filteredRooms = filteredRooms.filter((room) => room.hotel._id === id);
  // }

  // if (seletedeRoomTypes.length > 0) {
  //   filteredRooms = filteredRooms.filter((room) =>
  //     seletedeRoomTypes.includes(room.roomType),
  //   );
  // }

  //   filtered rooms based on price range
  // if (selectedPriceRange !== "null") {
  //   filteredRooms = filteredRooms.filter((room) => {
  //     const price = room.pricePerNight;

  //     if (selectedPriceRange === "$50 - $150") {
  //       return price >= 50 && price <= 150;
  //     }

  //     if (selectedPriceRange === "$151 - $300") {
  //       return price >= 151 && price <= 300;
  //     }

  //     if (selectedPriceRange === "$301 - $500") {
  //       return price >= 301 && price <= 500;
  //     }

  //     if (selectedPriceRange === "$501+") {
  //       return price >= 501;
  //     }

  //     return true;
  //   });
  // }

  //   sorted rooms
  // if (selectedSort === "Price: Low to High") {
  //   filteredRooms.sort((a, b) => a.pricePerNight - b.pricePerNight);
  // }
  // if (selectedSort === "Price: High to Low") {
  //   filteredRooms.sort((a, b) => b.pricePerNight - a.pricePerNight);
  // }
  // if (selectedSort === "Rating") {
  //   filteredRooms.sort((a, b) => b.hotel.rating - a.hotel.rating);
  // }

  //  filtered rooms based on city
  // if (selectedCity) {
  //   filteredRooms = filteredRooms.filter(
  //     (room) => room.hotel.city === selectedCity,
  //   );
  // }

  // {{---------Without useMemo---------}}

  return (
    <section className="bg-slate-50 min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filter For Desktop  */}
        <aside className="hidden lg:block bg-white rounded-2xl shadow-sm p-6 h-fit sticky top-23">
          <h2 className="text-xl font-semibold text-slate-800 mb-6">Filters</h2>

          <button
            className="md:hidden px-4 py-10 absolute top-4 right-4 text-black rounded w-fit  "
            onClick={() => setOpenFilter(!openFilter)}
          >
            <img
              src={assets.listIcon}
              className={`p-2  ${openFilter ? "hidden" : "block"}`}
              alt="List Icon"
              loading="lazy"
            />
          </button>

          {/* Room Type */}
          <div className="space-y-3 mb-6">
            <p className="font-medium text-slate-700">Room Type</p>
            {roomTypes.map((type) => (
              <label
                key={type}
                className="flex items-center gap-2 text-sm text-slate-600"
              >
                <input
                  type="checkbox"
                  checked={seletedeRoomTypes.includes(type)}
                  onChange={() =>
                    setSelectedRoomTypes((prev) =>
                      prev.includes(type)
                        ? prev.filter((t) => t !== type)
                        : [...prev, type],
                    )
                  }
                />
                {type}
              </label>
            ))}
          </div>

          {/* Price */}
          <div className="space-y-3 mb-6">
            <p className="font-medium text-slate-700">Price Range</p>
            {priceRanges.map((range) => (
              <label
                key={range}
                className="flex items-center gap-2 text-sm text-slate-600"
              >
                <input
                  type="radio"
                  name="price"
                  checked={selectedPriceRange === range}
                  onChange={() => setSelectedPriceRange(range)}
                />
                {range}
              </label>
            ))}
          </div>

          {/* Sort */}
          <div className="space-y-3">
            <p className="font-medium text-slate-700">Sort By</p>
            {sortOptions.map((sort) => (
              <label
                key={sort}
                className="flex items-center gap-2 text-sm text-slate-600"
              >
                <input
                  type="radio"
                  name="sort"
                  checked={selectedSort === sort}
                  onChange={() => setSelectedSort(sort)}
                />
                {sort}
              </label>
            ))}
          </div>
        </aside>

     {/* Room Cards Section */}
        <main className="lg:col-span-3 space-y-6">
          {/* HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold text-slate-900">
                Available Rooms
              </h1>
              <p className="text-slate-600">
                Choose from the best rooms available for your stay
              </p>
            </div>

            <div className="lg:hidden mb-4">
              <button
                onClick={() => setOpenFilter(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white shadow rounded-xl border text-sm font-medium"
              >
                ☰ Filters
              </button>
            </div>

            {!id && (
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <p className="font-medium text-slate-700 pt-2">City</p>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="border rounded-lg px-3 py-2 text-sm w-full sm:w-44"
                >
                  <option value="">All Cities</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* MOBILE FILTER PANEL */}
          {openFilter && (
            <>
              {/* Overlay */}
              <div
                className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                onClick={() => setOpenFilter(false)}
              />

              {/* Drawer */}
              <div className="fixed top-0 left-0 h-full w-80 max-w-[85%] bg-white z-50 shadow-xl p-5 overflow-y-auto lg:hidden transition-all">
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <button
                    onClick={() => setOpenFilter(false)}
                    className="text-xl"
                  >
                    ✕
                  </button>
                </div>

                {/* Room Type */}
                <div className="space-y-3 mb-6">
                  <p className="font-medium text-slate-700">Room Type</p>

                  {roomTypes.map((type) => (
                    <label
                      key={type}
                      className="flex items-center gap-2 text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={seletedeRoomTypes.includes(type)}
                        onChange={() =>
                          setSelectedRoomTypes((prev) =>
                            prev.includes(type)
                              ? prev.filter((t) => t !== type)
                              : [...prev, type],
                          )
                        }
                      />
                      {type}
                    </label>
                  ))}
                </div>

                {/* Price */}
                <div className="space-y-3 mb-6">
                  <p className="font-medium text-slate-700">Price Range</p>

                  {priceRanges.map((range) => (
                    <label
                      key={range}
                      className="flex items-center gap-2 text-sm"
                    >
                      <input
                        type="radio"
                        name="priceMobile"
                        checked={selectedPriceRange === range}
                        onChange={() => setSelectedPriceRange(range)}
                      />
                      {range}
                    </label>
                  ))}
                </div>

                {/* Sort */}
                <div className="space-y-3 mb-6">
                  <p className="font-medium text-slate-700">Sort By</p>

                  {sortOptions.map((sort) => (
                    <label
                      key={sort}
                      className="flex items-center gap-2 text-sm"
                    >
                      <input
                        type="radio"
                        name="sortMobile"
                        checked={selectedSort === sort}
                        onChange={() => setSelectedSort(sort)}
                      />
                      {sort}
                    </label>
                  ))}
                </div>

                {/* Apply */}
                <button
                  onClick={() => setOpenFilter(false)}
                  className="w-full py-3 bg-emerald-500 text-white rounded-xl font-medium"
                >
                  Apply Filters
                </button>
              </div>
            </>
          )}

          {/* ROOMS */}
          <div className="space-y-5 items-center justify-center mx-auto">
            {filteredRooms.length === 0 ? (
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-12 items-center justify-center text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-amber-100 flex items-center justify-center mb-5">
                  <span className="text-4xl">🏨</span>
                </div>

                <h2 className="text-2xl font-bold text-slate-900">
                  No Rooms Found
                </h2>

                <p className="text-slate-500 mt-3 max-w-md mx-auto">
                  Sorry, there are no rooms available in{" "}
                  <span className="font-semibold text-slate-700">
                    {selectedCity || "this location"}
                  </span>
                  . Try another city or adjust your filters.
                </p>

                <button
                  onClick={() => {
                    setSelectedCity("");
                    setSelectedRoomTypes([]);
                    setSelectedPriceRange("null");
                    setSelectedSort("null");
                  }}
                  className="mt-6 px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-medium transition"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              filteredRooms.map((room) => (
                <RoomCard key={room._id} room={room} />
              ))
            )}
          </div>
        </main>
      </div>
    </section>
  );
};

export default memo(AllRooms);
