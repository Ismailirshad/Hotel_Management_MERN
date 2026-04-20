import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  CreditCard,
  ShieldCheck,
  CalendarDays,
  Users,
  BedDouble,
  ArrowRight,
} from "lucide-react";
import toast from "react-hot-toast";
import api from "../lib/axios.js";
import { bookingStore } from "../store/useBookingStore.js";
import PaymentPageSkeleton from "../components/skeletones/PaymentPageSkeleton.jsx";

const PaymentPage = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const fetchBooking = bookingStore((state) => state.fetchBooking);
  const booking = bookingStore((state) => state.booking);

  useEffect(() => {
    if (bookingId) {
      fetchBooking(bookingId);
    }
  }, [bookingId, fetchBooking]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    try {
      setLoading(true);

      const res = await api.post(
        `/payment/create/${bookingId}`,
        {},
        { withCredentials: true },
      );

      const { order } = res.data;

      const razorpay = new window.Razorpay({
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        order_id: order.id,
        amount: order.amount,
        currency: order.currency,

        handler: async (response) => {
          await api.post(
            "/payment/verify-payment",
            {
              bookingId,
              ...response,
            },
            { withCredentials: true },
          );

          toast.success("Payment Successful!");
          navigate(`/booking-success/${bookingId}`);
        },

        prefill: {
          name: booking.user?.name,
          email: booking.user?.email,
        },

        theme: {
          color: "#06b6d4",
        },
      });

      razorpay.open();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Payment error:", error);
      toast.error("Payment failed. Please try again.");
      navigate(`/booking-failed/${bookingId}`);
    }
  };

  if (!booking) return <PaymentPageSkeleton />;

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0f172a] via-[#111827] to-[#020617] px-4 py-10 flex items-center justify-center">
      <div className="w-full max-w-5xl bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 md:px-10 py-6 border-b border-white/10">
          <div className="flex flex-col md:flex-row md:items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-cyan-500/15 flex items-center justify-center border border-cyan-400/20">
              <CreditCard size={38} className="text-cyan-300" />
            </div>

            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Complete Your Payment
              </h1>
              <p className="text-slate-300 mt-1 text-sm md:text-base">
                Review your booking details and proceed with secure checkout.
              </p>
            </div>

            <div className="px-4 py-2 rounded-xl bg-emerald-500/15 text-emerald-300 text-sm font-medium border border-emerald-400/20 flex items-center gap-2">
              <ShieldCheck size={16} />
              Secure Payment
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-6 p-6 md:p-10">
          {/* Left */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-5">
              Booking Details
            </h2>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-slate-300">Hotel</span>
                <span className="text-white font-medium">
                  {booking.hotel?.name}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-300 flex items-center gap-2">
                  <BedDouble size={15} />
                  Room
                </span>
                <span className="text-white font-medium">
                  {booking.room?.roomType}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-300 flex items-center gap-2">
                  <Users size={15} />
                  Guests
                </span>
                <span className="text-white font-medium">{booking.guests}</span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-300 flex items-center gap-2">
                  <CalendarDays size={15} />
                  Check In
                </span>
                <span className="text-white font-medium">
                  {new Date(booking.checkInDate).toLocaleDateString()}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-300">Check Out</span>
                <span className="text-white font-medium">
                  {new Date(booking.checkOutDate).toLocaleDateString()}
                </span>
              </div>

              <div className="flex justify-between gap-4 border-t border-white/10 pt-4">
                <span className="text-slate-300">Nights</span>
                <span className="text-white font-semibold">
                  {booking.numberOfNights}
                </span>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-5">
              Payment Summary
            </h2>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-300">Price / Night</span>
                <span className="text-white">₹{booking.pricePerNight}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-300">Nights</span>
                <span className="text-white">× {booking.numberOfNights}</span>
              </div>

              {booking.offer && (
                <div className="flex justify-between text-emerald-300">
                  <span>Offer Applied</span>
                  <span>-{booking.offer.priceOff}%</span>
                </div>
              )}

              <div className="border-t border-white/10 pt-4 flex justify-between text-lg font-semibold">
                <span className="text-white">Total Amount</span>
                <span className="text-cyan-300">₹{booking.totalPrice}</span>
              </div>

              <p className="text-xs text-slate-400 pt-2">
                Powered by Razorpay • Fast & Secure Checkout
              </p>
            </div>
          </div>
        </div>

        {/* Footer Button */}
        <div className="px-6 md:px-10 pb-8">
          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-70 text-slate-900 font-semibold py-4 rounded-xl transition flex items-center justify-center gap-2"
          >
            {loading ? "Processing..." : "Pay Securely"}
            {!loading && <ArrowRight size={18} />}
          </button>

          <p className="text-center text-xs text-slate-500 mt-4">
            Your payment details are encrypted and protected.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
