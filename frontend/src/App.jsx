import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./store/useUserStore.js";
import AppSkeleton from "./components/skeletones/AppSkeleton.jsx";
import SuperAdminAllHotels from "./pages/superAdmin/SuperAdminAllHotels.jsx";

const Navbar = lazy(() => import("./components/Navbar"));
const Footer = lazy(() => import("./components/Footer"));

// User
const HomePage = lazy(() => import("./pages/HomePage"));
const AllRooms = lazy(() => import("./pages/AllRooms"));
const HotelDetails = lazy(() => import("./pages/HotelDetails"));
const RoomDetails = lazy(() => import("./pages/RoomDetailPage"));
const MyBookings = lazy(() => import("./pages/MyBookings"));
const PaymentPage = lazy(() => import("./pages/PaymentPage"));
const PaymentSuccessPage = lazy(
  () => import("./components/PaymentSuccessPage"),
);
const PaymentFailed = lazy(() => import("./components/PaymentFailedPage"));
const ForgotPasswordWrapper = lazy(
  () => import("./components/auth/ForgotPasswordWrapper"),
);

// Owner
const Layout = lazy(() => import("./pages/hotelOwner/Layout"));
const Dashboard = lazy(() => import("./pages/hotelOwner/Dashboard"));
const AddRoom = lazy(() => import("./pages/hotelOwner/AddRoom"));
const ListRoom = lazy(() => import("./pages/hotelOwner/ListRoom"));
const Bookings = lazy(() => import("./pages/hotelOwner/Bookings"));
const OfferSection = lazy(() => import("./pages/hotelOwner/OfferSection"));
const AccountingModule = lazy(
  () => import("./pages/hotelOwner/AccountingModule"),
);

// Super Admin
const SuperAdminLayout = lazy(
  () => import("./pages/superAdmin/SuperAdminLayout"),
);
const SuperAdminDashboard = lazy(
  () => import("./pages/superAdmin/SuperAdminDashboard"),
);
const SuperAdminListRoom = lazy(
  () => import("./pages/superAdmin/SuperAdminListRoom"),
);
const SuperAdminBookings = lazy(
  () => import("./pages/superAdmin/SuperAdminBookings"),
);
const SuperAdminAccountingModule = lazy(
  () => import("./pages/superAdmin/SuperAdminAccountingModule"),
);
const SupportRequests = lazy(() => import("./pages/superAdmin/SupportRequest"));

function App() {
  const location = useLocation();
  const hideNavbarAndFooter =
    location.pathname.startsWith("/owner") ||
    location.pathname.startsWith("/payment") ||
    location.pathname.startsWith("/booking") ||
    location.pathname.startsWith("/superAdmin");
  const { checkingAuth, checkAuth, user } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (checkingAuth) {
    return <AppSkeleton />;
  }
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

      <Suspense fallback={<AppSkeleton />}>
        {!checkingAuth && !hideNavbarAndFooter && <Navbar />}

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/hotelDetails/:id" element={<HotelDetails />} />
          <Route path="/roomDetails/:id" element={<RoomDetails />} />
          <Route path="/rooms" element={<AllRooms />} />
          <Route path="/hotel/:id/rooms" element={<AllRooms />} />
          <Route
            path="/my-bookings"
            element={user ? <MyBookings /> : <Navigate to="/" replace />}
          />
          <Route path="/payment/:bookingId" element={<PaymentPage />} />
          <Route
            path="/booking-success/:bookingId"
            element={<PaymentSuccessPage />}
          />
          <Route
            path="/booking-failed/:bookingId"
            element={<PaymentFailed />}
          />
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
            <Route
              path="superAdmin-listRoom"
              element={<SuperAdminListRoom />}
            />
            <Route
              path="superAdmin-allHotels"
              element={<SuperAdminAllHotels />}
            />
            <Route
              path="superAdmin-bookings"
              element={<SuperAdminBookings />}
            />
            <Route
              path="superAdmin-accountingModule"
              element={<SuperAdminAccountingModule />}
            />
            <Route
              path="superAdmin-supportRequests"
              element={<SupportRequests />}
            />
          </Route>
        </Routes>

        {!checkingAuth && !hideNavbarAndFooter && <Footer />}
      </Suspense>
    </>
  );
}

export default App;
