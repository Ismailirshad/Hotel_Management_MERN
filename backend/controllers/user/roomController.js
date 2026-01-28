import mongoose from "mongoose";
import Room from "../../schema/roomSchema.js";

export const fetchAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find().populate("hotel");
    res.status(200).json(rooms);
  } catch (error) {
    console.log("Error in fetchAllRooms controller", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const fetchRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const rooms = await Room.findById(id).populate("hotel");

    if (!rooms) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.status(200).json(rooms);
  } catch (error) {
    console.log("Error in fetchRoom contorller", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const fetchFeaturedRooms = async (req, res) => {
  const { id } = req.params;
  try {
    const rooms = await Room.aggregate([
      {
        $match: { hotel: new mongoose.Types.ObjectId(id) },
      },
      {
        $sample: { size: 2 },
      },
      {
        $project: {
          _id: 1,
          roomType: 1,
          pricePerNight: 1,
          amenities: 1,
          images: 1,
        },
      },
    ]);
    res.status(200).json(rooms);
  } catch (error) {
    console.log("Error in fetchFeaturedRooms controller", error);
    res.status(500).json({ message: "Failed to fetch featured rooms" });
  }
};
