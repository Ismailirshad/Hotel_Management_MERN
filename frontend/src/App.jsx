import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css'
import Hero from './components/Hero';
import HotelCards from './components/HotelCards';
import Navbar from './components/Navbar'
import './index.css';
import ExclusiveOffer from './components/ExclusiveOffer';
import HomePage from './pages/HomePage';
import AllRooms from './pages/AllRooms';
import Footer from './components/Footer';
import MyBookings from './pages/MyBookings';
import HotelReg from './components/HotelReg';
import Layout from './pages/hotelOwner/Layout';
import Dashboard from './pages/hotelOwner/Dashboard';
import AddRoom from './pages/hotelOwner/AddRoom';
import ListRoom from './pages/hotelOwner/ListRoom';
import HotelDetails from './pages/HotelDetails';
import RoomDetails from './pages/RoomDetailPage';

function App() {
  const location = useLocation();
  return (
    <>
      <Navbar />
      {false && <HotelReg /> }
      <Routes >
        <Route path="/" element={<HomePage />} />
        <Route path="/hotelDetails/:id" element={<HotelDetails />} />
        <Route path="/roomDetails/:id" element={<RoomDetails />} />
        <Route path="/rooms" element={<AllRooms />} />
        <Route path="my-bookings" element={ <MyBookings />} />

        <Route path="/owner" element={ <Layout />}>
           <Route index element={<Dashboard />} />
           <Route path="/owner/addRoom" element={<AddRoom />} />
           <Route path="/owner/listRoom" element={<ListRoom />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
// import React from "react";
// import { MemoryRouter, Routes, Route, Link } from "react-router-dom";

// // Basic Layout
// const Layout = ({ children }) => (
//   <div className="min-h-screen bg-gray-100 flex flex-col">
//     <header className="bg-white shadow p-4 flex justify-between">
//       <h1 className="text-xl font-semibold">Hotel System</h1>
//       <nav className="space-x-4">
//         <Link to="/hotel/dashboard">Hotel Admin</Link>
//         <Link to="/owner/dashboard">Super Admin</Link>
//       </nav>
//     </header>
//     <main className="p-6 flex-1">{children}</main>
//   </div>
// );

// // Hotel Admin Pages
// const HotelDashboard = () => (
//   <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
//     <Card title="Total Rooms" value="18" />
//     <Card title="Bookings Today" value="12" />
//     <Card title="Revenue" value="₹24,500" />
//   </div>
// );

// const AddRoom = () => (
//   <FormPage title="Add Room">
//     <Input label="Room Number" />
//     <Input label="Price Per Night" />
//     <Input label="Room Type" />
//   </FormPage>
// );

// const AllRooms = () => (
//   <ListPage title="All Rooms" items={["Room 101", "Room 102", "Room 103"]} />
// );

// const HotelBookings = () => (
//   <ListPage title="Room Bookings" items={["John - Room 101", "Alice - Room 102"]} />
// );

// // Super Admin Pages
// const OwnerDashboard = () => (
//   <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
//     <Card title="Total Hotels" value="42" />
//     <Card title="Registered Users" value="850" />
//     <Card title="Total Revenue" value="₹12,40,000" />
//   </div>
// );

// const ManageHotels = () => (
//   <ListPage title="Hotels" items={["Taj Hotel", "RiverView", "SeaSide Resort"]} />
// );

// const ManageUsers = () => (
//   <ListPage title="Users" items={["Ismail", "Rahul", "Aisha"]} />
// );

// const Payments = () => (
//   <ListPage title="Payments" items={["₹350 – Booking 101", "₹540 – Booking 202"]} />
// );

// // Reusable Components
// const Card = ({ title, value }) => (
//   <div className="bg-white rounded-xl p-6 shadow text-center">
//     <p className="text-gray-500 text-sm">{title}</p>
//     <h2 className="text-3xl font-bold mt-2">{value}</h2>
//   </div>
// );

// const Input = ({ label }) => (
//   <div className="mb-4">
//     <label className="block mb-1 text-gray-700">{label}</label>
//     <input className="w-full p-2 rounded border" />
//   </div>
// );

// const FormPage = ({ title, children }) => (
//   <div className="bg-white p-6 rounded-xl shadow max-w-lg mx-auto">
//     <h2 className="text-xl font-semibold mb-4">{title}</h2>
//     {children}
//     <button className="mt-4 w-full bg-blue-600 text-white p-2 rounded">Submit</button>
//   </div>
// );

// const ListPage = ({ title, items }) => (
//   <div className="bg-white p-6 rounded-xl shadow max-w-lg mx-auto">
//     <h2 className="text-xl font-semibold mb-4">{title}</h2>
//     <ul className="space-y-3">
//       {items.map((item, i) => (
//         <li key={i} className="p-3 bg-gray-50 rounded shadow-sm">{item}</li>
//       ))}
//     </ul>
//   </div>
// );

// export default function App() {
//   return (
//     <MemoryRouter>
//       <Layout>
//         <Routes>
//           <Route path="/hotel/dashboard" element={<HotelDashboard />} />
//           <Route path="/hotel/add-room" element={<AddRoom />} />
//           <Route path="/hotel/rooms" element={<AllRooms />} />
//           <Route path="/hotel/bookings" element={<HotelBookings />} />

//           <Route path="/owner/dashboard" element={<OwnerDashboard />} />
//           <Route path="/owner/hotels" element={<ManageHotels />} />
//           <Route path="/owner/users" element={<ManageUsers />} />
//           <Route path="/owner/payments" element={<Payments />} />
//         </Routes>
//       </Layout>
//     </MemoryRouter>
//   );
// }

