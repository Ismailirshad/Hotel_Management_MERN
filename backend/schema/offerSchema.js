import mongoose from 'mongoose'

const offerSchema = new mongoose.Schema({
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel",
        required: true,
        unique: true
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    priceOff: { type: Number, required: true },
    expiryDate: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
    // image: { type: String, required: true }
}, { timestamps: true })
const Offer = mongoose.model("Offer", offerSchema)
export default Offer;

