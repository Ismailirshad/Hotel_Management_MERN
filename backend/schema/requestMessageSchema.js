import mongoose from "mongoose";

const requestMessageSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    status:{
      type: String,
      enum: ["open", "resolved"],
      default: "open"
    }
  },
  { timestamps: true }
);

const RequestMessage = mongoose.model("RequestMessage", requestMessageSchema);

export default RequestMessage;