import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./index.css";
import HomePage from "./pages/HomePage";
import AllRooms from "./pages/AllRooms";
import Footer from "./components/Footer";
import MyBookings from "./pages/MyBookings";
import Layout from "./pages/hotelOwner/Layout";
import Dashboard from "./pages/hotelOwner/Dashboard";
import AddRoom from "./pages/hotelOwner/AddRoom";
import ListRoom from "./pages/hotelOwner/ListRoom";
import HotelDetails from "./pages/HotelDetails";
import RoomDetails from "./pages/RoomDetailPage";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./store/useUserStore";
import { useEffect } from "react";
import "flowbite";
import Bookings from "./pages/hotelOwner/Bookings";
import OfferSection from "./pages/hotelOwner/OfferSection";
import AccountingModule from "./pages/hotelOwner/AccountingModule";
import PaymentPage from "./pages/PaymentPage";
import PaymentSuccessPage from "./components/PaymentSuccessPage";
import PaymentFailed from "./components/PaymentFailedPage";
import ForgotPasswordWrapper from "./components/auth/ForgotPasswordWrapper";
import SuperAdminLayout from "./pages/superAdmin/superAdminLayout";
import SuperAdminDashboard from "./pages/superAdmin/superAdminDashboard";
import SuperAdminListRoom from "./pages/superAdmin/superAdminListRoom";
import SuperAdminBookings from "./pages/superAdmin/superAdminBookings";
import SuperAdminAccountingModule from "./pages/superAdmin/superAdminAccountingModule";


function App() {
  const location = useLocation();
  const hideNavbarAndFooter =
    location.pathname.startsWith("/owner") ||
    location.pathname.startsWith("/payment") ||
    location.pathname.startsWith("/booking") ||
    location.pathname.startsWith("/superAdmin");
  const { checkingAuth, checkAuth } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: "12px",
            background: "#1e293b",
            color: "#fff",
            padding: "12px 16px",
            fontSize: "15px",
          },
          success: {
            iconTheme: {
              primary: "#22c55e",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />

      {!hideNavbarAndFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hotelDetails/:id" element={<HotelDetails />} />
        <Route path="/roomDetails/:id" element={<RoomDetails />} />
        <Route path="/rooms" element={<AllRooms />} />
        <Route path="/hotel/:id/rooms" element={<AllRooms />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/payment/:bookingId" element={<PaymentPage />} />
        <Route path="/booking-success/:bookingId" element={<PaymentSuccessPage />} />
        <Route path="/booking-failed/:bookingId" element={<PaymentFailed />} />
        <Route path="/resetPassword" element={<ForgotPasswordWrapper />} />

        <Route path="/owner" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="addRoom" element={<AddRoom />} />
          <Route path="listRoom" element={<ListRoom />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="offerSection" element={<OfferSection />} />
          <Route path="accountingModule" element={<AccountingModule />} />
        </Route>

          <Route path="/superAdmin" element={<SuperAdminLayout />}>
          <Route index element={<SuperAdminDashboard />} />
          <Route path="superAdmin-listRoom" element={<SuperAdminListRoom />} />
          <Route path="superAdmin-bookings" element={<SuperAdminBookings />} />
          <Route path="superAdmin-accountingModule" element={<SuperAdminAccountingModule />} />
        </Route>

      </Routes>

      


      {!hideNavbarAndFooter && <Footer />}
    </>
  );
}

export default App;
