import razorpayInstance from "../../config/razorpay.js";
import Booking from "../../schema/bookingSchema.js";
import crypto from 'crypto'

export const createPayment = async (req, res) => {
  const { bookingId } = req.params;
  const user = req.user;

  try {
    const booking = await Booking.findOne({
      _id: bookingId,
      user: user._id,
    });
    if (!booking) {
      return res.status(404).json({ messgae: "Booking not found" });
    }

    if (booking.user.toString() !== user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized payment attempt" });
    }
    if (booking.status !== "reserved") {
      return res
        .status(400)
        .json({ message: "Booking is not eligible for payment" });
    }

    const options = {
      amount: Math.round(Number(booking.totalPrice) * 100),
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };
    const order = await razorpayInstance.orders.create(options);
    res.json({ success: true, order });
  } catch (error) {
    console.log("Error in createPayment controller", error);
    res.status(500).json({ message: "Server error " });
  }
};

export const verifyPayment = async (req, res) => {
  const {bookingId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  try {
    const generateSignature = crypto
    .createHmac("sha256",process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

    if (generateSignature !== razorpay_signature) {
       await Booking.findByIdAndUpdate(bookingId,{
        paymentStatus: "failed",
        status: "cancelled",
      });
      return res.status(400).json({ message: "Invalid payment signature" });
    } 
    await Booking.findByIdAndUpdate(bookingId, {
        paymentStatus: "paid",
        transactionId: razorpay_payment_id,
        status: "booked",
      });
   res.json({ success: true, message: "Payment verified successfully" });    
  } catch (error) {
    console.log("Error in verifyPayment controller", error);
    res.status(500).json({ message: "Server error " });
  }
};
