import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CheckCircle2, ReceiptText } from "lucide-react";
import api from "../lib/axios.js";
import toast from "react-hot-toast";
import { bookingStore } from "../store/useBookingStore.js";

const PaymentSuccessPage = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

//   const [loading, setLoading] = useState(true);
  const { fetchBooking, booking } = bookingStore()

  //  Fetch booking summary
  useEffect(() => {
    fetchBooking(bookingId);
  }, [fetchBooking, bookingId]);

//   if (loading) return null;
  if (!booking) return null;

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-slate-100 flex items-center justify-center px-4">
      <div className="max-w-3xl w-full bg-white rounded-3xl shadow-2xl p-10 space-y-8">

        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="bg-emerald-100 text-emerald-600 p-5 rounded-full">
              <CheckCircle2 size={64} strokeWidth={1.5} />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-slate-900">
            Booking Confirmed 🎉
          </h1>

          <p className="text-slate-600">
            Your payment was successful and your booking is now confirmed.
          </p>
        </div>

        {/* Booking Summary */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* Left */}
          <div className="space-y-4">
            <h2 className="font-semibold text-slate-800 text-lg">
              Booking Details
            </h2>

            <div className="text-sm text-slate-600 space-y-2">
              <p><strong>Hotel:</strong> {booking.hotel?.name}</p>
              <p><strong>Room:</strong> {booking.room?.roomType}</p>
              <p><strong>Guests:</strong> {booking.guests}</p>
              <p>
                <strong>Dates:</strong>{" "}
                {new Date(booking.checkInDate).toLocaleDateString()} →{" "}
                {new Date(booking.checkOutDate).toLocaleDateString()}
              </p>
              <p><strong>Nights:</strong> {booking.numberOfNights}</p>
            </div>
          </div>

          {/* Right */}
          <div className="bg-slate-50 rounded-2xl p-6 space-y-4">
            <h2 className="font-semibold text-slate-800 text-lg flex items-center gap-2">
              <ReceiptText size={18} />
              Payment Summary
            </h2>

            <div className="flex justify-between text-sm">
              <span>Price / Night</span>
              <span>₹{booking.pricePerNight}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span>Nights</span>
              <span>× {booking.numberOfNights}</span>
            </div>

            {booking.offer && (
              <div className="flex justify-between text-sm text-emerald-600">
                <span>Offer Applied</span>
                <span>-{booking.offer.priceOff}%</span>
              </div>
            )}

            <div className="border-t pt-3 flex justify-between font-semibold text-lg">
              <span>Total Paid</span>
              <span>₹{booking.totalPrice}</span>
            </div>

            <div className="text-xs text-slate-500 pt-2">
              Transaction ID:{" "}
              <span className="font-mono">{booking.transactionId}</span>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="flex justify-between text-sm text-slate-600 border-t pt-6">
          <span>Status</span>
          <span className="text-emerald-600 font-medium capitalize">
            {booking.status}
          </span>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <button
            onClick={() => navigate("/my-bookings")}
            className="flex-1 bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl font-semibold"
          >
            View My Bookings
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex-1 border border-slate-300 hover:border-slate-400 py-3 rounded-xl font-semibold text-slate-700"
          >
            Go to Home
          </button>
        </div>

        <p className="text-xs text-slate-400 text-center">
          A confirmation email has been sent with your booking details.
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
