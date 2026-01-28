import toast from "react-hot-toast"
import api from "../lib/axios.js"
import { create } from "zustand"

export const offerStore = create((set, get) => ({
    offer: null,
    offers: [],
    isActive: false,
    loading: false,


    fetchOffer: async () => {
        set({ loading: true })
        try {
            const res = await api.get("/admin/getOffer", { withCredentials: true })
            set({ offer: res.data, loading: false })
        } catch (error) {
            set({ loading: false })
            console.log("Error in fetchOffer store", error)
        }
    },
    fetchAllOffers: async () => {
        set({ loading: true})
        try {
            const res = await api.get('/offers', {withCredentials: true})
            set({ offers: res.data, loading: false})
        } catch (error) {
             set({ loading: false })
            toast.error(error?.response?.data?.message)
        }
    },
    createOffer: async (offerData) => {
        set({ loading: true })
        try {
            const res = await api.post("/admin/createOffer", offerData, { withCredentials: true })
            set({ offer: res.data.offer, loading: false })
            toast.success("Offer saved successfully")
        } catch (error) {
            set({ loading: false })
            toast.error(error?.response?.data?.message)
        }
    },


}))