import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String, required: true, unique: true,
    },
    address: { type: String, required: true },
    city: { type: String, required: true },
    contact: { type: Number, required: true },
    description: { type: String , required: true},
    image: { type: String, required: true },
    rating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 }
}, { timestamps: true })

const Hotel = mongoose.model("Hotel", hotelSchema)

export default Hotel;

