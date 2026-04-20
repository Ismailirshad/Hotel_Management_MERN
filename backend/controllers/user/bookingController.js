import Booking from "../../schema/bookingSchema.js";
import Hotel from "../../schema/hotelSchema.js";
import Offer from "../../schema/offerSchema.js";
import Room from "../../schema/roomSchema.js";
import User from "../../schema/userSchema.js";

export const isRoomAvailable = async (req, res) => {
  const { roomId } = req.params;
  const { checkIn, checkOut } = req.query;

  if (!checkIn || !checkOut) {
    return res
      .status(400)
      .json({ message: "checkIn and checkOut Date are required  " });
  }

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  // { This is used to correct the time to avoid today date selection error}
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  checkInDate.setHours(0, 0, 0, 0);
  checkOutDate.setHours(0, 0, 0, 0);

  if (checkOutDate <= checkInDate) {
    return res
      .status(400)
      .json({ message: "Check-out must be after check-in" });
  }

  if (checkInDate < today) {
    return res
      .status(400)
      .json({ message: "Check-in date cannot be in the past" });
  }

  try {
    const existBooking = await Booking.findOne({
      room: roomId,
      status: { $in: ["booked", "reserved"] },
      $or: [
        {
          checkInDate: { $lt: checkInDate },
          checkOutDate: { $gt: checkOutDate },
        },
      ],
    });

    if (existBooking) {
      return res.status(400).json({
        available: false,
        message: "Room is not available for selected dates",
      });
    }

    return res.status(200).json({
      available: true,
      message: "Room is available for selected dates",
    });
  } catch (error) {
    console.log("Error in isRoomAvailable controller", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const checkout = async (req, res) => {
  const { roomId } = req.params;
  const { checkOut, checkIn, guests } = req.query;
  try {
    const user = req.user;
    const room = await Room.findById({ _id: roomId });
    if (!room) {
      return res.status(400).json({ message: "Room not found" });
    }
    const hotel = await Hotel.findOne({ _id: room.hotel });

    if (!hotel) {
      return res.status(400).json({ message: "Hotel not found" });
    }
    if (Number(guests) > 4) {
      return res.status(400).json({ message: "Maximum 4 guests are allowed" });
    }
    const offer = await Offer.findOne({
      hotel: hotel._id,
      isActive: true,
      expiryDate: { $gte: new Date() },
    });

    if (!checkIn || !checkOut) {
      return res
        .status(400)
        .json({ message: "checkIn and checkOut Date are required  " });
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    // { This is used to correct the time to avoid today date selection error}
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    checkInDate.setHours(0, 0, 0, 0);
    checkOutDate.setHours(0, 0, 0, 0);

    if (checkOutDate <= checkInDate) {
      return res
        .status(400)
        .json({ message: "Check-out must be after check-in" });
    }

    if (checkInDate < today) {
      return res
        .status(400)
        .json({ message: "Check-in date cannot be in the past" });
    }

    const existBooking = await Booking.findOne({
      room: roomId,
      status: { $in: ["booked", "reserved"] },
      $or: [
        {
          checkInDate: { $lt: checkOutDate },
          checkOutDate: { $gt: checkInDate },
        },
      ],
    });

    if (existBooking) {
      return res.status(400).json({ message: "Room is already booked  " });
    }
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const numberOfNights = (checkOutDate - checkInDate) / millisecondsPerDay;

    let totalPrice = numberOfNights * room.pricePerNight;

    if (offer?.isActive) {
      const discount = (totalPrice * offer.priceOff) / 100;
      totalPrice = totalPrice - discount;
    }

    const booking = await Booking.create({
      user: user._id,
      room: room._id,
      hotel: hotel._id,
      checkInDate,
      checkOutDate,
      pricePerNight: room.pricePerNight,
      numberOfNights,
      guests,
      totalPrice: totalPrice,
      offer: offer?._id || null,
      status: "reserved",
      paymentStatus: "pending",
    });

    res.status(201).json(booking);
  } catch (error) {
    console.log("Error in checkout controller", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getBookingById = async (req, res) => {
  const { bookingId } = req.params;
  const userId = req.user._id;
  try {
    const booking = await Booking.findOne({
      _id: bookingId,
      user: userId,
    })
      .populate("hotel")
      .populate("room")
      .populate("user")
      .populate("offer");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(booking);
  } catch (error) {
    console.log("Error in getBookingById controller", error);
    res.status(500).json({ message: "Server error" });
  }
};
export const getAllBookings = async (req, res) => {
  const userId = req.user._id;
  try {
    const bookings = await Booking.find({ user: userId, status: { $in : ["completed"]} })
      .populate("hotel")
      .populate("room")
      .sort({ createdAt: -1 });
    if (!bookings) {
      return res.status(404).json({ message: "No bookings found" });
    }
    //Updating booking status before fetching
    const now = new Date();
    for (let booking of bookings) {
      if (booking.checkOutDate < now && booking.status === "booked") {
        booking.status = "completed";
        await booking.save();
      }
    }

    res.json(bookings);
  } catch (error) {
    console.log("Error in getAllBookings controller", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getReviews = async (req, res) => {
  try {
    const reviews = await Booking.aggregate([
      {
        $match: {
          rating: { $gt: 0 },
        },
      },
      {
        $sample: { size: 3 },
      },
    ]);

    const populatedReviews = await Booking.populate(reviews,[
        {path: "user", select: "name"},
        {path: "hotel", select: "image name city"}
    ])
    res.json(populatedReviews);
  } catch (error) {
    console.log("Error in getReviews controller", error);
    res.status(500).json({ message: "Server error" });
  }
};
