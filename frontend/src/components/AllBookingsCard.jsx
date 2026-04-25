import {
  BadgeCheck,
  BedDouble,
  CalendarDays,
  Clock3,
  IndianRupee,
  User,
  Users,
} from "lucide-react";
import React, { memo } from "react";

const AllBookingsCard = ({ booking }) => {
  return (
    <tr className="border-b border-[#f2ead9] hover:bg-[#fdfaf4] transition">
      {/* Date */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <CalendarDays className="w-4 h-4 text-[#b88917]" />
          <span className="font-medium">
            {new Date(booking?.createdAt).toLocaleDateString("en-GB")}
          </span>
        </div>
      </td>

      {/* User */}
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 font-medium text-slate-900">
            <User className="w-4 h-4 text-slate-500" />
            {booking.user?.name || "Guest"}
          </div>
          <span className="text-xs text-slate-400 font-mono mt-1">
            #{booking._id.slice(-8).toUpperCase()}
          </span>
        </div>
      </td>

      {/* Room */}
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-slate-800">
            <BedDouble className="w-4 h-4 text-slate-500" />
            {booking.room?.roomType}
          </div>
          <span className="text-xs text-slate-400">
            Room: {booking.room?.roomNumber || "N/A"}
          </span>
        </div>
      </td>

      {/* Stay Dates */}
      <td className="px-6 py-4">
        <div className="text-xs space-y-1">
          <p className="text-emerald-600">
            In: {new Date(booking.checkInDate).toLocaleDateString("en-GB")}
          </p>
          <p className="text-rose-600">
            Out: {new Date(booking.checkOutDate).toLocaleDateString("en-GB")}
          </p>
        </div>
      </td>

      {/* Guests */}
      <td className="px-6 py-4">
        <div className="inline-flex items-center gap-2">
          <Users className="w-4 h-4 text-slate-500" />
          <span>{booking.guests}</span>
        </div>
      </td>

      {/* Amount */}
      <td className="px-6 py-4">
        <div className="inline-flex items-center gap-1 font-semibold text-emerald-600">
          <IndianRupee className="w-4 h-4" />
          {booking?.totalPrice?.toLocaleString()}
        </div>
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        {booking.paymentStatus === "paid" ? (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
            <BadgeCheck className="w-3.5 h-3.5" />
            Confirmed
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
            <Clock3 className="w-3.5 h-3.5" />
            Pending
          </span>
        )}
      </td>
    </tr>
  );
};

export default memo(AllBookingsCard);
