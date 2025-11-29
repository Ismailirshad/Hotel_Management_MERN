import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{ 
        type: String,
        required: [true,  "Name is required"],
    },
    email:{
        type: email,
        required: [true, "Email is required"],
        unique: true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        required: true,
        minlength:[6, "Password must be atleast 6 characters"],
        trim: true
    },
    avatar:{
        type: String,
        default:""
    },
    role:{
        type:String,
        enum:["user", "admin", "superAdmin"],
        default: "user"
    },
    bookings:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Booking"
    }
]

},{timestamps: true})
const User = mongoose.model("User");

 export default User;