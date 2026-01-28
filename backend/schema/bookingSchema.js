import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel",
        required: true
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        required: true,
    },
    offer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Offer",
        default: null,
    },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    pricePerNight: { type: Number, required: true },
    numberOfNights: {
        type: Number,
        required: true,
    },
    totalPrice: { type: Number, required: true },
    guests: { type: Number, required: true },
    status: {
        type: String,
        enum: ["reserved","booked", "cancelled", "completed"],
        default: "booked",
    },
    transactionId: { type: String, default: null},
    paymentStatus: {
        type: String,
        enum: ["pending", "paid", "failed", "refunded"],
        default: "pending",
    },
    rating: { type: Number, default: 0 },

}, { timestamps: true })

const Booking = mongoose.model("Booking", bookingSchema)
export default Booking;