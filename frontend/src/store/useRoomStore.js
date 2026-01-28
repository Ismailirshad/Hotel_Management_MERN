import { create } from 'zustand'
import api from '../lib/axios.js'
import toast from 'react-hot-toast'

export const roomStore = create((set, get) => ({
    loading: false,
    room: null,
    rooms: [],
    featuredRooms: [],
    // addingRoom: false,

    fetchAllRooms: async () => {
        set({ loading: true })
        try {
            const res = await api.get('/room/rooms', { withCredentials: true })
            set({ rooms: res.data, loading: false })
        } catch (error) {
            set({ loading: false })
            console.log("error in fetchAllRooms", error)
        }
    },

    fetchRoom: async (roomId) => {
        set({ loading: true })
        try {
            const res = await api.get(`/room/${roomId}`, { withCredentials: true })
            set({ room: res.data, loading: false })
        } catch (error) {
            set({ loading: false })
            console.log("Error in feching single room", error)
        }
    },

    createRoom: async (roomData) => {
        set({ loading: true, })
        try {
            const res = await api.post('/admin/createRoom', roomData, { withCredentials: true })
            set((state) => ({
                rooms: [...state.rooms, res.data.room]
            }))
            toast.success(res.data.message)
            // return res.data
        } catch (error) {
            set({ loading: false })
            console.log("error in creating room", error)
            toast.error(error.response?.data?.message)
        }
    },

    fetchFeaturedRooms: async (hotelId) => {
        set({ loading: true })
        try {
            const res = await api.get(`/room/featuredRooms/${hotelId}`, { withCredentials: true })
            set({ featuredRooms: res.data, loading: false })
        } catch (error) {
            set({ loading: false })
            console.log("Error in fetching featured rooms", error)
        }
    }


}))