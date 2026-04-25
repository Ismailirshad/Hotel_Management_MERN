import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CheckCircle2, ReceiptText, ArrowRight, Home } from "lucide-react";
import { bookingStore } from "../store/useBookingStore.js";

const PaymentSuccessPage = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const fetchBooking = bookingStore((state) => state.fetchBooking);
  const booking = bookingStore((state) => state.booking);

  useEffect(() => {
    if(bookingId) fetchBooking(bookingId);
  }, [fetchBooking, bookingId]);

  if (!booking) return null;

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0f172a] via-[#111827] to-[#020617] px-4 py-8 flex items-center justify-center">
      <div className="w-full max-w-5xl bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">

        {/* Top Header */}
        <div className="px-6 md:px-10 py-8 border-b border-white/10">
          <div className="flex flex-col md:flex-row md:items-center gap-5">
            
            <div className="w-20 h-20 rounded-2xl bg-emerald-500/15 flex items-center justify-center border border-emerald-400/20">
              <CheckCircle2
                size={42}
                className="text-emerald-400"
                strokeWidth={1.8}
              />
            </div>

            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Booking Confirmed
              </h1>
              <p className="text-slate-300 mt-1 text-sm md:text-base">
                Your payment was successful and your reservation is confirmed.
              </p>
            </div>

            <div className="px-4 py-2 rounded-xl bg-emerald-500/15 text-emerald-300 text-sm font-medium border border-emerald-400/20">
              {booking?.status}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-6 p-6 md:p-10">

          {/* Left Section */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-5">
              Booking Details
            </h2>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-slate-300">Hotel</span>
                <span className="text-white font-medium">
                  {booking?.hotel?.name}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-300">Room</span>
                <span className="text-white font-medium">
                  {booking?.room?.roomType}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-300">Guests</span>
                <span className="text-white font-medium">
                  {booking?.guests}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-300">Check In</span>
                <span className="text-white font-medium">
                  {new Date(booking?.checkInDate).toLocaleDateString()}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-300">Check Out</span>
                <span className="text-white font-medium">
                  {new Date(booking?.checkOutDate).toLocaleDateString()}
                </span>
              </div>

              <div className="flex justify-between gap-4 border-t border-white/10 pt-4">
                <span className="text-slate-300">Nights</span>
                <span className="text-white font-semibold">
                  {booking?.numberOfNights}
                </span>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
              <ReceiptText size={18} className="text-cyan-400" />
              Payment Summary
            </h2>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-300">Price / Night</span>
                <span className="text-white">₹{booking?.pricePerNight}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-300">Nights</span>
                <span className="text-white">× {booking?.numberOfNights}</span>
              </div>

              {booking?.offer && (
                <div className="flex justify-between text-emerald-300">
                  <span>Offer Applied</span>
                  <span>-{booking?.offer.priceOff}%</span>
                </div>
              )}

              <div className="border-t border-white/10 pt-4 flex justify-between text-lg font-semibold">
                <span className="text-white">Total Paid</span>
                <span className="text-cyan-300">₹{booking?.totalPrice}</span>
              </div>

              <div className="pt-3 text-xs text-slate-300">
                Transaction ID
                <div className="mt-1 text-white font-mono break-all">
                  {booking?.transactionId}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="px-6 md:px-10 pb-8">
          <div className="grid sm:grid-cols-2 gap-4">
            <button
              onClick={() => navigate("/my-bookings")}
              className="flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold py-3 rounded-xl transition"
            >
              View My Bookings
              <ArrowRight size={18} />
            </button>

            <button
              onClick={() => navigate("/")}
              className="flex items-center justify-center gap-2 border border-white/15 hover:bg-white/5 text-white font-semibold py-3 rounded-xl transition"
            >
              <Home size={18} />
              Go to Home
            </button>
          </div>

          <p className="text-center text-xs text-slate-500 mt-5">
            A confirmation email has been sent with your booking details.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
