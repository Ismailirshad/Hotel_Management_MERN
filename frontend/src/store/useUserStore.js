import { create } from 'zustand'
import api from '../lib/axios.js'
import toast from 'react-hot-toast'

export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async ({ name, email, password }) => {
    set({ loading: true })

    try {
      const res = await api.post("/auth/signup", { name, email, password }, { withCredentials: true })
      set({ user: res.data.user, loading: false })
      toast.success("Account created successfully")
      return true;
    } catch (error) {
      set({ loading: false })
      toast.error(error.response?.data?.message)
      return false

    }
  },

  login: async ({ email, password }) => {
    set({ loading: true });

    try {
      const res = await api.post("/auth/login", { password, email }, { withCredentials: true })
      set({ user: res.data.user, loading: false })
      if (res.data.message === "User already logged In") {
        toast("You are already logged in")
      } else {
        toast.success("User logged in successfully")
      }
      return true
    } catch (error) {
      set({ loading: false })
      toast.error(error.response?.data?.message)
      return false
    }
  },

  logout: async ({navigate}) => {
    set({ loading: true })
    try {
      const res = await api.post("/auth/logout", {}, { withCredentials: true })
      toast.success(res.data?.message || "Logged out successfully")
      set({ loading: false, user: null })
      navigate('/')
    } catch (error) {
      set({ loading: false })
      toast.error(error.response?.data?.message)
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true })
    try {
      const res = await api.get('/auth/profile', { withCredentials: true })
      set({ user: res.data, checkingAuth: false })
    } catch (error) {
      set({ checkingAuth: false, user: null })
    }
  }
}))