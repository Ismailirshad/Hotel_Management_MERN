import Booking from "../../schema/bookingSchema.js";
import Hotel from "../../schema/hotelSchema.js";
import Room from "../../schema/roomSchema.js";

export const fetchAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();

    res.status(200).json(hotels);
  } catch (error) {
    console.log("Error in fetchAllHotel controller", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
export const submitRating = async (req, res) => {
  const { bookingId } = req.params;
  const { rating } = req.body;
  const userId = req.user._id;

  try {
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Invalid rating value" });
    }

    const booking = await Booking.findOne({
      _id: bookingId,
      user: userId,
      status: "completed",
    });

    if (!booking) {
      return res.status(400).json({
        message: "You can only rate hotels you have completed bookings with.",
      });
    }

    if (booking.rating && booking.rating > 0)
      return res
        .status(400)
        .json({ message: "You have already rated this booking." });

    const hotel = await Hotel.findById(booking.hotel);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found." });
    }
    // { to save individual user ratings per booking }
    booking.rating = rating;
    await booking.save();

    // Recalculate average rating
    hotel.rating =
      (hotel.rating * hotel.ratingCount + rating) / (hotel.ratingCount + 1);

    hotel.ratingCount += 1;

    hotel.rating = Math.round(hotel.rating);

    await hotel.save();
    res.status(200).json({ message: "Rating submitted successfully." });
  } catch (error) {
    console.log("Error in submitRating controller", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const featuredHotels = async (req, res) => {
  try {
    const hotels = await Hotel.aggregate([
      {
        $lookup: {
          from: "rooms",
          localField: "_id",
          foreignField: "hotel",
          as: "rooms",
        },
      },
      {
        $addFields: {
          startingPrice: { $min: "$rooms.pricePerNight" },
        },
      },
      {
        $sample: { size: 4 },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          city: 1,
          contact: 1,
          rating: 1,
          image: 1,
          startingPrice: 1,
          ratingCount: 1,
        },
      },
    ]);

    res.json(hotels);
  } catch (error) {
    console.log("Error in featuredHotels", error);
    res.status(500).json({ message: "Failed to fetch featured Products" });
  }
};

export const getHotel = async (req, res) => {
  try {
    const { id } = req.params;

    const hotel = await Hotel.findById(id);

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.status(200).json(hotel);
  } catch (error) {
    console.log("Error in getHotel controller", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getHotelWithRooms = async (req, res) => {
  try {
    const { id } = req.params;

    const hotel = await Hotel.findById(id);

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    const rooms = await Room.find({ hotel: id });
    res.status(200).json({ hotel, rooms });
  } catch (error) {
    console.log("Error in getHotelWithRooms controller ", error);
    res.status(500).json({ message: error.message });
  }
};
