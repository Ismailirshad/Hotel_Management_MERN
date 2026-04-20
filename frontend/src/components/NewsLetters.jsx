import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../lib/axios.js";

const NewsLetters = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendRequest = async () => {
    if (!message.trim()) {
      return toast.error("Please enter your message");
    }

    try {
      setLoading(true);
      const res = await api.post(
        "/request/sendRequest-message",
        { message },
        { withCredentials: true },
      );

      toast.success(res.data.message);
      setMessage("");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send request");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="max-w-5xl py-16 md:pl-20 md:w-full mx-2 md:mx-auto p-4 flex flex-col md:flex-row items-center justify-between text-left bg-linear-to-b from-[#4C0083] to-[#180047] rounded-2xl md:p-10 text-white">
        <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-8 w-full">
          {/* Left Content */}
          <div className="text-white max-w-2xl">
            <p className="text-sm sm:text-md md:text-lg font-medium text-white/80">
              Personalized Guest Support
            </p>

            <h2 className="text-xl sm:text-2xl md:text-5xl font-bold leading-tight">
              Need anything for your stay?
            </h2>

            <p className="text-white/80 text-sm sm:text-md md:text-lg leading-relaxed">
              Send us your request and we’ll do our best to make your stay
              comfortable and memorable.
            </p>
          </div>

          {/* Right Input */}
          <div className="w-full max-w-xl">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-0 bg-white/10 border border-white/20 rounded-2xl sm:rounded-full p-2 backdrop-blur-md">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your request here..."
                className="flex-1 bg-transparent px-4 sm:px-6 py-3 text-white placeholder:text-white/60 outline-none min-w-0"
              />

              <button
                onClick={handleSendRequest}
                disabled={loading}
                className="px-6 py-3 bg-violet-500 hover:bg-violet-600 text-white font-semibold rounded-xl sm:rounded-full transition-all duration-300 whitespace-nowrap"
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLetters;
