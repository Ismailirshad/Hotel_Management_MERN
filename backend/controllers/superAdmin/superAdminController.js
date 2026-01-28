import Booking from "../../schema/bookingSchema.js";
import Expense from "../../schema/expenseSchema.js";
import Hotel from "../../schema/hotelSchema.js";
import Room from "../../schema/roomSchema.js";

export const superAdminDashBoard = async (req, res) => {
  try {
    const hotels = await Hotel.find({});
    if (hotels.length === 0) {
      return res.status(200).json({
        totalBookings: 0,
        totalRevenue: 0,
        checkInGuests: 0,
        reservedGuests: 0,
        availableRooms: 0,
        recentBookings: [],
      });
    }

    const now = new Date();

    const totals = await Booking.aggregate([
      { $match: { paymentStatus: "paid" } },
      {
        $group: {
          _id: null,
          totalBookings: { $sum: 1 },
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
    ]);

    const checkInGuests = await Booking.countDocuments({
      checkInDate: { $lte: now },
      checkOutDate: { $gt: now },
      status: "booked",
    });

    const reservedGuests = await Booking.countDocuments({
      checkInDate: { $lte: now },
      checkOutDate: { $gt: now },
      status: "reserved",
    });

    const totalRooms = await Room.countDocuments({});

    const currentlyOccupiedRooms = await Booking.distinct("room", {
      checkInDate: { $lte: now },
      checkOutDate: { $gt: now },
      status: { $in: ["booked", "reserved"] },
    });

    const availableRooms = totalRooms - currentlyOccupiedRooms.length;

    const totalHotels = await Hotel.countDocuments({});

    res.status(200).json({
      totalBookings: totals[0]?.totalBookings || 0,
      totalRevenue: totals[0]?.totalRevenue || 0,
      checkInGuests,
      reservedGuests,
      availableRooms: availableRooms || 0,
      totalHotels,
    });
  } catch (error) {
    console.log("Error in superAdminDashBoard controller", error);
    res.status(500).json({ message: error.message });
  }
};

export const superAdminAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find({});
    if (rooms.length === 0) {
      return res.status(200).json([]);
    }

    const now = new Date();

    const bookings = await Booking.find({
      checkInDate: { $lt: now },
      checkOutDate: { $gt: now },
      status: { $in: ["booked", "reserved"] },
    });

    // const busyRoomIds
    const occupiedRoomsIds = bookings.map((booking) => booking.room.toString());
    const availableRooms = rooms.map((room) => ({
      ...room.toObject(),
      isOccupied: occupiedRoomsIds.includes(room._id.toString()),
    }));

    res.json(availableRooms);
  } catch (error) {
    console.log("Error in fetching superAdminAllRooms controller", error);
    res.status(500).json({ message: error.message });
  }
};

export const superAdminAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate("user", "name email")
      .populate("room", "roomType roomNumber")
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    console.log("Error in superAdminAllBookings controller", error);
    res.status(500).json({ message: error.message });
  }
};

export const superAdminAccountingSummary = async (req, res) => {
  try {
    const paidBookings = await Booking.find({
      paymentStatus: "paid",
    });

    let totalRevenue = paidBookings.reduce(
      (sum, booking) => sum + booking.totalPrice,
      0,
    );

    const expenses = await Expense.find({
      expenseFor: "SUPER_ADMIN",
    });
    let totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

    let totalProfit = totalRevenue - totalExpenses;

    totalRevenue = Math.round(totalRevenue);
    totalExpenses = Math.round(totalExpenses);
    totalProfit = Math.round(totalProfit);

    res.json({
      totalRevenue,
      totalExpenses,
      totalProfit,
      totalBookings: paidBookings.length,
    });
  } catch (error) {
    console.log("Error in superAdminAccountingSummary controller", error);
    res.status(500).json({ message: error.message });
  }
};

export const superAdminAccountingExpense = async (req, res) => {
  try {
    const expenses = await Expense.find({
      expenseFor: "SUPER_ADMIN",
    }).sort({
      createdAt: -1,
    });
    res.status(200).json(expenses);
  } catch (error) {
    console.log("Error in superAdminAccountingExpense controller", error);
    res.status(500).json({ message: error.message });
  }
};

export const superAdminAddExpense = async (req, res) => {
  const { category, amount, note } = req.body;

  try {
    const expense = await Expense.create({
      expenseFor: "SUPER_ADMIN",
      category,
      amount: Number(amount),
      note,
    });
    res.status(201).json({ message: "Expense added successfully", expense });
  } catch (error) {
    console.log("Error in superAdminAddExpense controller", error);
    res.status(500).json({ message: error.message });
  }
};
