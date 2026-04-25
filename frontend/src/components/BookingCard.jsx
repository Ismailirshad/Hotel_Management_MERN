import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { bookingStore } from "../store/useBookingStore.js";

const BookingCard = ({ roomId }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [checked, setChecked] = useState(false);
  const { id } = useParams()

  const checkRoomAvailability = bookingStore((state) => state.checkRoomAvailability);
  const isRoomAvailable = bookingStore((state) => state.isRoomAvailable);
  const loading = bookingStore((state) => state.loading);
  const bookRoom = bookingStore((state) => state.bookRoom);

  const navigate = useNavigate();

  const handleCheckAvailability = async () => {
    if (!checkIn || !checkOut) return toast.error("Select dates");
    setChecked(true);
    await checkRoomAvailability(roomId, checkIn, checkOut);
  };

  const handleConfirmBooking = async () => {
    try {
      const booking = await bookRoom(id, checkIn, checkOut, guests)
      navigate(`/payment/${booking._id}`)

      console.log("Booking confirmed");
    } catch (error) {
      console.error("Error confirming booking:", error);
      toast.error(error?.response?.data?.message || "Failed to confirm booking");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 space-y-5">
      {/* Dates */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-slate-500">Check-in</label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => {
              setCheckIn(e.target.value);
              setChecked(false);
            }}
            className="w-full mt-1 border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="text-sm text-slate-500">Check-out</label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => {
              setCheckOut(e.target.value);
              setChecked(false);
            }}
            className="w-full mt-1 border rounded-lg px-3 py-2"
          />
        </div>
      </div>

      {/* Guests */}
      <div>
        <label className="text-sm text-slate-500">Guests</label>
        <input
          type="number"
          min={1}
          max={4}
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="w-full mt-1 border rounded-lg px-3 py-2"
        />
      </div>

      {/* Availability button */}
      <button
        onClick={handleCheckAvailability}
        disabled={loading}
        className="w-full bg-emerald-600 hover:bg-emerald-700 transition text-white py-3 rounded-xl font-semibold"
      >
        {loading ? "Checking..." : "Check Availability"}
      </button>

      {/* Result */}
      {checked && isRoomAvailable === true && (
        <div className="bg-emerald-50 text-emerald-700 p-3 rounded-lg text-sm text-center">
          ✅ Room is available for selected dates
        </div>
      )}

      {checked && isRoomAvailable === false && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center">
          ❌ Room not available for selected dates
        </div>
      )}

      {/* Confirm booking */}
      {checked && isRoomAvailable === true && (
        <button
          onClick={handleConfirmBooking}
          className="w-full bg-slate-900 hover:bg-slate-800 transition text-white py-3 rounded-xl font-semibold"
        >
          Confirm Booking
        </button>
      )}
    </div>
  );
};

export default React.memo(BookingCard);
