import Offer from "../../schema/offerSchema.js"

export const fetchAllOffers = async (req, res) => {
    try {
        const offers = await Offer.find().populate("hotel");
        if (!offers) {
            res.status(404).json({ message: "Offers not found" })
        }

        res.json(offers)
    } catch (error) {
        console.log("Error in fetchAllOffers controller", error)
        res.status(500).json({ message: "Failed to fetch AllOffers " })
    }
}