import User from "../../schema/userSchema.js";
import Hotel from "../../schema/hotelSchema.js";
import Room from "../../schema/roomSchema.js";
import cloudinary from "../../config/cloudinary.js";
import Offer from "../../schema/offerSchema.js";
import Booking from "../../schema/bookingSchema.js";
import Expense from "../../schema/expenseSchema.js";

export const dashBoard = async (req, res) => {
  const ownerId = req.user._id;

  try {
    const hotel = await Hotel.findOne({ owner: ownerId });
    if (!hotel) {
      return res.status(200).json({
        totalBookings: 0,
        totalRevenue: 0,
        checkInGuests: 0,
        reservedGuests: 0,
        availableRooms: 0,
        recentBookings: [],
      });
    }

    const hotelId = hotel._id;
    const now = new Date();

    const totals = await Booking.aggregate([
      { $match: { hotel: hotelId, paymentStatus: "paid" } },
      {
        $group: {
          _id: null,
          totalBookings: { $sum: 1 },
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
    ]);

    const checkInGuests = await Booking.countDocuments({
      hotel: hotelId,
      checkInDate: { $lte: now },
      checkOutDate: { $gt: now },
      status: "booked",
    });

    const reservedGuests = await Booking.countDocuments({
      hotel: hotelId,
      checkInDate: { $lte: now },
      checkOutDate: { $gt: now },
      status: "reserved",
    });

    const totalRooms = await Room.countDocuments({ hotel: hotelId });

    const currentlyOccupiedRooms = await Booking.distinct("room", {
      hotel: hotelId,
      checkInDate: { $lte: now },
      checkOutDate: { $gt: now },
      status: { $in: ["booked", "reserved"] },
    });

    const availableRooms = totalRooms - currentlyOccupiedRooms.length;

    res.status(200).json({
      totalBookings: totals[0]?.totalBookings || 0,
      totalRevenue: totals[0]?.totalRevenue || 0,
      checkInGuests,
      reservedGuests,
      availableRooms: availableRooms || 0,
    });
  } catch (error) {
    console.log("Error in dashboard controller", error);
    res.status(500).json({ message: error.message });
  }
};

export const createRoom = async (req, res) => {
  const ownerId = req.user._id;
  try {
    const {
      roomType,
      roomNumber,
      pricePerNight,
      description,
      amenities,
      images,
    } = req.body;

    const hotel = await Hotel.findOne({ owner: ownerId });
    if (!hotel) {
      return res
        .status(404)
        .json({ message: "Hotel not found. Please register your hotel" });
    }
    const uploadPromise = images.map((base64String) => {
      return cloudinary.uploader.upload(base64String, {
        folder: "HotelManagement",
      });
    });
    const uploadResults = await Promise.all(uploadPromise);

    const imageUrls = uploadResults.map((result) => result.secure_url);

    const room = await Room.create({
      hotel: hotel._id,
      roomType,
      roomNumber,
      pricePerNight: Number(pricePerNight),
      amenities: amenities,
      description,
      images: imageUrls,
    });
    res.status(201).json({ message: "Room created successfully", room });
  } catch (error) {
    console.log("Error in createRoom controller", error);
    res.status(500).json({ message: error.message });
  }
};

export const allRooms = async (req, res) => {
  const ownerId = req.user._id;

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  try {
    const hotel = await Hotel.findOne({ owner: ownerId });
    if (!hotel) {
      return res
        .status(404)
        .json({ message: "Hotel registration required to view rooms " });
    }
    const rooms = await Room.find({ hotel: hotel._id }).skip(skip).limit(limit);
    if (rooms.length === 0) {
      return res
        .status(404)
        .json({ message: "No rooms have been added to your hotel" });
    }

    const now = new Date();

    const bookings = await Booking.find({
      hotel: hotel._id,
      checkInDate: { $lt: now },
      checkOutDate: { $gt: now },
      status: { $in: ["booked", "reserved"] },
    })

    // const busyRoomIds
    const occupiedRoomsIds = bookings.map((booking) => booking.room.toString());
    const availableRooms = rooms.map((room) => ({
      ...room.toObject(),
      isOccupied: occupiedRoomsIds.includes(room._id.toString()),
    }));

    const totalRooms = await Room.countDocuments({ hotel: hotel._id });

    res.json({
      availableRooms,
      totalRooms,
      page,
      totalPages: Math.ceil(totalRooms / limit),
    });
  } catch (error) {
    console.log("Error in fetching all rooms controller", error);
    res.status(500).json({ message: error.message });
  }
};

export const toggleRoom = async (req, res) => {
  const ownerId = req.user._id;
  const { roomId } = req.params;
  try {
    const hotel = await Hotel.findOne({ owner: ownerId });
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found." });
    }
    const room = await Room.findOne({ _id: roomId, hotel: hotel._id });
    if (!room) {
      return res.status(404).json({ message: "Room not found." });
    }
    room.isAvailable = !room.isAvailable;
    await room.save();
    res.status(200).json({ message: "Room availability updated.", room });
  } catch (error) {
    console.log("Error in toggleRoom controller", error);
    res.status(500).json({ message: error.message });
  }
};

export const registerHotel = async (req, res) => {
  const ownerId = req.user._id;
  try {
    const { name, address, city, contact, image, description } = req.body;
    const existingHotel = await Hotel.findOne({ owner: ownerId });
    if (existingHotel) {
      return res.status(403).json({
        message:
          "You have already registered a hotel. Cannot register another one.",
      });
    }

    const existContact = await Hotel.findOne({ contact });
    if (existContact) {
      return res
        .status(401)
        .json({ message: "This contact number is used by Some other hotel" });
    }

    const existingName = await Hotel.findOne({ name });
    if (existingName) {
      return res.status(400).json({
        message: "A hotel with this name is already registered.",
      });
    }
    let cloudinaryResponse = null;
    if (image) {
      cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: "",
      });
    }

    const hotel = await Hotel.create({
      name,
      address,
      city,
      contact,
      owner: ownerId,
      description,
      image: cloudinaryResponse?.secure_url
        ? cloudinaryResponse.secure_url
        : "",
    });
    res.status(201).json({ message: "Hotel Registered successfully", hotel });
  } catch (error) {
    console.log("Error in regsiter Hotel controller", error);
    res.status(500).json({ message: error.message });
  }
};

export const getMyHotel = async (req, res) => {
  const ownerId = req.user._id;

  const hotel = await Hotel.findOne({ owner: ownerId });
  if (!hotel) {
    return res.status(400).json({ message: "No hotel found for this owner" });
  }
  res.status(200).json(hotel);
};

// { Note: upsert: true  which updates if offer exist. if not it creates  offer}
export const createOffer = async (req, res) => {
  const ownerId = req.user._id;
  try {
    const { title, description, priceOff, expiryDate, isActive } = req.body;

    const hotel = await Hotel.findOne({ owner: ownerId });
    if (!hotel) {
      return res
        .status(404)
        .json({ message: "Hotel not found. Please register your hotel" });
    }
    if (new Date(expiryDate) <= new Date()) {
      return res.status(400).json({ message: "Expiry date must be future" });
    }

    const offer = await Offer.findOneAndUpdate(
      {
        hotel: hotel._id,
      },
      {
        hotel: hotel._id,
        title,
        description,
        priceOff,
        expiryDate,
        isActive,
      },
      {
        new: true,
        upsert: true,
      },
    );

    res.status(201).json({ message: "Offer Saved ", offer });
  } catch (error) {
    console.log("Error in offer creating controller", error);
    res.status(500).json({ message: error.message });
  }
};

export const fetchOffer = async (req, res) => {
  const ownerId = req.user._id;

  try {
    const hotel = await Hotel.findOne({ owner: ownerId });
    if (!hotel) {
      res
        .status(404)
        .json({ message: "Hotel not found. Please register your hotel" });
    }
    const offer = await Offer.findOne({ hotel });
    if (!offer) {
      res.status(404).json({ message: "Offer not found" });
    }
    const isExpired = new Date(offer.expiryDate) < new Date();
    if (isExpired && offer.isActive) {
      offer.isActive = false;
      await offer.save();
    }
    res.status(200).json(offer);
  } catch (error) {
    console.log("Error in fetching offer  controller", error);
    res.status(500).json({ message: error.message });
  }
};

export const getHotelBookings = async (req, res) => {
  const ownerId = req.user._id;

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  try {
    const hotel = await Hotel.findOne({ owner: ownerId });
    if (!hotel) {
      return res
        .status(404)
        .json({ message: "Hotel not found. Please register your hotel" });
    }
    const bookings = await Booking.find({ hotel: hotel._id })
      .populate("user", "name email")
      .populate("room", "roomType roomNumber")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalBookings = await Booking.countDocuments({ hotel: hotel._id });

    res.status(200).json({
      bookings,
      totalBookings,
      page,
      totalPages: Math.ceil(totalBookings / limit),
    });
  } catch (error) {
    console.log("Error in getBookings controller", error);
    res.status(500).json({ message: error.message });
  }
};

export const AccountingSummary = async (req, res) => {
  const ownerId = req.user._id;
  try {
    const hotel = await Hotel.findOne({ owner: ownerId });
    if (!hotel) {
      return res
        .status(404)
        .json({ message: "Hotel not found. Please register your hotel" });
    }

    const paidBookings = await Booking.find({
      hotel: hotel._id,
      paymentStatus: "paid",
    });

    let totalRevenue = paidBookings.reduce(
      (sum, booking) => sum + booking.totalPrice,
      0,
    );

    const expenses = await Expense.find({
      expenseFor: "HOTEL",
      hotel: hotel._id,
    });
    let totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

    let totalProfit = totalRevenue - totalExpenses;

    totalRevenue = totalRevenue;
    totalExpenses = totalExpenses;
    totalProfit = totalProfit;

    res.json({
      totalRevenue,
      totalExpenses,
      totalProfit,
      totalBookings: paidBookings.length,
    });
  } catch (error) {
    console.log("Error in AccountingSummary controller", error);
    res.status(500).json({ message: error.message });
  }
};

export const AccountingExpense = async (req, res) => {
  const ownerId = req.user._id;
  try {
    const hotel = await Hotel.findOne({ owner: ownerId });
    if (!hotel) {
      return res
        .status(404)
        .json({ message: "Hotel not found. Please register your hotel" });
    }
    const expenses = await Expense.find({
      expenseFor: "HOTEL",
      hotel: hotel._id,
    }).sort({
      createdAt: -1,
    });
    res.status(200).json(expenses);
  } catch (error) {
    console.log("Error in AccountingExpense controller", error);
    res.status(500).json({ message: error.message });
  }
};

export const addExpense = async (req, res) => {
  const ownerId = req.user._id;
  const { category, amount, note } = req.body;

  try {
    const hotel = await Hotel.findOne({ owner: ownerId });
    if (!hotel) {
      return res
        .status(404)
        .json({ message: "Hotel not found. Please register your hotel" });
    }
    const expense = await Expense.create({
      expenseFor: "HOTEL",
      hotel: hotel._id,
      category,
      amount: Number(amount),
      note,
      createdBy: ownerId,
    });
    res.status(201).json({ message: "Expense added successfully", expense });
  } catch (error) {
    console.log("Error in addExpense controller", error);
    res.status(500).json({ message: error.message });
  }
};
