import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
    roomType: {
      type: String,
      enum: ["Single Bed", "Double Bed", "Deluxe", "Suite"],
      required: true,
    },
    pricePerNight: { type: Number, required: true },
    isAvailable: { type: Boolean, default: true },
    amenities: { type: [String], default: [] },
    images: { type: [String], default: [] },
    description: { type: String, required: true, trim: true },
    roomNumber: {
      type: String,
      required: true,
      maxlength: 3,
      trim: true,
    },
  },
  { timestamps: true },
);

roomSchema.index({ hotel: 1, roomNumber: 1 }, { unique: true })

const Room = mongoose.model("Room", roomSchema);

export default Room;
