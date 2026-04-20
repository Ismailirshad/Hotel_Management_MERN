import React, { useEffect, useState } from "react";
import {
  ShieldCheck,
  User,
  Mail,
  MessageSquare,
  CalendarDays,
} from "lucide-react";
import toast from "react-hot-toast";
import api from "../../lib/axios.js";

const SupportRequest = () => {
  const [loading, setLoading] = useState(false);
  const [supportRequests, setSupportRequests] = useState([]);

  const fetchSupportRequests = async () => {
    setLoading(true);
    try {
      const res = await api.get("/superAdmin/support-requests");
      setSupportRequests(res.data);
      console.log(res.data);
    } catch (error) {
      console.log("Error fetching support requests", error);
    } finally {
      setLoading(false);
    }
  };
  const handleRequest = async (id) => {
    try {
      const res = await api.post(`/superAdmin/resolve-request/${id}`);
      fetchSupportRequests();
      toast.success(res.data.message);
    } catch (error) {
      console.error("Error resolving support request", error);
      toast.error("Failed to resolve support request");
    }
  };

  useEffect(() => {
    fetchSupportRequests();
  }, []);

  return (
    <div className="p-8 bg-[#f8f5ef] min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm tracking-[4px] text-[#b88a1b] font-semibold uppercase">
          Executive Support Center
        </p>
        <h1 className="text-5xl font-bold text-slate-900 mt-2">
          Support Requests
        </h1>
        <p className="text-slate-500 mt-3 text-lg">
          Review customer issues and platform support tickets.
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-52 rounded-3xl bg-white animate-pulse shadow"
            ></div>
          ))}
        </div>
      )}

      {/* Empty */}
      {!loading && supportRequests.length === 0 && (
        <div className="bg-white rounded-3xl shadow p-10 text-center">
          <ShieldCheck className="mx-auto w-14 h-14 text-[#b88a1b]" />
          <h2 className="text-2xl font-semibold mt-4 text-slate-800">
            No Support Requests
          </h2>
          <p className="text-slate-500 mt-2">
            No user requests available right now.
          </p>
        </div>
      )}

      {/* Cards */}
      {!loading && supportRequests.length > 0 && (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {supportRequests.map((request) => (
            <div
              key={request._id}
              className="bg-white rounded-3xl shadow-md border border-[#eee7da] p-6 hover:shadow-xl transition-all"
            >
              {/* User */}
              <div className="flex justify-between items-start mb-5">
                <div>
                  <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <User className="w-5 h-5 text-[#b88a1b]" />
                    {request.user?.name}
                  </h2>

                  <p className="text-slate-500 mt-2 flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4" />
                    {request.user?.email}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 text-xs rounded-full ${request.status === "open" ? "bg-[#e9a797] text-black" : "bg-[#67bd6b] text-black"} font-semibold`}
                >
                  {request.status === "open" ? "Open" : "Resolved"}
                </span>
              </div>

              {/* Message */}
              <div className="bg-[#f8f5ef] rounded-2xl p-4 mb-5">
                <p className="text-slate-700 flex gap-2 text-sm">
                  <MessageSquare className="w-4 h-4 mt-0.5 text-[#b88a1b]" />
                  {request.message}
                </p>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center">
                <p className="text-sm text-slate-500 flex items-center gap-2">
                  <CalendarDays className="w-4 h-4" />
                  {new Date(request.createdAt).toLocaleString()}
                </p>

                {request.status === "open" && (
                  <button
                    onClick={() => handleRequest(request._id)}
                    className="px-5 py-2 rounded-xl bg-[#59815b] text-white hover:bg-[#77a879] transition"
                  >
                    Resolve
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      
    </div>
  );
};

export default SupportRequest;
