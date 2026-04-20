import Offer from "../../schema/offerSchema.js";

export const fetchAllOffers = async (req, res) => {
  try {
    const now = new Date();
    await Offer.updateMany(
      {
        expiryDate: { $lt: now },
        isActive: true,
      },
      {
        $set: { isActive: false },
      },
    );

    const offers = await Offer.find({
      isActive: true,
      expiryDate: { $gt: now },
    }).populate("hotel");

    return res.status(200).json(offers);
  } catch (error) {
    console.log("Error in fetchAllOffers controller", error);
    res.status(500).json({ message: "Failed to fetch AllOffers " });
  }
};
