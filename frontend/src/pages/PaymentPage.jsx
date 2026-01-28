import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../lib/axios.js";
import toast from "react-hot-toast";
import { bookingStore } from "../store/useBookingStore.js";

const PaymentPage = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const { fetchBooking, booking } = bookingStore();

  //  Fetch booking summary
  useEffect(() => {
    fetchBooking(bookingId);
  }, [fetchBooking, bookingId]);

  //  Handle Payment
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
          color: "#0f172a",
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

  if (!booking) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg p-8 space-y-6">
        {/* Header */}
        <div className="border-b pb-4">
          <h1 className="text-2xl font-semibold text-slate-900">
            Complete Your Payment
          </h1>
          <p className="text-slate-500 text-sm">
            Review your booking and confirm payment
          </p>
        </div>

        {/* Booking Summary */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left: Details */}
          <div className="space-y-3">
            <h2 className="font-medium text-slate-800">Booking Details</h2>

            <div className="text-sm text-slate-600">
              <p>
                <strong>Hotel:</strong> {booking.hotel?.name}
              </p>
              <p>
                <strong>Room:</strong> {booking.room?.roomType}
              </p>
              <p>
                <strong>Guests:</strong> {booking.guests}
              </p>
              <p>
                <strong>Dates:</strong>{" "}
                {new Date(booking.checkInDate).toLocaleDateString()} →{" "}
                {new Date(booking.checkOutDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Nights:</strong> {booking.numberOfNights}
              </p>
            </div>
          </div>

          {/* Right: Price */}
          <div className="bg-slate-100 rounded-xl p-5 space-y-3">
            <h2 className="font-medium text-slate-800">Price Summary</h2>

            <div className="flex justify-between text-sm">
              <span>Room Price</span>
              <span>₹{booking.pricePerNight} / night</span>
            </div>

            <div className="flex justify-between text-sm">
              <span>Nights</span>
              <span>× {booking.numberOfNights}</span>
            </div>

            {booking.offer && (
              <div className="flex justify-between text-sm text-emerald-600">
                <span>Offer Applied</span>
                <span>- {booking.offer.priceOff}%</span>
              </div>
            )}

            <div className="border-t pt-3 flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>₹{booking.totalPrice}</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-slate-900 hover:bg-slate-800 transition text-white py-4 rounded-xl font-semibold text-lg"
        >
          {loading ? "Processing..." : "Pay Securely"}
        </button>

        {/* Trust text */}
        <p className="text-center text-xs text-slate-400">
          Payments are securely processed via Razorpay
        </p>
      </div>
    </div>
  );
};

export default PaymentPage;
