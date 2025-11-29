import mongoose from 'mongoose'

const roomSchema = new mongoose.Schema({
    hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
    roomType: {
        type: String,
        enum: ["Single Bed", "Double Bed", " Deluxe", "Suite"],
        required: true
    },
    pricePerNight: { type: Number, require: true },
    amenities: { type: [String], default: [] },
    description: { type: String, required: true },
    images: { type: [String], default: [] },
    isAvailable: { type: Boolean, default: true }
}, { timestamps: true })

const Room = mongoose.model("Room", roomSchema);

export default Room;