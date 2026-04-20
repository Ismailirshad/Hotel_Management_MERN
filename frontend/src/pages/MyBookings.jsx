import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { CalendarDays, CreditCard, MapPin, Users, Star } from "lucide-react";
import api from "../lib/axios.js";
import { bookingStore } from "../store/useBookingStore.js";
import MyBookingsSkeleton from "../components/skeletones/MyBookingsSkeleton.jsx";

const MyBookings = () => {
  const myBookings = bookingStore((s) => s.myBookings);
  const bookings = bookingStore((s) => s.bookings);
  const loading = bookingStore((s) => s.loading);

  useEffect(() => {
    myBookings();
  }, [myBookings]);

  const handleRating = async (bookingId, star) => {
    try {
      const res = await api.patch(
        `/hotel/rating/${bookingId}`,
        { rating: star },
        { withCredentials: true },
      );
      console.log("Rating Response", res.data);
      toast.success("Rating submitted successfully");
      myBookings();
    } catch (error) {
      console.log("Error in submitting rating", error);
      toast.error(
        error.response?.data?.message || "Error in submitting rating",
      );
    }
  };

  const isEligibleForRating = (date) => {
    return new Date() > new Date(date);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.2em] text-amber-500 font-semibold mb-3">
            Reservation Overview
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            My Bookings
          </h1>
          <p className="text-slate-600 mt-3 max-w-2xl">
            View and manage your upcoming, current, and past hotel reservations
            all in one place.
          </p>
        </div>

        {/* Empty State */}
        {loading ? (
          <MyBookingsSkeleton />
        ) : bookings.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-10 md:p-16 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center">
                <CalendarDays className="w-10 h-10 text-amber-500" />
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              No bookings found
            </h2>

            <p className="text-slate-600 mt-4 max-w-xl mx-auto leading-relaxed">
              You haven’t made any reservations yet. Once you book a stay, your
              booking details will appear here for easy access and management.
            </p>

            <button className="mt-8 px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-medium transition">
              Explore Hotels
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => {
              const isAfterCheckout = isEligibleForRating(booking.checkOutDate);
              const alreadyRated = (booking.rating || 0) > 0;
              const allowRating = !alreadyRated && isAfterCheckout;

              return (
                <div
                  key={booking._id}
                  className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 md:p-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-[2fr_1fr_1fr] gap-6 items-start">
                    {/* Hotel Info */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:col-span-2 md:col-span-2 xl:col-span-1">
                      <img
                        src={booking.room.images[0]}
                        alt="roomImage"
                        loading="lazy"
                        className="w-full sm:w-44 h-52 sm:h-36 rounded-2xl object-cover shadow-sm"
                      />

                      <div className="flex flex-col gap-3 flex-1 min-w-0 ">
                        <div>
                          <h2 className="text-2xl font-semibold text-slate-900">
                            {booking.hotel.name}
                            <span className="ml-2 text-sm font-normal text-slate-500">
                              [{booking.room.roomType}]
                            </span>
                          </h2>
                        </div>

                        <div className="flex items-start gap-2 text-slate-600 ">
                          <MapPin className="w-4 h-4 mt-1 shrink-0 text-amber-500" />
                          <p className="text-sm leading-6 line-clamp-2">
                            {booking.hotel.address}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 text-slate-600">
                          <Users className="w-4 h-4 text-amber-500" />
                          <p className="text-sm">Guests: {booking.guests}</p>
                        </div>

                        <p className="text-lg font-semibold text-slate-900">
                          Total: ${booking.totalPrice}
                        </p>

                        {/* Rating */}
                        {isAfterCheckout && (
                          <div className="flex items-center gap-2 pt-1">
                            <span className="text-sm text-slate-600">
                              Your Rating:
                            </span>
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                title={
                                  allowRating
                                    ? "Rate this stay"
                                    : "Already rated"
                                }
                                onClick={() =>
                                  allowRating && handleRating(booking._id, star)
                                }
                                className={`text-2xl transition ${
                                  star <= (booking.rating || 0)
                                    ? "text-yellow-400"
                                    : "text-slate-300"
                                } ${allowRating ? "cursor-pointer hover:scale-110" : "cursor-default"}`}
                              >
                                ★
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="space-y-4 md:col-span-1">
                      <div className="flex items-start gap-3">
                        <CalendarDays className="w-5 h-5 text-amber-500 mt-1" />
                        <div>
                          <p className="text-sm font-medium text-slate-900">
                            Check-In
                          </p>
                          <p className="text-slate-600 text-sm">
                            {new Date(booking.checkInDate).toDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <CalendarDays className="w-5 h-5 text-amber-500 mt-1" />
                        <div>
                          <p className="text-sm font-medium text-slate-900">
                            Check-Out
                          </p>
                          <p className="text-slate-600 text-sm">
                            {new Date(booking.checkOutDate).toDateString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Payment */}
                    <div className="space-y-4 md:col-span-1">
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-5 h-5 text-amber-500" />
                        <div>
                          <p className="text-sm font-medium text-slate-900">
                            Payment Status
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <div
                              className={`h-2.5 w-2.5 rounded-full ${
                                booking.paymentStatus
                                  ? "bg-green-500"
                                  : "bg-red-500"
                              }`}
                            />
                            <p
                              className={`text-sm font-medium ${
                                booking.paymentStatus
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {booking.paymentStatus ? "Paid" : "Pending"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {!booking.paymentStatus && (
                        <button className="w-fit px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-medium transition">
                          Pay Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
