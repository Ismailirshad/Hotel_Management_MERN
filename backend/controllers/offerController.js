import Offer from "../schema/offerSchema"

export const createOffers = async (req, res) => {
    try {
        const offers = await Offer.create(req.body)
        res.status(201).json(offers);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getAllOffers = async (req, res) => {
    try {
        const offers = await Offer.find().populate("hotel")
        res.status(200).json(offers)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}