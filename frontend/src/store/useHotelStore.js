import { create } from 'zustand'
import api from '../lib/axios.js'
import toast from 'react-hot-toast'

export const hotelStore = create((set, get) => ({
    hotel: null,
    hotels: [],
    loading: true,

    registerHotel: async (form) => {
        set({ loading: true })
        try {
            const res = await api.post('/admin', form, { withCredentials: true })
            set({ hotel: res.data, loading: false })
            toast.success(res.data.message)
            return true;
        } catch (error) {
            set({ loading: false })
            console.log("Error in register hotel", error)
            toast.error(error.response?.data?.message)
        }
    },

    getHotel: async () => {
        set({ loading: true })
        try {
            const res = await api.get('/admin/my-hotel', { withCredentials: true })
            set({ hotel: res.data, loading: false })
        } catch (error) {
            set({ loading: false })
            console.log("Error in fetching hotel", error)
        }
    },
    featuredHotels: async () => {
        set({ loading: true })
        try {
            const res = await api.get('/hotel/featuredHotels', { withCredentials: true})
            set({ hotels: res.data, loading: false })
            console.log(res.data,"featured hotels")
        } catch (error) {
            set({ loading: false })
            console.log("Error in fetching all hotels", error)
        }
    },
    hotelDetails: async (id) => {
        set({ loading: true })
        try { 
            const res = await api.get(`/hotel/${id}`, { withCredentials: true })
            set({ hotel: res.data, loading: false })
        } catch (error) {
            set({ loading: false })
            console.log("Error in fetching hotel details", error)
        }

    }



}))