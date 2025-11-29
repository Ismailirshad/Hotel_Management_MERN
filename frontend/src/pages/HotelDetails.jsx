import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const HotelDetails = () => {
  const { id } = useParams();  // hotel id from URL
  const [hotel, setHotel] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchHotel = async () => {
//       try {
//         const res = await fetch(`http://localhost:5000/api/hotels/${id}`);
//         const data = await res.json();
//         setHotel(data);
//         setLoading(false);
//       } catch (error) {
//         console.log(error);
//         setLoading(false);
//       }
//     };
//     fetchHotel();
//   }, [id]);

//   if (loading) return <p className="text-center mt-10">Loading...</p>;
//   if (!hotel) return <p className="text-center mt-10">Hotel not found</p>;

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <div className="max-w-6xl mx-auto px-4">

        {/* Hotel Info */}
        <h1 className="text-4xl font-bold mb-2">{hotel?.name || "ROom"}</h1>
        <p className="text-gray-600 mb-4">{hotel?.location || "USA"}</p>

        <img 
          src={hotel?.images?.[0]} 
          alt={hotel?.name || "imae"} 
          className="w-full h-72 object-cover rounded-xl shadow-lg"
        />

        <p className="mt-6 text-gray-700 leading-relaxed">
          {hotel?.description || "No description available for this hotel."}
        </p>

        {/* Rooms Section */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">Available Rooms</h2>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
          {hotel?.rooms?.slice(0, 3).map((room) => (
            <div 
              key={room?._id} 
              className="bg-white rounded-lg shadow p-4 hover:shadow-xl transition"
            >
              <img 
                src={room?.images?.[0]} 
                alt={room?.roomType || "roomtype"} 
                className="h-40 w-full object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold mt-3">{room?.roomType || "type"}</h3>
              <p className="text-gray-600 mt-1">${room?.pricePerNight || "rate"} per night</p>

              <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                View Room
              </button>
            </div>
          ))}
        </div>

        {/* View All Rooms Button */}
        <div className="text-center mt-8">
          <Link
            to={`/hotel/${id}/rooms`}
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            View All Rooms
          </Link>
        </div>

      </div>
    </div>
  );
};

export default HotelDetails;
