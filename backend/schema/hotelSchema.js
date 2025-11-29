import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
    name:{
        type: String, required: true
    },
    address: {type: String, required: true},
    city: {type: String, required: true},
    contact: {type: number, required: true},
    owner: {type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true
    }

}, {timestamps: true} )

const Hotel = mongoose.model("Hotel", hotelSchema)

export default Hotel;

