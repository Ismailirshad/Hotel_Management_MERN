import { create } from "zustand";
import api from "../lib/axios.js";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

export const bookingStore = create((set, get) => ({
  isRoomAvailable: null,
  availableRooms: [],
  loading: false,
  bookedRooms: [],
  booking: null,
  bookings: [],
  allBookings: [],
  page: 1,
  totalPages: 1,
  totalBookings: 0,

  checkRoomAvailability: async (roomId, checkIn, checkOut) => {
    set({ isRoomAvailable: null, loading: true });
    try {
      const res = await api.get(`/booking/check/${roomId}`, {
        params: { checkIn, checkOut },
        withCredentials: true,
      });
      set({ isRoomAvailable: res.data.available, loading: false });
      if (res.data.available) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
      return res.data.available;
    } catch (error) {
      set({ isRoomAvailable: null, loading: false });
      console.log("Error in checkRoomAvailability store", error);
      toast.error(error?.response?.data?.message || "Please login first");
    }
  },
  bookRoom: async (roomId, checkIn, checkOut, guests) => {
    set({ loading: true });
    try {
      const res = await api.post(`/booking/checkout/${roomId}`, null, {
        params: { checkIn, checkOut, guests },
        withCredentials: true,
      });
      set({ bookedRooms: res.data, loading: false });
      return res.data;
    } catch (error) {
      set({ loading: false });
      console.log("Error in checkRoomAvailability store", error);
      toast.error(error.response?.data?.message);
    }
  },
  fetchBooking: async (bookingId) => {
    set({ booking: null, loading: true });
    try {
      const res = await api.get(`/booking/${bookingId}`, {
        withCredentials: true,
      });
      set({ booking: res.data, loading: false });
    } catch (error) {
      set({ booking: null, loading: false });
      console.log("Error in fetchBooking store", error);
      toast.error("Failed to load booking ");
    }
  },
  myBookings: async () => {
    set({ loading: true });
    try {
      const res = await api.get(`/booking/my-bookings`, {
        withCredentials: true,
      });
      set({ bookings: res.data, loading: false });
    } catch (error) {
      set({ loading: false });
      console.log("Error in myBookings store", error);
      toast.error("Failed to load myBookings");
    }
  },
  fetchAllBookings: async (newPage = 1) => {
    set({ loading: true });
    try {
      const res = await api.get(`/admin/all-bookings?page=${newPage}&limit=5`, {
        withCredentials: true,
      });
      set({
        allBookings: res.data.bookings,
        loading: false,
        page: res.data.page,
        totalPages: res.data.totalPages,
        totalBookings: res.data.totalBookings,
      });
    } catch (error) {
      set({ loading: false });
      console.log("Error in fetchAllBookings store", error);
      toast.error("Failed to load fetchAllBookings");
    }
  },
}));
